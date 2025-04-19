const { ZaloOA } = require('./dist/nodes/ZaloOA/ZaloOA.node.js');
const { ZaloOAWebhook } = require('./dist/nodes/ZaloOAWebhook/ZaloOAWebhook.node.js');
const { ZaloOAApi } = require('./dist/credentials/ZaloOAApi.credentials.js');

module.exports = {
	nodes: {
		ZaloOA,
		ZaloOAWebhook,
	},
	credentials: {
		ZaloOAApi,
	},
};
