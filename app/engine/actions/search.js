import * as types from './types';
import Api from '../api';
import RemoteDataInterface from '../remoteDataInterface';

// MOVIE
export function updateMovieSearchValue(value) {
	return {
		type: types.UPDATE_MOVIE_SEARCH_VALUE,
		payload: {
			value: value
		},
	}
}

export function clearMovieSearchValue() {
	return {
		type: types.CLEAR_MOVIE_SEARCH_VALUE,
	}
}

export function clearMovieSearchResult() {
	return {
		type: types.CLEAR_MOVIE_SEARCH_RESULT,
	}
}

export function updateMovieSearchResults(results) {
	return {
		type: types.UPDATE_MOVIE_SEARCH_RESULTS,
		payload: {
			results: results
		},
	}
}

export function clearMovieSearchResults() {
	return {
		type: types.CLEAR_MOVIE_SEARCH_RESULTS,
	}
}

export function selectMovieSearchResult(result) {
	return {
		type: types.SELECT_MOVIE_SEARCH_RESULT,
		payload: {
			selected: result
		},
	}
}


// USER
export function updateUserSearchValue(value) {
	return {
		type: types.UPDATE_USER_SEARCH_VALUE,
		payload: {
			value: value
		},
	}
}

export function clearUserSearchValue() {
	return {
		type: types.CLEAR_USER_SEARCH_VALUE,
	}
}

export function clearUserSearchResult() {
	return {
		type: types.CLEAR_USER_SEARCH_RESULT,
	}
}

export function updateUserSearchResults(results) {
	return {
		type: types.UPDATE_USER_SEARCH_RESULTS,
		payload: {
			results: results
		},
	}
}

export function clearUserSearchResults() {
	return {
		type: types.CLEAR_USER_SEARCH_RESULTS,
	}
}

export function selectUserSearchResult(result) {
	return {
		type: types.SELECT_USER_SEARCH_RESULT,
		payload: {
			selected: result
		},
	}
}


// ACTOR
export function updateActorSearchValue(value) {
	return {
		type: types.UPDATE_ACTOR_SEARCH_VALUE,
		payload: {
			value: value
		},
	}
}

export function clearActorSearchValue() {
	return {
		type: types.CLEAR_ACTOR_SEARCH_VALUE,
	}
}

export function clearActorSearchResult() {
	return {
		type: types.CLEAR_ACTOR_SEARCH_RESULT,
	}
}

export function updateActorSearchResults(results) {
	return {
		type: types.UPDATE_ACTOR_SEARCH_RESULTS,
		payload: {
			results: results
		},
	}
}

export function clearActorSearchResults() {
	return {
		type: types.CLEAR_ACTOR_SEARCH_RESULTS,
	}
}

export function selectActorSearchResult(result) {
	return {
		type: types.SELECT_ACTOR_SEARCH_RESULT,
		payload: {
			selected: result
		},
	}
}

export function fetchSearch(collection, value) {
	return (dispatch, getState) => {

		switch(collection) {
			case 'movies': 
				dispatch(updateMovieSearchValue(value));
				break;
			case 'users': 
				dispatch(updateUserSearchValue(value));
				break;
			case 'actors': 
				dispatch(updateActorSearchValue(value));
				break;
		}
		
		const state = getState();
		
		return Api.authenticatedPost(`/api/search/${collection}`, {
			query: state.search[collection].value,
		})

		.then(response => {
			if (response.success) {
				return response;
			} else {
				// handle bad login
			}
		})

		.then(response => {
			let results;

			switch(collection) {
				case 'movies': 
					results = response.results.map(RemoteDataInterface.movie);
					dispatch(updateMovieSearchResults(results));
					break;
				case 'users': 
					results = response.results.map(RemoteDataInterface.user);
					dispatch(updateUserSearchResults(results));
					break;
				case 'actors': 
					results = response.results.map(RemoteDataInterface.actor);
					dispatch(updateActorSearchResults(results));
					break;
			}

		})
	}
}

export function fetchRandomActorSearch() {
	return (dispatch, getState) => {

		return Api.authenticatedGet(`/api/search/actors/random`)

		.then(response => {
			if (response.success) {
				return response;
			} else {
				// handle bad login
			}
		})

		.then(response => {
			const results = response.results.map(RemoteDataInterface.actor);
			dispatch(updateActorSearchResults(results));
		})
	}
}