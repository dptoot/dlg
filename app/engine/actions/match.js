import * as types from './types';
import * as matchesActions from './matches';
import * as matchAlertsActions from './matchAlerts';
import Api from '../api';


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

export function deactivateMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		state.websocket.emit('deactivateMatch', {
			matchId: match.id,
			userId: state.user.id,
		})

	}
}

export function selectMatch(matchId) {
	return {
		type: types.SELECT_MATCH, 
		payload: {
			matchId: matchId,
		},
	}
}

export function submitCorrectAnswer(answer) {
	return (dispatch, getState) => {
		const state = getState();
		console.log(answer)

		Api.authenticatedPost({
			url: `/api/match/${state.match.id}/answer`,
			token: state.user.token,
			params: {
				answer_remote_id: answer.id,
				user_id: state.user.id,
			} 
		})

		.then(response => {
			dispatch(matchesActions.fetchMatches());
		})
	}
}

export function verifyAnswer(answer) {
	return (dispatch, getState) => {
		const state = getState();
		const match = state.matches.instances[state.match.id];

		const verifiedAnswer = match.answers.filter(matchAnswer => matchAnswer.remoteId === answer.id)[0];

		if (!!verifiedAnswer) {
			if (verifiedAnswer.selected) {
				dispatch(matchAlertsActions.showMatchAlert({
					title: 'Try Again!', 
					message: `Looks like someone has already chosen ${verifiedAnswer.title}.`
				}));
			} else {
			
				dispatch(matchAlertsActions.showMatchAlert({
					title: 'Well Done!', 
					message: `${match.actor.name} was in ${answer.name}.`
				}));
				dispatch(submitCorrectAnswer(answer))
			}
		} else {
			dispatch(matchAlertsActions.showMatchAlert({
					title: 'You Lost!', 
					message: `Sorry, ${match.actor.name} was not in ${answer.name}.`
				}));
			dispatch(deactivateMatch(state.match.id))
		}

	}
}
