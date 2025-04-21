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
			// Message Operations
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

			// User & OA Management
			{
				name: 'Lấy Thông Tin Official Account',
				value: 'getOAProfile',
				description: 'Lấy thông tin của Official Account',
				action: 'Get OA profile',
			},
			{
				name: 'Lấy Thông Tin Người Theo Dõi',
				value: 'getFollowerInfo',
				description: 'Lấy thông tin của người theo dõi',
				action: 'Get follower info',
			},
			{
				name: 'Lấy Danh Sách Người Theo Dõi',
				value: 'getFollowers',
				description: 'Lấy danh sách người theo dõi OA',
				action: 'Get followers',
			},
			{
				name: 'Cập Nhật Thông Tin Người Theo Dõi',
				value: 'updateFollowerInfo',
				description: 'Cập nhật thông tin của người theo dõi',
				action: 'Update follower info',
			},

			// Conversation Management
			{
				name: 'Lấy Danh Sách Cuộc Trò Chuyện Gần Đây',
				value: 'getRecentChat',
				description: 'Lấy danh sách cuộc trò chuyện gần đây',
				action: 'Get recent chat list',
			},
			{
				name: 'Lấy Lịch Sử Hội Thoại',
				value: 'getConversation',
				description: 'Lấy lịch sử trò chuyện với người dùng',
				action: 'Get conversation history',
			},
			{
				name: 'Kiểm Tra Trạng Thái Tin Nhắn',
				value: 'getMessageStatus',
				description: 'Kiểm tra trạng thái của tin nhắn đã gửi',
				action: 'Get message status',
			},

			// Media Management
			{
				name: 'Upload Hình Ảnh',
				value: 'uploadImage',
				description: 'Upload hình ảnh lên Zalo OA',
				action: 'Upload image',
			},
			{
				name: 'Upload Hình Ảnh GIF',
				value: 'uploadGif',
				description: 'Upload hình ảnh GIF lên Zalo OA',
				action: 'Upload GIF image',
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				description: 'Upload file lên Zalo OA',
				action: 'Upload file',
			},

			// Tag Management
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
			{
				name: 'Xóa Tag',
				value: 'removeTag',
				description: 'Xóa tag của OA',
				action: 'Remove tag',
			},
			{
				name: 'Xóa Người Theo Dõi Khỏi Tag',
				value: 'removeFollowerFromTag',
				description: 'Xóa người theo dõi khỏi tag',
				action: 'Remove follower from tag',
			},

			// Menu Management
			{
				name: 'Cập Nhật Menu OA',
				value: 'updateOAMenu',
				description: 'Cập nhật menu cho Official Account',
				action: 'Update OA menu',
			},

			// Article Management
			{
				name: 'Tạo Bài Viết',
				value: 'createArticle',
				description: 'Tạo bài viết mới',
				action: 'Create article',
			},
			{
				name: 'Cập Nhật Bài Viết',
				value: 'updateArticle',
				description: 'Cập nhật bài viết',
				action: 'Update article',
			},
			{
				name: 'Xóa Bài Viết',
				value: 'removeArticle',
				description: 'Xóa bài viết',
				action: 'Remove article',
			},
			{
				name: 'Lấy Danh Sách Bài Viết',
				value: 'getArticleList',
				description: 'Lấy danh sách bài viết của OA',
				action: 'Get article list',
			},
			{
				name: 'Lấy Chi Tiết Bài Viết',
				value: 'getArticleDetail',
				description: 'Lấy chi tiết bài viết',
				action: 'Get article detail',
			},
			{
				name: 'Chuẩn Bị Upload Video',
				value: 'prepareUploadVideo',
				description: 'Chuẩn bị upload video cho bài viết',
				action: 'Prepare video upload',
			},
			{
				name: 'Xác Thực Video',
				value: 'verifyVideo',
				description: 'Xác thực video đã upload',
				action: 'Verify uploaded video',
			},

			// Store Management
			{
				name: 'Tạo Sản Phẩm',
				value: 'createProduct',
				description: 'Tạo sản phẩm mới trong cửa hàng',
				action: 'Create product',
			},
			{
				name: 'Cập Nhật Sản Phẩm',
				value: 'updateProduct',
				description: 'Cập nhật thông tin sản phẩm',
				action: 'Update product',
			},
			{
				name: 'Lấy Thông Tin Sản Phẩm',
				value: 'getProductInfo',
				description: 'Lấy thông tin chi tiết sản phẩm',
				action: 'Get product info',
			},
			{
				name: 'Lấy Danh Sách Sản Phẩm',
				value: 'getProductList',
				description: 'Lấy danh sách sản phẩm của OA',
				action: 'Get product list',
			},
			{
				name: 'Tạo Danh Mục',
				value: 'createCategory',
				description: 'Tạo danh mục sản phẩm mới',
				action: 'Create category',
			},
			{
				name: 'Cập Nhật Danh Mục',
				value: 'updateCategory',
				description: 'Cập nhật thông tin danh mục',
				action: 'Update category',
			},
			{
				name: 'Lấy Danh Sách Danh Mục',
				value: 'getCategoryList',
				description: 'Lấy danh sách danh mục của OA',
				action: 'Get category list',
			},
			{
				name: 'Tạo Đơn Hàng',
				value: 'createOrder',
				description: 'Tạo đơn hàng mới',
				action: 'Create order',
			},
			{
				name: 'Cập Nhật Đơn Hàng',
				value: 'updateOrder',
				description: 'Cập nhật thông tin đơn hàng',
				action: 'Update order',
			},
			{
				name: 'Lấy Thông Tin Đơn Hàng',
				value: 'getOrderInfo',
				description: 'Lấy thông tin chi tiết đơn hàng',
				action: 'Get order info',
			},
			{
				name: 'Lấy Danh Sách Đơn Hàng',
				value: 'getOrderList',
				description: 'Lấy danh sách đơn hàng của OA',
				action: 'Get order list',
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

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getFollowers                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Vị Trí Bắt Đầu',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getFollowers'],
			},
		},
		description: 'Vị trí bắt đầu lấy danh sách người theo dõi',
	},
	{
		displayName: 'Số Lượng',
		name: 'count',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getFollowers'],
			},
		},
		description: 'Số lượng người theo dõi cần lấy (tối đa 50)',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:uploadGif                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Binary Data',
		name: 'binaryData',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadGif'],
			},
		},
		description: 'Nếu GIF được truyền dưới dạng binary data',
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
				operation: ['uploadGif'],
				binaryData: [true],
			},
		},
		description: 'Tên của binary property chứa dữ liệu GIF',
	},
	{
		displayName: 'URL Hình Ảnh GIF',
		name: 'gifUrl',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['uploadGif'],
				binaryData: [false],
			},
		},
		description: 'URL của hình ảnh GIF cần upload',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getRecentChat                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Vị Trí Bắt Đầu',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getRecentChat'],
			},
		},
		description: 'Vị trí bắt đầu lấy danh sách cuộc trò chuyện',
	},
	{
		displayName: 'Số Lượng',
		name: 'count',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getRecentChat'],
			},
		},
		description: 'Số lượng cuộc trò chuyện cần lấy (tối đa 50)',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getConversation                          */
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
				operation: ['getConversation'],
			},
		},
		description: 'ID của người dùng cần lấy lịch sử hội thoại',
	},
	{
		displayName: 'Vị Trí Bắt Đầu',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getConversation'],
			},
		},
		description: 'Vị trí bắt đầu lấy tin nhắn trong hội thoại',
	},
	{
		displayName: 'Số Lượng',
		name: 'count',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getConversation'],
			},
		},
		description: 'Số lượng tin nhắn cần lấy (tối đa 50)',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getMessageStatus                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getMessageStatus'],
			},
		},
		description: 'ID của tin nhắn cần kiểm tra trạng thái',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:removeTag                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['removeTag'],
			},
		},
		description: 'ID của tag cần xóa',
	},

	/* -------------------------------------------------------------------------- */
	/*                     zaloOA:removeFollowerFromTag                           */
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
				operation: ['removeFollowerFromTag'],
			},
		},
		description: 'ID của người theo dõi cần xóa khỏi tag',
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
				operation: ['removeFollowerFromTag'],
			},
		},
		description: 'ID của tag cần xóa người theo dõi',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:updateOAMenu                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Menu Items',
		name: 'menuItems',
		placeholder: 'Thêm Menu Item',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateOAMenu'],
			},
		},
		options: [
			{
				name: 'menuItemsValues',
				displayName: 'Menu Item',
				values: [
					{
						displayName: 'Tên Menu',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Tên hiển thị của menu item',
					},
					{
						displayName: 'Loại Menu',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Mở URL',
								value: 'oa.open.url',
							},
							{
								name: 'Gửi Tin Nhắn',
								value: 'oa.query.show',
							},
							{
								name: 'Gọi Điện',
								value: 'oa.open.phone',
							},
							{
								name: 'Mở Ứng Dụng',
								value: 'oa.open.app',
							},
						],
						default: 'oa.open.url',
						description: 'Loại hành động khi người dùng nhấp vào menu',
					},
					{
						displayName: 'Giá Trị',
						name: 'payload',
						type: 'string',
						default: '',
						description: 'Giá trị tương ứng với loại menu (URL, tin nhắn, số điện thoại, ...)',
					},
				],
			},
		],
		description: 'Danh sách các menu item của OA',
	},

	/* -------------------------------------------------------------------------- */
	/*                         zaloOA:updateFollowerInfo                          */
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
				operation: ['updateFollowerInfo'],
			},
		},
		description: 'ID của người theo dõi cần cập nhật thông tin',
	},
	{
		displayName: 'Thông Tin',
		name: 'infoType',
		type: 'options',
		options: [
			{
				name: 'Họ Tên',
				value: 'name',
			},
			{
				name: 'Số Điện Thoại',
				value: 'phone',
			},
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'Địa Chỉ',
				value: 'address',
			},
			{
				name: 'Thành Phố',
				value: 'city',
			},
			{
				name: 'Ngày Sinh',
				value: 'birthday',
			},
		],
		default: 'name',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateFollowerInfo'],
			},
		},
		description: 'Loại thông tin cần cập nhật',
	},
	{
		displayName: 'Giá Trị',
		name: 'infoValue',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateFollowerInfo'],
			},
		},
		description: 'Giá trị cập nhật',
		hint: 'Đối với ngày sinh, sử dụng định dạng YYYY-MM-DD'
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:createArticle                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tiêu Đề Bài Viết',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'Tiêu đề của bài viết',
	},
	{
		displayName: 'Mô Tả Bài Viết',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'Mô tả ngắn của bài viết',
	},
	{
		displayName: 'Tác Giả',
		name: 'author',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'Tên tác giả của bài viết',
	},
	{
		displayName: 'URL Ảnh Bìa',
		name: 'coverPhotoUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'URL của ảnh bìa bài viết',
	},
	{
		displayName: 'Trạng Thái Ảnh Bìa',
		name: 'coverStatus',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'Trạng thái hiển thị của ảnh bìa',
	},
	{
		displayName: 'Nội Dung Bài Viết',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'Nội dung của bài viết (hỗ trợ HTML)',
	},
	{
		displayName: 'Trạng Thái Bài Viết',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'Trạng thái hiển thị của bài viết',
	},
	{
		displayName: 'Cho Phép Bình Luận',
		name: 'comment',
		type: 'options',
		options: [
			{
				name: 'Cho Phép',
				value: 'show',
			},
			{
				name: 'Không Cho Phép',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createArticle'],
			},
		},
		description: 'Cho phép người dùng bình luận vào bài viết',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:updateArticle                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Token Bài Viết',
		name: 'token',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle', 'removeArticle', 'getArticleDetail'],
			},
		},
		description: 'Token của bài viết cần cập nhật/xóa/xem chi tiết',
	},
	{
		displayName: 'Tiêu Đề Bài Viết',
		name: 'title',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'Tiêu đề mới của bài viết',
	},
	{
		displayName: 'Mô Tả Bài Viết',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'Mô tả ngắn mới của bài viết',
	},
	{
		displayName: 'Tác Giả',
		name: 'author',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'Tên tác giả mới của bài viết',
	},
	{
		displayName: 'URL Ảnh Bìa',
		name: 'coverPhotoUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'URL mới của ảnh bìa bài viết',
	},
	{
		displayName: 'Trạng Thái Ảnh Bìa',
		name: 'coverStatus',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'Trạng thái hiển thị mới của ảnh bìa',
	},
	{
		displayName: 'Nội Dung Bài Viết',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'Nội dung mới của bài viết (hỗ trợ HTML)',
	},
	{
		displayName: 'Trạng Thái Bài Viết',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'Trạng thái hiển thị mới của bài viết',
	},
	{
		displayName: 'Cho Phép Bình Luận',
		name: 'comment',
		type: 'options',
		options: [
			{
				name: 'Cho Phép',
				value: 'show',
			},
			{
				name: 'Không Cho Phép',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateArticle'],
			},
		},
		description: 'Cho phép người dùng bình luận vào bài viết',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getArticleList                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Vị Trí Bắt Đầu',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getArticleList'],
			},
		},
		description: 'Vị trí bắt đầu của danh sách bài viết',
	},
	{
		displayName: 'Số Lượng',
		name: 'limit',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getArticleList'],
			},
		},
		description: 'Số lượng bài viết cần lấy',
	},
	{
		displayName: 'Loại Bài Viết',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'Bài Viết Thường',
				value: 'normal',
			},
			{
				name: 'Bài Viết Video',
				value: 'video',
			},
		],
		default: 'normal',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getArticleList'],
			},
		},
		description: 'Loại bài viết cần lấy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:prepareUploadVideo                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tên Video',
		name: 'videoName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['prepareUploadVideo'],
			},
		},
		description: 'Tên của video cần upload',
	},
	{
		displayName: 'Kích Thước Video (byte)',
		name: 'videoSize',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['prepareUploadVideo'],
			},
		},
		description: 'Kích thước của video tính bằng byte',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:verifyVideo                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Upload ID',
		name: 'uploadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['verifyVideo'],
			},
		},
		description: 'ID của video đã upload',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:createProduct                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tên Sản Phẩm',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createProduct'],
			},
		},
		description: 'Tên của sản phẩm',
	},
	{
		displayName: 'Giá Sản Phẩm',
		name: 'price',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createProduct'],
			},
		},
		description: 'Giá của sản phẩm (VND)',
	},
	{
		displayName: 'Mô Tả Sản Phẩm',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createProduct'],
			},
		},
		description: 'Mô tả của sản phẩm',
	},
	{
		displayName: 'Mã Sản Phẩm',
		name: 'code',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createProduct'],
			},
		},
		description: 'Mã của sản phẩm',
	},
	{
		displayName: 'URL Hình Ảnh Sản Phẩm',
		name: 'photos',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createProduct'],
			},
		},
		description: 'URL hình ảnh sản phẩm (nhiều URL cách nhau bằng dấu phẩy)',
	},
	{
		displayName: 'Trạng Thái Sản Phẩm',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createProduct'],
			},
		},
		description: 'Trạng thái hiển thị của sản phẩm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:updateProduct                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Sản Phẩm',
		name: 'productId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateProduct', 'getProductInfo'],
			},
		},
		description: 'ID của sản phẩm cần cập nhật/xem chi tiết',
	},
	{
		displayName: 'Tên Sản Phẩm',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateProduct'],
			},
		},
		description: 'Tên mới của sản phẩm',
	},
	{
		displayName: 'Giá Sản Phẩm',
		name: 'price',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateProduct'],
			},
		},
		description: 'Giá mới của sản phẩm (VND)',
	},
	{
		displayName: 'Mô Tả Sản Phẩm',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateProduct'],
			},
		},
		description: 'Mô tả mới của sản phẩm',
	},
	{
		displayName: 'Mã Sản Phẩm',
		name: 'code',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateProduct'],
			},
		},
		description: 'Mã mới của sản phẩm',
	},
	{
		displayName: 'URL Hình Ảnh Sản Phẩm',
		name: 'photos',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateProduct'],
			},
		},
		description: 'URL hình ảnh mới của sản phẩm (nhiều URL cách nhau bằng dấu phẩy)',
	},
	{
		displayName: 'Trạng Thái Sản Phẩm',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateProduct'],
			},
		},
		description: 'Trạng thái hiển thị mới của sản phẩm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getProductList                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Vị Trí Bắt Đầu',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getProductList'],
			},
		},
		description: 'Vị trí bắt đầu của danh sách sản phẩm',
	},
	{
		displayName: 'Số Lượng',
		name: 'count',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getProductList'],
			},
		},
		description: 'Số lượng sản phẩm cần lấy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:createOrder                               */
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
				operation: ['createOrder'],
			},
		},
		description: 'ID của người dùng đặt hàng',
	},
	{
		displayName: 'Tên Người Nhận',
		name: 'shippingName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		description: 'Tên người nhận hàng',
	},
	{
		displayName: 'Số Điện Thoại',
		name: 'shippingPhone',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		description: 'Số điện thoại người nhận',
	},
	{
		displayName: 'Địa Chỉ Giao Hàng',
		name: 'shippingAddress',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		description: 'Địa chỉ giao hàng',
	},
	{
		displayName: 'Thành Phố',
		name: 'shippingCity',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		description: 'Thành phố giao hàng',
	},
	{
		displayName: 'Danh Sách Sản Phẩm',
		name: 'orderItems',
		placeholder: 'Thêm Sản Phẩm',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		options: [
			{
				name: 'itemsValues',
				displayName: 'Sản Phẩm',
				values: [
					{
						displayName: 'ID Sản Phẩm',
						name: 'productId',
						type: 'string',
						default: '',
						description: 'ID của sản phẩm',
					},
					{
						displayName: 'Số Lượng',
						name: 'quantity',
						type: 'number',
						default: 1,
						description: 'Số lượng sản phẩm',
					},
					{
						displayName: 'Giá',
						name: 'price',
						type: 'number',
						default: 0,
						description: 'Giá của sản phẩm',
					},
				],
			},
		],
		description: 'Danh sách sản phẩm trong đơn hàng',
	},
	{
		displayName: 'Phí Vận Chuyển',
		name: 'shippingFee',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		description: 'Phí vận chuyển',
	},
	{
		displayName: 'Giảm Giá',
		name: 'discount',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		description: 'Số tiền giảm giá',
	},
	{
		displayName: 'Tổng Tiền',
		name: 'total',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createOrder'],
			},
		},
		description: 'Tổng tiền đơn hàng',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:updateOrder                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Đơn Hàng',
		name: 'orderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateOrder', 'getOrderInfo'],
			},
		},
		description: 'ID của đơn hàng cần cập nhật/xem chi tiết',
	},
	{
		displayName: 'Trạng Thái Đơn Hàng',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Chờ Xác Nhận',
				value: 'pending',
			},
			{
				name: 'Đã Xác Nhận',
				value: 'confirmed',
			},
			{
				name: 'Đang Giao Hàng',
				value: 'shipping',
			},
			{
				name: 'Đã Giao Hàng',
				value: 'delivered',
			},
			{
				name: 'Đã Hủy',
				value: 'canceled',
			},
		],
		default: 'pending',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateOrder'],
			},
		},
		description: 'Trạng thái mới của đơn hàng',
	},
	{
		displayName: 'Lý Do',
		name: 'reason',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateOrder'],
			},
		},
		description: 'Lý do cập nhật trạng thái đơn hàng',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getOrderList                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Vị Trí Bắt Đầu',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getOrderList'],
			},
		},
		description: 'Vị trí bắt đầu của danh sách đơn hàng',
	},
	{
		displayName: 'Số Lượng',
		name: 'count',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getOrderList'],
			},
		},
		description: 'Số lượng đơn hàng cần lấy',
	},
	{
		displayName: 'Trạng Thái Đơn Hàng',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Tất Cả',
				value: 'all',
			},
			{
				name: 'Chờ Xác Nhận',
				value: 'pending',
			},
			{
				name: 'Đã Xác Nhận',
				value: 'confirmed',
			},
			{
				name: 'Đang Giao Hàng',
				value: 'shipping',
			},
			{
				name: 'Đã Giao Hàng',
				value: 'delivered',
			},
			{
				name: 'Đã Hủy',
				value: 'canceled',
			},
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getOrderList'],
			},
		},
		description: 'Lọc theo trạng thái đơn hàng',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:createCategory                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tên Danh Mục',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createCategory'],
			},
		},
		description: 'Tên của danh mục sản phẩm',
	},
	{
		displayName: 'Mô Tả Danh Mục',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createCategory'],
			},
		},
		description: 'Mô tả của danh mục sản phẩm',
	},
	{
		displayName: 'URL Hình Ảnh Danh Mục',
		name: 'photo',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createCategory'],
			},
		},
		description: 'URL hình ảnh của danh mục',
	},
	{
		displayName: 'Trạng Thái Danh Mục',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['createCategory'],
			},
		},
		description: 'Trạng thái hiển thị của danh mục',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:updateCategory                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Danh Mục',
		name: 'categoryId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateCategory'],
			},
		},
		description: 'ID của danh mục cần cập nhật',
	},
	{
		displayName: 'Tên Danh Mục',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateCategory'],
			},
		},
		description: 'Tên mới của danh mục',
	},
	{
		displayName: 'Mô Tả Danh Mục',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateCategory'],
			},
		},
		description: 'Mô tả mới của danh mục',
	},
	{
		displayName: 'URL Hình Ảnh Danh Mục',
		name: 'photo',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateCategory'],
			},
		},
		description: 'URL hình ảnh mới của danh mục',
	},
	{
		displayName: 'Trạng Thái Danh Mục',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Hiển Thị',
				value: 'show',
			},
			{
				name: 'Ẩn',
				value: 'hide',
			},
		],
		default: 'show',
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['updateCategory'],
			},
		},
		description: 'Trạng thái hiển thị mới của danh mục',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloOA:getCategoryList                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Vị Trí Bắt Đầu',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getCategoryList'],
			},
		},
		description: 'Vị trí bắt đầu của danh sách danh mục',
	},
	{
		displayName: 'Số Lượng',
		name: 'count',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['zaloOA'],
				operation: ['getCategoryList'],
			},
		},
		description: 'Số lượng danh mục cần lấy',
	},
];
