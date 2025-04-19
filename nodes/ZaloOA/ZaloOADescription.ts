import { INodeProperties } from 'n8n-workflow';

// Định nghĩa các operations cho Zalo OA
export const zaloOAOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
			},
		},
		options: [
			{
				name: 'Gửi Tin Nhắn Văn Bản',
				value: 'sendTextMessage',
				description: 'Gửi tin nhắn văn bản đến người theo dõi',
				action: 'Send text message',
			},
			{
				name: 'Gửi Tin Nhắn Hình Ảnh',
				value: 'sendImageMessage',
				description: 'Gửi tin nhắn kèm hình ảnh đến người theo dõi',
				action: 'Send image message',
			},
			{
				name: 'Gửi Tin Nhắn File',
				value: 'sendFileMessage',
				description: 'Gửi tin nhắn kèm file đến người theo dõi',
				action: 'Send file message',
			},
			{
				name: 'Gửi Tin Nhắn Danh Sách',
				value: 'sendListMessage',
				description: 'Gửi tin nhắn dạng danh sách đến người theo dõi',
				action: 'Send list message',
			},
			{
				name: 'Lấy Thông Tin Người Theo Dõi',
				value: 'getFollowerInfo',
				description: 'Lấy thông tin của người theo dõi',
				action: 'Get follower info',
			},
			{
				name: 'Upload Hình Ảnh',
				value: 'uploadImage',
				description: 'Upload hình ảnh lên Zalo OA',
				action: 'Upload image',
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				description: 'Upload file lên Zalo OA',
				action: 'Upload file',
			},
			{
				name: 'Lấy Danh Sách Tag',
				value: 'getTags',
				description: 'Lấy danh sách tag của OA',
				action: 'Get tags',
			},
			{
				name: 'Gán Tag Cho Người Theo Dõi',
				value: 'assignTag',
				description: 'Gán tag cho người theo dõi',
				action: 'Assign tag',
			},
		],
		default: 'sendTextMessage',
	},
];

