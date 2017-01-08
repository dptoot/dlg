import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isInitialState: true,
	isRefreshing: false,
	showPendingMatchAlert: false,
	types: {
		current: [],
		inactive: [],
		waiting: [],
		pending: [],
	},
	instances: [],

};

export const matches = createReducer(initialState, {
	[types.APP_RESET](state, action) {
		return initialState;
	}, 

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

	
	
	[types.UPDATE_MATCHES](state, action) {
		return {
			...state,
			isInitialState: false, 
			isRefreshing: false,
			types: {
				...action.payload.types
			}, 
			instances: action.payload.instances
		};
	},

})