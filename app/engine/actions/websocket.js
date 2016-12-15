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

export function initializeUserWebsocketListeners() {
	return (dispatch, getState) => {

		const state = getState();

		// LOGIN USER
		state.websocket.on('updateUser', data => {
			dispatch(loginUser(data));
		});
	}
}

export function initializeMatchWebsocketListeners() {
	return (dispatch, getState) => {

		const state = getState();

		// UPDATE MATCHES
		state.websocket.on('updateMatches', data => {
			if(data.userId === state.user.id) {
				console.log("updating matches", data.matches)
				dispatch(updateMatches(data.matches));
			}
		});

		// UPDATE MATCH
		state.websocket.on('updateMatch', data => {

			const player1Id = data.match.player_1.user._id;
			const player2Id = data.match.player_2.user._id;

			if([player1Id, player2Id].includes(state.user.id)) {
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

