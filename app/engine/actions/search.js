import * as types from './types';
import Api from '../api';
import debounce from 'lodash.debounce';
import RemoteDataInterface from '../remoteDataInterface';

export function showSearch({collection, onSelection}) {
	return {
		type: types.SHOW_SEARCH,
		payload: {
			collection: collection, 
			onSelection: onSelection,
		},
	}
}

export function hideSearch() {
	return {
		type: types.HIDE_SEARCH,
		payload: {},
	}
}

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

const debounceRemoteSearch = debounce((state, searchType, value) => remoteSearch(state, searchType, value), 500);

export function remoteSearch(state, searchType, value) {
	state.websocket.emit(searchType, {
		userId: state.user.id,
        query: value,
    });
	
}

export function updateSearch({results, searchType}) {
	return (dispatch, getState) => {

		switch(searchType) {
			case 'movies': 
				normalizedResults = results.map(RemoteDataInterface.movie);
				dispatch(updateMovieSearchResults(normalizedResults));
				break;
			case 'users': 
				normalizedResults = results.map(RemoteDataInterface.user);
				dispatch(updateUserSearchResults(normalizedResults));
				break;
			case 'actors': 
				normalizedResults = results.map(RemoteDataInterface.actor);
				dispatch(updateActorSearchResults(normalizedResults));
				break;
		}
	}
}

export function fetchSearch(collection, value) {
	return (dispatch, getState) => {
		const state = getState();
		let searchType;

		switch(collection) {
			case 'movies':
				searchType = 'searchMovies'; 
				dispatch(updateMovieSearchValue(value));
				break;
			case 'users': 
				searchType = 'searchUsers'; 
				dispatch(updateUserSearchValue(value));
				break;
			case 'actors': 
				searchType = 'searchActors'; 
				dispatch(updateActorSearchValue(value));
				break;
		}

		debounceRemoteSearch(state, searchType, value)
		
	}
}

export function fetchRandomActorSearch() {
	return (dispatch, getState) => {
		const state = getState();
		state.websocket.emit('searchActorsRandom', {
			userId: state.user.id,
    	});
	}
}