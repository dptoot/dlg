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

export function updateMatches(matches) {

	console.log(matches)

	return (dispatch, getState) => {

		const state = getState();
		const normalizedMatches = {};

		// Iterate over each of the match types and normalize the data
		Object.keys(matches).forEach((matchType, index) => {
			normalizedMatches[matchType] = matches[matchType].map(match => {
				return RemoteDataInterface.getMatch(match, state);
			})
		})

		// Update Matches
		dispatch({
			type: types.UPDATE_MATCHES,
			payload: {
				isRefreshing: false,
				matches: normalizedMatches,
			}
		})
	}
}

export function refreshMatches(userId) {
	return (dispatch, getState) => {
		dispatch(showRefreshingMatches());
		dispatch(fetchMatches(userId));
	}
}

export function fetchMatches() {
	return (dispatch, getState) => {
		const state = getState();
		state.websocket.emit('fetchMatches', {
			userId: state.user.id,
		});
	}
}
