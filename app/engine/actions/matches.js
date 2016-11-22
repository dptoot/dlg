import * as types from './types';
import Api from '../api';
import RemoteDataInterface from '../remoteDataInterface';


export function showRefreshingMatches() {
	return {
		type: types.SHOW_REFRESHING_MATCHES, 
		payload: {},
	}
}

export function hideRefreshingMatches() {
	return {
		type: types.HIDE_REFRESHING_MATCHES, 
		payload: {},
	}
}


export function showPendingMatchAlert() {
	return {
		type: types.SHOW_PENDING_MATCH_ALERT, 
		payload: {},
	}
}

export function hidePendingMatchAlert() {
	return {
		type: types.HIDE_PENDING_MATCH_ALERT, 
		payload: {},
	}
}

export function updateMatchesList(matches) {
	return {
		isRefreshing: false,
		type: types.UPDATE_MATCHES_LIST,
		payload: {
			matches
		},
	}
}

export function refreshMatches(userId) {
	return (dispatch, getState) => {
		dispatch(showRefreshingMatches());
		dispatch(fetchMatchesList(userId));
	}
}



export function fetchMatchesList(userId) {
	return (dispatch, getState) => {
		const state = getState();
		
		Api.authenticatedGet(`/api/users/${userId}/matches`)
		.then(response => {
			if (response.success) {
				return response.matches
			} else {
				// handle bad login
			}
		})
		.then(matches => {
			
			const matchLists = {};

			// Iterate over each of the match types and normalize the data
			Object.keys(matches).forEach((matchType, index) => {
				matchLists[matchType] = matches[matchType].map(match => {
					return RemoteDataInterface.getMatch(match, state);
				})
			})

			return matchLists;
		})
		.then(matchLists => {
			dispatch(updateMatchesList(matchLists))
			dispatch(hideRefreshingMatches());
		})
	}
}

export function deleteMatch(matchId) {
	return (dispatch, getState) => {

		const state = getState();
		
		Api.authenticatedPost(`/api/matches/${matchId}/archive`, {
			user_id: state.user.id,
		})
		.then(response => {
			if (response.success) {
				return response
			} else {
				// handle bad login
			}
		})
		.then(response => {
			dispatch(fetchMatchesList(state.user.id))
		})
	}
}