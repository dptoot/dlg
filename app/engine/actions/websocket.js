import * as types from './types';
import {updateMatches} from './matches';
import {updateMatch} from './match';
import {updateSearch} from './search';
import {loginUser} from './user';

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

			const playerIds = data.match.players.map(player => player.user._id);

			if(playerIds.includes(state.user.id)) {
				dispatch(updateMatch(data.match));
			}
		});

		// UPDATE SEARCH
		state.websocket.on('updateSearch', data => {
			if(data.userId === state.user.id) {
				dispatch(updateSearch(data));
			}
		});
	}
}

