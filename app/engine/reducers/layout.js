import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	showMatchesDrawer: false,
	showChatDrawer: false,
	showUserDrawer: false,
};

export const layout = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 

	[types.SHOW_USER_DRAWER](state, action) {
		return {
			...state, 
			showUserDrawer: true,
		};
	},
	[types.HIDE_USER_DRAWER](state, action) {
		return {
			...state, 
			showUserDrawer: false,
		};
	},
	
	
})