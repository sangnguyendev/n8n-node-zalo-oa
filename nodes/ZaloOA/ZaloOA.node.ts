import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

/**
 * Zalo OA API v3.0 Implementation
 *
 * Changes from v2.0 to v3.0:
 * - MessageV2 API has been deprecated and shut down
 * - MessageV3 API requires specifying the message type in the endpoint:
 *   - Customer Service: /message/cs
 *   - Transaction: /message/transaction
 *   - Promotion: /message/promotion
 *
 * This implementation uses the v3.0 API base URL and proper message endpoints
 * with the required message types passed as parameters.
 */

import { zaloOAOperations, zaloOAFields } from './ZaloOADescription';
import axios from 'axios';
import FormData from 'form-data';

export class ZaloOA implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo OA',
		name: 'zaloOA',
		icon: 'file:zalooa.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Tương tác với Zalo Official Account API',
		defaults: {
			name: 'Zalo OA',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'zaloOAApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Zalo OA',
						value: 'zaloOA',
					},
				],
				default: 'zaloOA',
			},
			...zaloOAOperations,
			...zaloOAFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('zaloOAApi');

		// Lấy access token từ credentials
		const accessToken = credentials.accessToken as string;
		const baseUrl = 'https://openapi.zalo.me/v3.0/oa';

		// Xử lý các operations khác nhau
		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'zaloOA') {
					// Gửi tin nhắn văn bản
					if (operation === 'sendTextMessage') {
						const userId = this.getNodeParameter('userId', i) as string;
						const text = this.getNodeParameter('text', i) as string;

						// Get message type (cs, transaction, promotion)
						const messageType = this.getNodeParameter('messageType', i) as string || "cs";

						// MessageV3 API format
						const response = await axios.post(
							`${baseUrl}/message/${messageType}`,
							{
								recipient: {
									user_id: userId,
								},
								message: {
									text,
								},
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Gửi tin nhắn hình ảnh
					else if (operation === 'sendImageMessage') {
						const userId = this.getNodeParameter('userId', i) as string;
						const imageType = this.getNodeParameter('imageType', i) as string;
						let attachment;

						if (imageType === 'imageUrl') {
							const imageUrl = this.getNodeParameter('imageUrl', i) as string;
							attachment = {
								type: 'template',
								payload: {
									template_type: 'media',
									elements: [
										{
											media_type: 'image',
											url: imageUrl,
										},
									],
								},
							};
						} else {
							const imageId = this.getNodeParameter('imageId', i) as string;
							attachment = {
								type: 'template',
								payload: {
									template_type: 'media',
									elements: [
										{
											media_type: 'image',
											attachment_id: imageId,
										},
									],
								},
							};
						}

						// Get message type (cs, transaction, promotion)
						const messageType = this.getNodeParameter('messageType', i) as string;

						// MessageV3 API format
						const response = await axios.post(
							`${baseUrl}/message/${messageType}`,
							{
								recipient: {
									user_id: userId,
								},
								message: {
									attachment,
								},
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Gửi tin nhắn file
					else if (operation === 'sendFileMessage') {
						const userId = this.getNodeParameter('userId', i) as string;
						const fileId = this.getNodeParameter('fileId', i) as string;

						// Get message type (cs, transaction, promotion)
						const messageType = this.getNodeParameter('messageType', i) as string;

						// MessageV3 API format
						const response = await axios.post(
							`${baseUrl}/message/${messageType}`,
							{
								recipient: {
									user_id: userId,
								},
								message: {
									attachment: {
										type: 'file',
										payload: {
											token: fileId,
										},
									},
								},
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Gửi tin nhắn danh sách
					else if (operation === 'sendListMessage') {
						const userId = this.getNodeParameter('userId', i) as string;
						const listTitle = this.getNodeParameter('title', i) as string;
						const elementsCollection = this.getNodeParameter('elements', i) as {
							elementsValues: Array<{
								title: string;
								subtitle: string;
								imageUrl: string;
								defaultActionUrl: string;
							}>;
						};

						const elements = elementsCollection.elementsValues.map((element) => ({
							title: element.title,
							subtitle: element.subtitle,
							image_url: element.imageUrl,
							default_action: {
								type: 'oa.open.url',
								url: element.defaultActionUrl,
							},
						}));

						// Get message type (cs, transaction, promotion)
						const messageType = this.getNodeParameter('messageType', i) as string;

						// MessageV3 API format
						const response = await axios.post(
							`${baseUrl}/message/${messageType}`,
							{
								recipient: {
									user_id: userId,
								},
								message: {
									attachment: {
										type: 'template',
										payload: {
											template_type: 'list',
											elements,
											buttons: [
												{
													title: listTitle,
													type: 'oa.open.url',
													payload: {
														url: 'https://zalo.me'
													}
												}
											]
										},
									},
								},
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy thông tin người theo dõi
					else if (operation === 'getFollowerInfo') {
						const userId = this.getNodeParameter('userId', i) as string;

						const response = await axios.get(`${baseUrl}/getprofile`, {
							headers: {
								access_token: accessToken,
							},
							params: {
								user_id: userId,
							},
						});

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Upload hình ảnh
					else if (operation === 'uploadImage') {
						const binaryData = this.getNodeParameter('binaryData', i) as boolean;
						let response;

						if (binaryData) {
							const binaryProperty = this.getNodeParameter('binaryProperty', i) as string;
							const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);

							const formData = new FormData();
							formData.append('file', binaryDataBuffer, {
								filename: items[i].binary![binaryProperty].fileName,
								contentType: items[i].binary![binaryProperty].mimeType,
							});

							response = await axios.post(`${baseUrl}/upload/image`, formData, {
								headers: {
									access_token: accessToken,
									...formData.getHeaders(),
								},
							});
						} else {
							const imageUrl = this.getNodeParameter('imageUrl', i) as string;

							response = await axios.post(
								`${baseUrl}/upload/image`,
								{
									url: imageUrl,
								},
								{
									headers: {
										access_token: accessToken,
										'Content-Type': 'application/json',
									},
								},
							);
						}

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Upload file
					else if (operation === 'uploadFile') {
						const binaryData = this.getNodeParameter('binaryData', i) as boolean;
						let response;

						if (binaryData) {
							const binaryProperty = this.getNodeParameter('binaryProperty', i) as string;
							const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);

							const formData = new FormData();
							formData.append('file', binaryDataBuffer, {
								filename: items[i].binary![binaryProperty].fileName,
								contentType: items[i].binary![binaryProperty].mimeType,
							});

							response = await axios.post(`${baseUrl}/upload/file`, formData, {
								headers: {
									access_token: accessToken,
									...formData.getHeaders(),
								},
							});
						} else {
							const fileUrl = this.getNodeParameter('fileUrl', i) as string;

							response = await axios.post(
								`${baseUrl}/upload/file`,
								{
									url: fileUrl,
								},
								{
									headers: {
										access_token: accessToken,
										'Content-Type': 'application/json',
									},
								},
							);
						}

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy danh sách tag
					else if (operation === 'getTags') {
						const offset = this.getNodeParameter('offset', i) as number;
						const count = this.getNodeParameter('count', i) as number;

						const response = await axios.get(`${baseUrl}/tag/gettagsofoa`, {
							headers: {
								access_token: accessToken,
							},
							params: {
								offset,
								count,
							},
						});

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Gán tag cho người theo dõi
					else if (operation === 'assignTag') {
						const userId = this.getNodeParameter('userId', i) as string;
						const tagId = this.getNodeParameter('tagId', i) as string;

						const response = await axios.post(
							`${baseUrl}/tag/tagfollower`,
							{
								user_id: userId,
								tag_id: tagId,
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy thông tin Official Account
					else if (operation === 'getOAProfile') {
						// API GET OA Profile không cần tham số bổ sung
						const response = await axios.get(
							`${baseUrl}/getoa`,
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy danh sách người theo dõi
					else if (operation === 'getFollowers') {
						const offset = this.getNodeParameter('offset', i) as number;
						const count = this.getNodeParameter('count', i) as number;

						// API GET Followers
						const response = await axios.get(
							`${baseUrl}/getfollowers`,
							{
								params: {
									offset,
									count: Math.min(count, 50), // Giới hạn tối đa 50 người theo dõi mỗi lần gọi
								},
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Upload GIF image
					else if (operation === 'uploadGif') {
						const binaryData = this.getNodeParameter('binaryData', i) as boolean;
						const formData = new FormData();

						if (binaryData) {
							const binaryProperty = this.getNodeParameter('binaryProperty', i) as string;
							const binaryFile = items[i].binary![binaryProperty];

							if (binaryFile === undefined) {
								throw new NodeOperationError(
									this.getNode(),
									`No binary data property "${binaryProperty}" exists on item.`,
									{ itemIndex: i },
								);
							}

							const buffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
							formData.append('file', buffer, {
								filename: binaryFile.fileName || 'image.gif',
								contentType: binaryFile.mimeType,
							});
						} else {
							const gifUrl = this.getNodeParameter('gifUrl', i) as string;

							// Tải GIF từ URL
							const gifResponse = await axios.get(gifUrl, { responseType: 'arraybuffer' });
							formData.append('file', Buffer.from(gifResponse.data), {
								filename: 'image.gif',
								contentType: 'image/gif',
							});
						}

						// Gửi request để upload GIF
						const response = await axios.post(
							`${baseUrl}/upload/gif`,
							formData.getBuffer(),
							{
								headers: {
									...formData.getHeaders(),
									access_token: accessToken,
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy danh sách cuộc trò chuyện gần đây
					else if (operation === 'getRecentChat') {
						const offset = this.getNodeParameter('offset', i) as number;
						const count = this.getNodeParameter('count', i) as number;

						const response = await axios.get(`${baseUrl}/listrecentchat`, {
							headers: {
								access_token: accessToken,
							},
							params: {
								offset,
								count: Math.min(count, 50), // Giới hạn tối đa 50 cuộc trò chuyện mỗi lần gọi
							},
						});

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy lịch sử hội thoại với người dùng
					else if (operation === 'getConversation') {
						const userId = this.getNodeParameter('userId', i) as string;
						const offset = this.getNodeParameter('offset', i) as number;
						const count = this.getNodeParameter('count', i) as number;

						const response = await axios.get(`${baseUrl}/conversation`, {
							headers: {
								access_token: accessToken,
							},
							params: {
								user_id: userId,
								offset,
								count: Math.min(count, 50), // Giới hạn tối đa 50 tin nhắn mỗi lần gọi
							},
						});

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Kiểm tra trạng thái tin nhắn
					else if (operation === 'getMessageStatus') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						const response = await axios.get(`${baseUrl}/getmessagestatus`, {
							headers: {
								access_token: accessToken,
							},
							params: {
								message_id: messageId,
							},
						});

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Xóa tag
					else if (operation === 'removeTag') {
						const tagId = this.getNodeParameter('tagId', i) as string;

						const response = await axios.post(
							`${baseUrl}/tag/rmtag`,
							{
								tag_id: tagId,
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Xóa người theo dõi khỏi tag
					else if (operation === 'removeFollowerFromTag') {
						const userId = this.getNodeParameter('userId', i) as string;
						const tagId = this.getNodeParameter('tagId', i) as string;

						const response = await axios.post(
							`${baseUrl}/tag/rmfollowerfromtag`,
							{
								user_id: userId,
								tag_id: tagId,
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Cập nhật menu OA
					else if (operation === 'updateOAMenu') {
						const menuItemsCollection = this.getNodeParameter('menuItems', i) as {
							menuItemsValues: Array<{
								title: string;
								type: string;
								payload: string;
							}>;
						};

						const menuItems = menuItemsCollection.menuItemsValues.map(item => {
							let payload: string | Record<string, string>;

							// Format payload based on menu type
							if (item.type === 'oa.open.url') {
								payload = { url: item.payload };
							} else if (item.type === 'oa.open.phone') {
								payload = { phone: item.payload };
							} else if (item.type === 'oa.query.show') {
								payload = { message: item.payload };
							} else if (item.type === 'oa.open.app') {
								payload = { app: item.payload };
							} else {
								payload = item.payload;
							}

							return {
								title: item.title,
								type: item.type,
								payload,
							};
						});

						const response = await axios.post(
							`${baseUrl}/menu`,
							{
								menu_items: menuItems,
							},
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}

					// Cập nhật thông tin người theo dõi
					else if (operation === 'updateFollowerInfo') {
						const userId = this.getNodeParameter('userId', i) as string;
						const infoType = this.getNodeParameter('infoType', i) as string;
						const infoValue = this.getNodeParameter('infoValue', i) as string;

						// Prepare data based on info type
						const data: Record<string, any> = {
							user_id: userId,
						};

						// Add specific field based on infoType
						switch(infoType) {
							case 'name':
								data.name = infoValue;
								break;
							case 'phone':
								data.phone = infoValue;
								break;
							case 'email':
								data.email = infoValue;
								break;
							case 'address':
								data.address = infoValue;
								break;
							case 'city':
								data.city = infoValue;
								break;
							case 'birthday':
								data.birthday = infoValue; // Format should be YYYY-MM-DD
								break;
							default:
								break;
						}

						const response = await axios.post(
							`${baseUrl}/updatefollowerinfo`,
							data,
							{
								headers: {
									access_token: accessToken,
									'Content-Type': 'application/json',
								},
							},
						);

						returnData.push({
							json: response.data,
							pairedItem: {
								item: i,
							},
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
