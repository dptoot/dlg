import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isFetching: false,
	
	movies: {
		value: null,
		results: [],
		selected: null,
	},

	users: {
		value: null,
		results: [],
		selected: null,
	},

	actors: {
		value: null,
		results: [],
		selected: null,
	},
	
};

export const search = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 
	
	// MOVIE SEARCH
	[types.UPDATE_MOVIE_SEARCH_VALUE](state, action) {
		return {
			...state,
			movies: {
				...state.movies,
				value: action.payload.value,
			}, 
			isFetching: false,
		};
	},
	[types.CLEAR_MOVIE_SEARCH_VALUE](state, action) {
		return {
			...state, 
			movies: {
				...state.movies,
				value: null,
			},
			isFetching: false,
		};
	}, 
	[types.UPDATE_MOVIE_SEARCH_RESULTS](state, action) {
		return {
			...state, 
			movies: {
				...state.movies,
				results: action.payload.results,
			},
			isFetching: false,
		};
	},
	[types.CLEAR_MOVIE_SEARCH_RESULTS](state, action) {
		return {
			...state, 
			movies: {
				...state.movies,
				results: [],
			},
			isFetching: false,
		};
	}, 
	[types.SELECT_MOVIE_SEARCH_RESULT](state, action) {
		return {
			...state, 
			movies: {
				...state.movies,
				selected: action.payload.selected,
			},
			isFetching: false,
		};
	}, 

	// USER SEARCH
	[types.UPDATE_USER_SEARCH_VALUE](state, action) {
		return {
			...state,
			users: {
				...state.users,
				value: action.payload.value,
			}, 
			isFetching: false,
		};
	},
	[types.CLEAR_USER_SEARCH_VALUE](state, action) {
		return {
			...state, 
			users: {
				...state.users,
				value: null,
			},
			isFetching: false,
		};
	}, 
	[types.UPDATE_USER_SEARCH_RESULTS](state, action) {
		return {
			...state, 
			users: {
				...state.users,
				results: action.payload.results,
			},
			isFetching: false,
		};
	},
	[types.CLEAR_USER_SEARCH_RESULTS](state, action) {
		return {
			...state, 
			users: {
				...state.users,
				results: [],
			},
			isFetching: false,
		};
	}, 
	[types.SELECT_USER_SEARCH_RESULT](state, action) {
		return {
			...state, 
			users: {
				...state.users,
				selected: action.payload.selected,
			},
			isFetching: false,
		};
	}, 


	// ACTOR SEARCH
	[types.UPDATE_ACTOR_SEARCH_VALUE](state, action) {
		return {
			...state,
			actors: {
				...state.actors,
				value: action.payload.value,
			}, 
			isFetching: false,
		};
	},
	[types.CLEAR_ACTOR_SEARCH_VALUE](state, action) {
		return {
			...state, 
			actors: {
				...state.actors,
				value: null,
			},
			isFetching: false,
		};
	}, 
	[types.UPDATE_ACTOR_SEARCH_RESULTS](state, action) {
		return {
			...state, 
			actors: {
				...state.actors,
				results: action.payload.results,
			},
			isFetching: false,
		};
	},
	[types.CLEAR_ACTOR_SEARCH_RESULTS](state, action) {
		return {
			...state, 
			actors: {
				...state.actors,
				results: [],
			},
			isFetching: false,
		};
	}, 
	[types.SELECT_ACTOR_SEARCH_RESULT](state, action) {
		return {
			...state, 
			actors: {
				...state.actors,
				selected: action.payload.selected,
			},
			isFetching: false,
		};
	}, 
})