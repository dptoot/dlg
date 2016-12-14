import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	showMatches: false,
	showMatchChat: false,
	showUserDrawer: false,
};

export const layout = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 

	// CHAT DRAWER
	[types.SHOW_MATCH_CHAT](state, action) {
		return {
			...state, 
			showMatchChat: true,
		};
	},

	[types.HIDE_MATCH_CHAT](state, action) {
		return {
			...state, 
			showMatchChat: false,
		};
	},
	
	// MATCHES DRAWER
	[types.SHOW_MATCHES](state, action) {
		return {
			...state, 
			showMatches: true,
		};
	},
	
	[types.HIDE_MATCHES](state, action) {
		return {
			...state, 
			showMatches: false,
		};
	},

	// USER DRAWER
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