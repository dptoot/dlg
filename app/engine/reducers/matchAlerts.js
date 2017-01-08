import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	renderMatchAlert: false,
	renderQuitMatchAlert: false,
	renderPendingMatchAlert: false,
	title: '',
	message: '',
};

export const matchAlerts = createReducer(initialState, {

	[types.APP_RESET](state, action) {
		return initialState;
	}, 

	[types.SHOW_MATCH_ALERT](state, action) {
		return {
			...state, 
			renderMatchAlert: true,
			title: action.payload.title,
			message: action.payload.message,
		};
	},

	[types.SHOW_QUIT_MATCH_ALERT](state, action) {
		return {
			...state, 
			renderQuitMatchAlert: true,
		};
	},

	[types.SHOW_PENDING_MATCH_ALERT](state, action) {
		return {
			...state, 
			renderPendingMatchAlert: true,
		};
	},

	[types.HIDE_MATCH_ALERT](state, action) {
		return initialState;
	},

});
