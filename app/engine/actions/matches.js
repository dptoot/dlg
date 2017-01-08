import * as types from './types';
import Api from '../api';

export function showRefreshingMatches() {
	return {
		type: types.SHOW_REFRESHING_MATCHES, 
		payload: {},
	}
}

export function updateMatches(matches) {
	return (dispatch, getState) => {
		// console.log(matches)

		// Update Matches
		dispatch({
			type: types.UPDATE_MATCHES,
			payload: {
				types: matches.types,
				instances: matches.instances,
			}
		})
	}
}

export function refreshMatches() {
	return (dispatch, getState) => {
		dispatch(showRefreshingMatches());
		dispatch(fetchMatches());
	}
}

export function fetchMatches() {
	return (dispatch, getState) => {
		const state = getState();

		Api.authenticatedGet({
			url: `/api/matches/${state.user.id}`, 
			token: state.user.token,
		})
		
		.then(response => {
			dispatch(updateMatches(response.matches))
		}) 
		
	}
}
