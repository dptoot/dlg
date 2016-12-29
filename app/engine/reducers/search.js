import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isFetching: false,
	showSearch: false,
	collection: null,
	onSelection: () => {},
	onHide: () => {},
	movies: {
		value: '',
		results: [],
		selected: null,
	},

	users: {
		value: '',
		results: [],
		selected: null,
	},

	actors: {
		value: '',
		results: [],
		selected: null,
	},
	
};

export const search = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 

	// SHOW SEARCH 
	[types.SHOW_SEARCH](state, action) {
		return {
			...state, 
			showSearch: true,
			collection: action.payload.collection,
			onSelection: action.payload.onSelection,
			onHide: action.payload.onHide,
		};
	},

	// HIDE SEARCH
	[types.HIDE_SEARCH](state, action) {
		return {
			...state, 
			showSearch: false,
			collection: initialState.collection,
			onSelection: initialState.onSelection,
			onHide: initialState.onHide,
		};
	},

	[types.CLEAR_SEARCH_INPUT_VALUE](state, action) {
		const collection = action.payload.collection;
		return {
			...state,
			[collection]: {
				...state[collection],
				value: initialState[collection].value,
			}	
		};
	},

	[types.CLEAR_SEARCH_RESULTS](state, action) {
		const collection = action.payload.collection;
		return {
			...state,
			[collection]: {
				...state[collection],
				results: initialState[collection].results,
			}	
		};
	},

	[types.CLEAR_SEARCH_SELECTED_RESULT](state, action) {
		const collection = action.payload.collection;
		return {
			...state,
			[collection]: initialState[collection],	
		};
	},

	[types.UPDATE_SEARCH_INPUT_VALUE](state, action) {
		const collection = action.payload.collection;
		return {
			...state,
			[collection]: {
				...state[collection],
				value: action.payload.value,
			}	
		};
	},

	[types.UPDATE_SEARCH_RESULTS](state, action) {
		const collection = action.payload.collection;
		return {
			...state,
			[collection]: {
				...state[collection],
				results: action.payload.results,
			}	
		};
	},

	[types.UPDATE_SEARCH_SELECTED_RESULT](state, action) {
		const collection = action.payload.collection;
		return {
			...state,
			[collection]: {
				...state[collection],
				selected: action.payload.selected,
			}	
		};
	},
})