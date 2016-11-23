import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isRefreshing: false,
	isFetching: true,
	showMatchAlert: false,
	showQuitMatchAlert: false,
	matchAlert: null,
};

export const match = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 
	
	[types.UPDATE_MATCH](state, action) {
		return {
			...state, 
	
			...action.payload.match,
		};
	},

	[types.SHOW_REFRESHING_MATCH](state, action) {
		return {
			...state, 
			isRefreshing: true,
		};
	},

	[types.HIDE_REFRESHING_MATCH](state, action) {
		return {
			...state, 
			isRefreshing: false,
		};
	},

	[types.SHOW_MATCH_ALERT](state, action) {
		return {
			...state, 
			showMatchAlert: true,
			matchAlert: action.payload.matchAlert,
		};
	},

	[types.HIDE_MATCH_ALERT](state, action) {
		return {
			...state, 
			showMatchAlert: false,
			matchAlert: null,
		};
	},

	[types.SHOW_QUIT_MATCH_ALERT](state, action) {
		return {
			...state, 
			showQuitMatchAlert: true,
		};
	},

	[types.HIDE_QUIT_MATCH_ALERT](state, action) {
		return {
			...state, 
			showQuitMatchAlert: false,
		};
	},



})