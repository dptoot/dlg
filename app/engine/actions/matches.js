import * as types from './types';
import Api from '../api';
import moment from 'moment';

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

		const getOpponent = (players) => {
			return players.filter(player => player.user._id !== state.user.id)[0];
		}
		
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

			Object.keys(matches).forEach((matchType, index) => {

				matchLists[matchType] = matches[matchType].map(match => {
					const {_id, updatedAt, player_1, player_2, ...rest} = match;

					return {
						id: _id,
						opponent: getOpponent([player_1, player_2]),
						lastPlayed: moment(updatedAt).fromNow(),
						...rest
					}
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