import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isInitialState: true,
	isRefreshing: false,
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

	[types.SHOW_REFRESHING_MATCHES](state, action) {
		return {
			...state, 
			isRefreshing: true,
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