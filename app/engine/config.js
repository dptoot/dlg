const configuration = {
	development: {
		API_HOST: 'http://localhost:3000',
		WEBSOCKET_HOST: 'http://localhost:3000',
	},
	production: {
		API_HOST: 'http://api-douglovesgames.rhcloud.com',
		WEBSOCKET_HOST: 'http://api-douglovesgames.rhcloud.com:8000' 
	}
}

const getConfigurationKey = (key) => {
	return configuration[process.env.NODE_ENV][key];
}

export default getConfigurationKey;