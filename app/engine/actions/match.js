import * as types from './types';
import Api from '../api';
import RemoteDataInterface from '../remoteDataInterface';


export function updateMatch(match) {
	return {
		type: types.UPDATE_MATCH,
		payload: {
			match
		},
	}
}

export function showRefreshingMatch() {
	return {
		type: types.SHOW_REFRESHING_MATCH, 
		payload: {},
	}
}

export function hideRefreshingMatch() {
	return {
		type: types.HIDE_REFRESHING_MATCH, 
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

export function hideMatchAlert() {
	return {
		type: types.HIDE_MATCH_ALERT, 
		payload: {},
	}
}

export function showQuitMatchAlert() {
	return {
		type: types.SHOW_QUIT_MATCH_ALERT, 
		payload: {},
	}
}

export function hideQuitMatchAlert() {
	return {
		type: types.HIDE_QUIT_MATCH_ALERT, 
		payload: {},
	}
}


// thunks
export function refreshMatch(match) {
	return (dispatch, getState) => {
		dispatch(showRefreshingMatch());
		dispatch(fetchMatch(match));
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
			dispatch(deactivateMatch('failed'))
		}

	}
}

export function createMatch() {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedPost(`/api/matches/`, {
			opponent_id: state.search.users.selected.id,
			remote_id: state.search.actors.selected.id,
			user_id: state.user.id,
		})
		.then(response => {
			if (response.success) {
				
			} else {
				// handle bad login
			}
		})
	}
}

export function fetchMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedGet(`/api/matches/${matchId}`)
		.then(response => {
			if (response.success) {
				return response.match
			} else {
				// handle bad login
			}
		})
		.then(match => {
			console.log('match', match);
			return RemoteDataInterface.getMatch(match, state);
		})
		.then(match => {
			dispatch(updateMatch(match));
			dispatch(hideRefreshingMatch());
		})


	}
}

export function submitCorrectAnswer(answer) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedPost(`/api/matches/${state.match.id}/answer`, {
			remote_id: answer.id,
			title: answer.name,
			user_id: state.user.id
		})
		.then(response => {
			if (response.success) {
				return response.match
			} else {
				// handle bad login
			}
		})
	}
}

export function acceptMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedGet(`/api/matches/${matchId}/accept`)
		.then(response => {
			if (response.success) {
				return response.match
			} else {
				// handle bad login
			}
		})

	}
}

export function declineMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedDelete(`/api/matches/${matchId}`)
		.then(response => {
			if (response.success) {
				return response.match
			} else {
				// handle bad login
			}
		})

	}
}

export function deactivateMatch(reason) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedPost(`/api/matches/${state.match.id}/deactivate`, {
			reason: reason,
			winner_id: state.match.opponent.user.id,
			loser_id: state.user.id,
		})
		.then(response => {
			if (response.success) {
				return response.match
			} else {
				// handle bad login
			}
		})
	}
}

export function archiveMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedPost(`/api/matches/${matchId}/archive`, {
			user_id: state.user.id,
		})
		.then(response => {
			if (response.success) {
				return response.match
			} else {
				// handle bad login
			}
		})
	}
}