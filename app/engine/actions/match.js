import * as types from './types';
import * as matchesActions from './matches';
import * as matchAlertsActions from './matchAlerts';
import Api from '../api';


export function acceptMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();

		Api.authenticatedGet({
			url: `/api/match/${matchId}/accept`,
			token: state.user.token,
		})

		.then(response => {
			dispatch(matchesActions.fetchMatches());
		})

	}
}

export function archiveMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedPost({
			url: `/api/match/${matchId}/archive`,
			token: state.user.token,
			params: {
				userId: state.user.id,
			} 
		})

		.then(response => {
			dispatch(matchesActions.fetchMatches());
		})

	}
}

export function archiveInactiveMatches() {
	return (dispatch, getState) => {
		const state = getState();

		const archiveMatchPromise = (matchId) => {
			return Api.authenticatedPost({
				url: `/api/match/${matchId}/archive`,
				token: state.user.token,
				params: {
					userId: state.user.id,
				} 
			})
		}
		
		const archivePromises = state.matches.types.inactive.map(archiveMatchPromise);

		Promise.all(archivePromises)
		.then(response => {
			dispatch(matchesActions.fetchMatches());
		})

	}
}



export function createMatch() {
	return (dispatch, getState) => {
		const state = getState();

		Api.authenticatedPost({
			url: `/api/match`,
			token: state.user.token,
			params: {
	            actorRemoteId: state.search.actors.selected.id, 
	            opponentId: state.search.users.selected.id,
	            userId: state.user.id, 
	        }
		})

		.then(response => {
			dispatch(matchesActions.fetchMatches());
		})

	}
}

export function deleteMatch(matchId) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedDelete({
			url: `/api/match/${matchId}`,
			token: state.user.token,
		})

		.then(response => {
			dispatch(matchesActions.fetchMatches());
		})

	}
}

export function deactivateMatch({matchId, winnerId, loserId}) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedPost({
			url: `/api/match/${matchId}/deactivate`,
			token: state.user.token,
			params: {
				winnerId: winnerId,
				loserId: loserId,
			} 
		})

		.then(response => {
			dispatch(matchesActions.fetchMatches());
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
				answerRemoteId: answer.id,
				userId: state.user.id,
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
				
				// Show Match Alert for previously selected answer
				dispatch(matchAlertsActions.showMatchAlert({
					title: 'Try Again!', 
					message: `Looks like someone has already chosen ${verifiedAnswer.title}.`
				}));

			} else {
				
				// Show Success Match Alert
				dispatch(matchAlertsActions.showMatchAlert({
					title: 'Well Done!', 
					message: `${match.actor.name} was in ${answer.name}.`
				}));

				// Submit Correct answer to DB
				dispatch(submitCorrectAnswer(answer))
			}

		} else {
			
			// Show Losing Match Alert
			dispatch(matchAlertsActions.showMatchAlert({
				title: 'You Lost!', 
				message: `Sorry, ${match.actor.name} was not in ${answer.name}.`
			}));

			// Deactivate Match 
			dispatch(deactivateMatch({
				matchId: state.match.id,
				winnerId: match.players.opponent.id,
				loserId: match.players.user.id,
			}))

		}

	}
}