// Các trường cho từng operation
export const zaloOAFields: INodeProperties[] = [
	// Trường loại tin nhắn chung cho tất cả các loại tin nhắn
	{
		displayName: 'Message Type',
		name: 'messageType',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendTextMessage', 'sendImageMessage', 'sendFileMessage', 'sendListMessage'],
			},
		},
		options: [
			{
				name: 'Tin Tư Vấn (Customer Service)',
				value: 'cs',
				description: 'Dùng để gửi tin nhắn tư vấn đến người theo dõi',
			},
			{
				name: 'Tin Giao Dịch (Transaction)',
				value: 'transaction',
				description: 'Dùng để gửi tin nhắn giao dịch đến người theo dõi',
			},
			{
				name: 'Tin Truyền Thông Cá Nhân (Promotion)',
				value: 'promotion',
				description: 'Dùng để gửi tin nhắn truyền thông cá nhân đến người theo dõi',
			},
		],
		default: 'cs',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:sendTextMessage                          */
	/* -------------------------------------------------------------------------- */
	// {
	// 	displayName: 'Message Type',
	// 	name: 'messageType',
	// 	type: 'options',
	// 	default: 'cs',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['zaloOA'],
	// 			operation: ['sendTextMessage'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			name: 'Tin Tư Vấn (Customer Service)',
	// 			value: 'cs',
	// 			description: 'Dùng để gửi tin nhắn tư vấn đến người theo dõi',
	// 		},
	// 		{
	// 			name: 'Tin Giao Dịch (Transaction)',
	// 			value: 'transaction',
	// 			description: 'Dùng để gửi tin nhắn giao dịch đến người theo dõi',
	// 		},
	// 		{
	// 			name: 'Tin Truyền Thông Cá Nhân (Promotion)',
	// 			value: 'promotion',
	// 			description: 'Dùng để gửi tin nhắn truyền thông cá nhân đến người theo dõi',
	// 		},
	// 	]
	// },
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendTextMessage'],
			},
		},
		description: 'ID của người dùng nhận tin nhắn',
	},
	{
		displayName: 'Nội Dung Tin Nhắn',
		name: 'text',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendTextMessage'],
			},
		},
		description: 'Nội dung tin nhắn văn bản',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:sendImageMessage                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendImageMessage'],
			},
		},
		description: 'ID của người dùng nhận tin nhắn',
	},
	{
		displayName: 'Loại Hình Ảnh',
		name: 'imageType',
		type: 'options',
		options: [
			{
				name: 'URL Hình Ảnh',
				value: 'imageUrl',
			},
			{
				name: 'ID Hình Ảnh (Đã Upload)',
				value: 'imageId',
			},
		],
		default: 'imageUrl',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendImageMessage'],
			},
		},
		description: 'Loại nguồn hình ảnh',
	},
	{
		displayName: 'URL Hình Ảnh',
		name: 'imageUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendImageMessage'],
				imageType: ['imageUrl'],
			},
		},
		description: 'URL của hình ảnh cần gửi',
	},
	{
		displayName: 'ID Hình Ảnh',
		name: 'imageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendImageMessage'],
				imageType: ['imageId'],
			},
		},
		description: 'ID của hình ảnh đã upload lên Zalo OA',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:sendFileMessage                          */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendFileMessage'],
			},
		},
		description: 'ID của người dùng nhận tin nhắn',
	},
	{
		displayName: 'ID File',
		name: 'fileId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendFileMessage'],
			},
		},
		description: 'ID của file đã upload lên Zalo OA',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:sendListMessage                          */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendListMessage'],
			},
		},
		description: 'ID của người dùng nhận tin nhắn',
	},
	{
		displayName: 'Tiêu Đề',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendListMessage'],
			},
		},
		description: 'Tiêu đề của tin nhắn danh sách',
	},
	{
		displayName: 'Danh Sách Mục',
		name: 'elements',
		placeholder: 'Thêm Mục',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['sendListMessage'],
			},
		},
		options: [
			{
				name: 'elementsValues',
				displayName: 'Mục',
				values: [
					{
						displayName: 'Tiêu Đề Mục',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Tiêu đề của mục',
					},
					{
						displayName: 'Mô Tả',
						name: 'subtitle',
						type: 'string',
						default: '',
						description: 'Mô tả của mục',
					},
					{
						displayName: 'URL Hình Ảnh',
						name: 'imageUrl',
						type: 'string',
						default: '',
						description: 'URL hình ảnh của mục',
					},
					{
						displayName: 'Default Action URL',
						name: 'defaultActionUrl',
						type: 'string',
						default: '',
						description: 'URL khi người dùng nhấp vào mục',
					},
				],
			},
		],
		description: 'Danh sách các mục trong tin nhắn',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getFollowerInfo                          */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getFollowerInfo'],
			},
		},
		description: 'ID của người theo dõi cần lấy thông tin',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:uploadImage                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Binary Data',
		name: 'binaryData',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadImage'],
			},
		},
		description: 'Nếu hình ảnh được truyền dưới dạng binary data',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadImage'],
				binaryData: [true],
			},
		},
		description: 'Tên của binary property chứa dữ liệu hình ảnh',
	},
	{
		displayName: 'URL Hình Ảnh',
		name: 'imageUrl',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadImage'],
				binaryData: [false],
			},
		},
		description: 'URL của hình ảnh cần upload',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:uploadFile                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Binary Data',
		name: 'binaryData',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadFile'],
			},
		},
		description: 'Nếu file được truyền dưới dạng binary data',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadFile'],
				binaryData: [true],
			},
		},
		description: 'Tên của binary property chứa dữ liệu file',
	},
	{
		displayName: 'URL File',
		name: 'fileUrl',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadFile'],
				binaryData: [false],
			},
		},
		description: 'URL của file cần upload',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getTags                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Số Lượng Tối Đa',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getTags'],
			},
		},
		description: 'Vị trí bắt đầu lấy danh sách tag',
	},
	{
		displayName: 'Số Lượng',
		name: 'count',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getTags'],
			},
		},
		description: 'Số lượng tag cần lấy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:assignTag                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['assignTag'],
			},
		},
		description: 'ID của người theo dõi cần gán tag',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['assignTag'],
			},
		},
		description: 'ID của tag cần gán',
	},
];
