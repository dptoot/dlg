import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	open: false
};

export const drawer = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 
	
	[types.OPEN_DRAWER](state, action) {
		return {
			...state, 
			open: true,
		};
	},
	[types.CLOSE_DRAWER](state, action) {
		return {
			...state, 
			open: false,
		};
	},
})