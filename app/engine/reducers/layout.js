import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	showCreateMatch: false,
	showMatches: false,
	showMatchChat: false,
	showUserDrawer: false,
};

export const layout = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 

	// CREATE MATCH
	[types.SHOW_CREATE_MATCH](state, action) {
		return {
			...state, 
			showCreateMatch: true,
		};
	},

	[types.HIDE_CREATE_MATCH](state, action) {
		return {
			...state, 
			showCreateMatch: false,
		};
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