import * as types from './types';
import Api from '../api';

export function clearMatchChatInputValue() {
	return {
		type: types.CLEAR_MATCH_CHAT_INPUT_VALUE, 
		payload: {},
	}
}

export function submitChatMessage() {
	return (dispatch, getState) => {
		const state = getState();
		
		// Send chat data to server via websockets
		state.websocket.emit('submitChatMessage', {
			matchId: state.match.id,
			userId: state.user.id,
			opponentId: state.match.players.opponent.id,
			message: state.match.chat.value,
			timestamp: Date.now(), 
		});
		
	}
}

export function updateMatchChatInputValue(value) {
	return {
		type: types.UPDATE_MATCH_CHAT_INPUT_VALUE, 
		payload: {
			value: value,
		},
	}
}

export function updateMatchChatHistory(history) {
	return {
		type: types.UPDATE_MATCH_CHAT_HISTORY, 
		payload: {
			history: history,
		},
	}
}

export function updateMatchChatLastActivity() {
	return {
		type: types.UPDATE_MATCH_CHAT_LAST_ACTIVITY, 
		payload: {},
	}
}