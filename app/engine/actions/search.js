import * as types from './types';
import Api from '../api';
import debounce from 'lodash.debounce';

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

export function clearSearchInputValue(collection) {
	return {
		type: types.CLEAR_SEARCH_INPUT_VALUE,
		payload: {
			collection: collection,
		},
	}
}

export function clearSearchResults(collection) {
	return {
		type: types.CLEAR_SEARCH_RESULTS,
		payload: {
			collection: collection,
		},
	}
}

export function clearSearchSelectedResult(collection) {
	return {
		type: types.CLEAR_SEARCH_SELECTED_RESULT,
		payload: {
			collection: collection,
		},
	}
}

export function updateSearchInputValue(collection, value) {
	return {
		type: types.UPDATE_SEARCH_INPUT_VALUE,
		payload: {
			collection: collection,
			value: value,
		},
	}
}

export function updateSearchResults(collection, results) {
	return {
		type: types.UPDATE_SEARCH_RESULTS,
		payload: {
			collection: collection,
			results: results
		},
	}
}

export function updateSearchSelectedResult(collection, result) {
	return {
		type: types.UPDATE_SEARCH_SELECTED_RESULT,
		payload: {
			collection: collection,
			selected: result
		},
	}
}


// Debouced call to Remote Server
const debouncedSearch = debounce((state, collection, value) => {
	let message;

	switch(collection) {
		case 'movies':
			message = 'searchMovies'; 
			break;
		case 'users': 
			message = 'searchUsers'; 
			break;
		case 'actors': 
			message = 'searchActors'; 
			break;
	}

	state.websocket.emit(message, {
		userId: state.user.id,
        query: value,
    });

}, 500);

export function updateSearch({collection, results}) {
	return (dispatch, getState) => {
		dispatch(updateSearchResults(collection, results));
	}
}

export function fetchSearch(collection, value) {
	return (dispatch, getState) => {
		const state = getState();
		let searchType;

		dispatch(updateSearchInputValue(collection, value));

		debouncedSearch(state, collection, value)
		
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