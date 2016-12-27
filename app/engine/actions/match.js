import * as types from './types';
import Api from '../api';

const matchApi = '/api/match';

export function acceptMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		state.websocket.emit('acceptMatch', {
			matchId: matchId,
			userId: state.user.id, 
		});

	}
}

export function archiveMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		state.websocket.emit('archiveMatch', {
			userId: state.user.id,
			matchId: matchId,
		})

	}
}

export function clearMatchChatInputValue() {
	return {
		type: types.CLEAR_MATCH_CHAT_INPUT_VALUE, 
		payload: {},
	}
}

export function createMatch(socket) {
	return (dispatch, getState) => {
		const state = getState();

		state.websocket.emit('createMatch', {
            actorRemoteId: state.search.actors.selected.id, 
            opponentId: state.search.users.selected.id,
            userId: state.user.id, 
        });
		
	}
}

export function deleteMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		state.websocket.emit('deleteMatch', {
			matchId: matchId,
			userId: state.user.id, 
		});

	}
}

export function deactivateMatch(match) {
	return (dispatch, getState) => {
		const state = getState();
		
		state.websocket.emit('deactivateMatch', {
			matchId: match.id,
			userId: state.user.id,
			opponentId: match.players.opponent.id,
		})

	}
}

export function fetchMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();

		state.websocket.emit('fetchMatch', {
			matchId: matchId,
			userId: state.user.id,
		});

	}
}

export function hideMatchAlert() {
	return {
		type: types.HIDE_MATCH_ALERT, 
		payload: {},
	}
}

export function hideRefreshingMatch() {
	return {
		type: types.HIDE_REFRESHING_MATCH, 
		payload: {},
	}
}

export function hideQuitMatchAlert() {
	return {
		type: types.HIDE_QUIT_MATCH_ALERT, 
		payload: {},
	}
}	

export function refreshMatch(matchId) {
	return (dispatch, getState) => {
		dispatch(showRefreshingMatch());
		dispatch(fetchMatch(matchId));
	}
}

export function showRefreshingMatch() {
	return {
		type: types.SHOW_REFRESHING_MATCH, 
		payload: {},
	}
}

export function showMatchAlert(matchAlert) {
	return {
		type: types.SHOW_MATCH_ALERT, 
		payload: {
			matchAlert: matchAlert,
		},
	}
}

export function showQuitMatchAlert() {
	return {
		type: types.SHOW_QUIT_MATCH_ALERT, 
		payload: {},
	}
}

export function submitCorrectAnswer(answer) {
	return (dispatch, getState) => {
		const state = getState();
		
		state.websocket.emit('submitMatchAnswer', {
			matchId: state.match.id,
			answerRemoteId: answer.id,
			title: answer.name,
			userId: state.user.id,
			opponentId: state.match.players.opponent.id,
		})
		
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

export function updateMatch(matchData) {
	return (dispatch, getState) => {
		const state = getState();

		const match = Object.assign({}, matchData, {
			showSearch: matchData.players.user.status === 'current',
		})
		
		dispatch({
			type: types.UPDATE_MATCH,
			payload: {
				match: match,
			},
		})
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


export function verifyAnswer(answer) {
	return (dispatch, getState) => {
		const state = getState();

		const verifiedAnswer = state.match.answers.filter(matchAnswer => matchAnswer.remoteId === answer.id)[0];

		if (!!verifiedAnswer) {
			if (verifiedAnswer.selected) {
				dispatch(showMatchAlert({
					title: 'Try Again!', 
					message: `Looks like someone has already chosen ${verifiedAnswer.title}.`
				}));
			} else {
			
				dispatch(showMatchAlert({
					title: 'Well Done!', 
					message: `${state.match.actor.name} was in ${answer.name}.`
				}));
				dispatch(submitCorrectAnswer(answer))
			}
		} else {
			dispatch(showMatchAlert({
					title: 'You Lost!', 
					message: `Sorry, ${state.match.actor.name} was not in ${answer.name}.`
				}));
			dispatch(deactivateMatch(state.match))
		}

	}
}
