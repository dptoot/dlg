import * as types from './types';
import {updateMatches} from './matches';
import {updateMatch} from './match';
import {updateSearch} from './search';
import {loginUser, updateUser} from './user';

export function updateWebsocket(websocket) {
	return {
		type: types.UPDATE_WEBSOCKET,
		payload: {
			websocket: websocket
		},
	}
}

export function initializeWebsocketListeners() {
	return (dispatch, getState) => {

		const state = getState();

		// UPDATE MATCHES
		state.websocket.on('updateMatches', data => {
			if(data.userId === state.user.id) {
				dispatch(updateMatches(data.matches));
			}
		});

		// UPDATE MATCH
		state.websocket.on('updateMatch', data => {
			if (data.match.players.user.id === state.user.id) {
				dispatch(updateMatch(data.match));
			}
		});

		// UPDATE SEARCH
		state.websocket.on('updateSearch', data => {
			console.log('update search', data)

			if (data.userId === state.user.id) {
				dispatch(updateSearch(data));
			}
		});

		// UPDATE SEARCH
		state.websocket.on('updateUser', data => {
			console.log('update user', data)
			if(data.userId === state.user.id) {
				dispatch(updateUser(data.user));
			}
		});
	}
}

