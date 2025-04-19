import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ZaloOAApi implements ICredentialType {
	name = 'zaloOAApi';
	displayName = 'Zalo OA API';
	documentationUrl = 'https://developers.zalo.me/docs/api/official-account-api-230';
	properties: INodeProperties[] = [
		{
			displayName: 'App ID',
			name: 'appId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			default: '',
			description: 'Official Account Access Token từ Zalo OA',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Refresh Token',
			name: 'refreshToken',
			type: 'string',
			default: '',
			description: 'Refresh Token để làm mới Access Token khi hết hạn',
			typeOptions: {
				password: true,
			},
		},
	];

	// Cách xác thực API request
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				access_token: '={{ $credentials.accessToken }}',
			},
		},
	};

	// Kiểm tra credentials có hoạt động không
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://openapi.zalo.me/v3.0/oa',
			url: '/getprofile',
			method: 'GET',
		},
	};
}
