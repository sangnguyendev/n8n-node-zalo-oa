import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import * as crypto from 'crypto';

export class ZaloOAWebhook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo OA Webhook',
		name: 'zaloOAWebhook',
		icon: 'file:zalooa.svg',
		group: ['trigger'],
		version: 1,
		description: 'Xử lý các sự kiện webhook từ Zalo OA',
		defaults: {
			name: 'Zalo OA Webhook',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'zaloOAApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'OA Secret Key',
				name: 'oaSecretKey',
				type: 'string',
				default: '',
				required: true,
				description: 'OA Secret Key từ trang quản lý Zalo OA',
				typeOptions: {
					password: true,
				},
			},
			{
				displayName: 'Các Loại Sự Kiện',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Người Dùng Follow OA',
						value: 'follow',
						description: 'Khi người dùng bắt đầu theo dõi OA',
					},
					{
						name: 'Người Dùng Unfollow OA',
						value: 'unfollow',
						description: 'Khi người dùng hủy theo dõi OA',
					},
					{
						name: 'Người Dùng Gửi Tin Nhắn Văn Bản',
						value: 'user_send_text',
						description: 'Khi người dùng gửi tin nhắn văn bản',
					},
					{
						name: 'Người Dùng Gửi Hình Ảnh',
						value: 'user_send_image',
						description: 'Khi người dùng gửi hình ảnh',
					},
					{
						name: 'Người Dùng Gửi File',
						value: 'user_send_file',
						description: 'Khi người dùng gửi file',
					},
					{
						name: 'Người Dùng Gửi Vị Trí',
						value: 'user_send_location',
						description: 'Khi người dùng gửi vị trí',
					},
					{
						name: 'Người Dùng Gửi Sticker',
						value: 'user_send_sticker',
						description: 'Khi người dùng gửi sticker',
					},
					{
						name: 'Người Dùng Gửi GIF',
						value: 'user_send_gif',
						description: 'Khi người dùng gửi GIF',
					},
					{
						name: 'Người Dùng Nhấp Vào Nút',
						value: 'user_click_button',
						description: 'Khi người dùng nhấp vào nút trong tin nhắn',
					},
					{
						name: 'Người Dùng Nhấp Vào Liên Kết',
						value: 'user_click_link',
						description: 'Khi người dùng nhấp vào liên kết trong tin nhắn',
					},
					{
						name: 'Tất Cả Sự Kiện',
						value: 'all',
						description: 'Nhận tất cả các loại sự kiện',
					},
				],
				default: ['all'],
				required: true,
				description: 'Các loại sự kiện muốn nhận từ Zalo OA',
			},
			{
				displayName: 'Xác Thực Mac',
				name: 'validateMac',
				type: 'boolean',
				default: true,
				description: 'Xác thực chữ ký MAC từ Zalo OA để đảm bảo an toàn',
			},
		],
	};

	// Phương thức này được gọi khi có request webhook đến
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const headerData = this.getHeaderData();
		const oaSecretKey = this.getNodeParameter('oaSecretKey') as string;
		const validateMac = this.getNodeParameter('validateMac') as boolean;
		const events = this.getNodeParameter('events') as string[];

		// Xử lý request GET (xác thực webhook)
		if (req.method === 'GET') {
			// Zalo OA gửi request GET để xác thực webhook
			const query = this.getQueryData() as IDataObject;
			if (Object.prototype.hasOwnProperty.call(query, 'hub.challenge')) {
				return {
					workflowData: [[
						{
							json: {
								event_type: 'webhook_verification',
								challenge: query['hub.challenge'],
								timestamp: new Date().toISOString(),
							},
						},
					]],
					webhookResponse: query['hub.challenge'] as string,
				};
			}
		}

		// Xử lý request POST (nhận sự kiện)
		if (req.method === 'POST') {
			try {
				// Lấy dữ liệu từ body
				const body = req.body as IDataObject;

				// Xác thực MAC nếu được bật
				if (validateMac) {
					const mac = headerData.mac as string;
					if (!mac) {
						return {
							workflowData: [[
								{
									json: {
										event_type: 'error',
										error: 'Missing MAC header',
										timestamp: new Date().toISOString(),
									},
								},
							]],
							webhookResponse: {
								statusCode: 401,
								body: {
									error: 'Missing MAC header',
								},
							},
						};
					}

					// Tính toán MAC từ body và OA Secret Key
					const data = JSON.stringify(body);
					const calculatedMac = crypto.createHmac('sha256', oaSecretKey)
						.update(data)
						.digest('hex');

					// So sánh MAC
					if (mac !== calculatedMac) {
						return {
							workflowData: [[
								{
									json: {
										event_type: 'error',
										error: 'Invalid MAC',
										timestamp: new Date().toISOString(),
									},
								},
							]],
							webhookResponse: {
								statusCode: 401,
								body: {
									error: 'Invalid MAC',
								},
							},
						};
					}
				}

				// Kiểm tra loại sự kiện
				const eventType = body.event_name as string;
				if (!events.includes('all') && !events.includes(eventType)) {
					// Bỏ qua sự kiện không được chọn
					return {
						workflowData: [[
							{
								json: {
									event_type: 'ignored',
									original_event: eventType,
									message: 'Event ignored - not in selected events',
									timestamp: new Date().toISOString(),
								},
							},
						]],
						webhookResponse: {
							statusCode: 200,
							body: {
								message: 'Event ignored',
							},
						},
					};
				}

				// Xử lý dữ liệu sự kiện
				const returnData: INodeExecutionData[] = [];
				returnData.push({
					json: {
						...body,
						event_type: eventType,
						timestamp: new Date().toISOString(),
					},
				});

				return {
					workflowData: [returnData],
					webhookResponse: {
						statusCode: 200,
						body: {
							message: 'Webhook received',
						},
					},
				};
			} catch (error) {
				throw new NodeOperationError(this.getNode(), error as Error);
			}
		}

		// Trả về lỗi nếu không phải GET hoặc POST
		return {
			workflowData: [[
				{
					json: {
						event_type: 'error',
						error: 'Method not allowed',
						method: req.method,
						timestamp: new Date().toISOString(),
					},
				},
			]],
			webhookResponse: {
				statusCode: 405,
				body: {
					error: 'Method not allowed',
				},
			},
		};
	}
}
