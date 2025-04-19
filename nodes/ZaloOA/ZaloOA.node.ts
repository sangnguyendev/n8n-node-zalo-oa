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
