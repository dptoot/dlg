import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isRefreshing: false,
	showPendingMatchAlert: false,
	lists: {
		current: [],
		inactive: [],
		waiting: [],
		pending: [],
	},
};

export const matches = createReducer(initialState, {

	[types.SHOW_PENDING_MATCH_ALERT](state, action) {
		
		return {
			...state, 
			showPendingMatchAlert: true,
		};
	},

	[types.HIDE_PENDING_MATCH_ALERT](state, action) {
		return {
			...state, 
			showPendingMatchAlert: false,
		};
	},

	[types.SHOW_REFRESHING_MATCHES](state, action) {
		return {
			...state, 
			isRefreshing: true,
		};
	},

	[types.HIDE_REFRESHING_MATCHES](state, action) {
		return {
			...state, 
			isRefreshing: false,
		};
	},

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 
	
	[types.UPDATE_MATCHES_LIST](state, action) {
		return {
			...state, 
			lists: {
				...action.payload.matches
			}
		};
	},

})