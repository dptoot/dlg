import * as types from './types';

export function updateWebsocket(websocket) {
	return {
		type: types.UPDATE_WEBSOCKET,
		payload: {
			websocket: websocket
		},
	}
}
