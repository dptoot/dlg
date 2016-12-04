const configuration = {
	development: {
		API_HOST: 'http://localhost:3000',
		WEBSOCKET_HOST: 'http://localhost:3000',
	},
	production: {
		API_HOST: 'http://api-douglovesgames.rhcloud.com',
		WEBSOCKET_HOST: 'https://api-douglovesgames.rhcloud.com:8443' 
	}
}

const getConfigurationKey = (key) => {
	return configuration[process.env.NODE_ENV][key];
}

export default getConfigurationKey;