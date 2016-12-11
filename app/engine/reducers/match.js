import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isInitialState: true,
	isRefreshing: false,
	isFetching: true,
	showMatchAlert: false,
	showQuitMatchAlert: false,
	matchAlert: {
		title: '',
		message: '',
	},
	lastAnswer: null,
	chat: {
		showMatchChat: false,
		value: '',
		history: [],
	},
};

export const match = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 
	
	[types.UPDATE_MATCH](state, action) {
		return {
			...state, 
			isInitialState: false,
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
			matchAlert: initialState.matchAlert,
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

	[types.UPDATE_MATCH_CHAT_HISTORY](state, action) {

		return {
			...state, 
			chat: {
				...state.chat,
				history: action.payload.history,
			},
		};
	},

	[types.UPDATE_MATCH_CHAT_INPUT_VALUE](state, action) {

		return {
			...state, 
			chat: {
				...state.chat,
				value: action.payload.value,
			},
		};
	},

	[types.CLEAR_MATCH_CHAT_INPUT_VALUE](state, action) {
		return {
			...state, 
			chat: {
				...state.chat,
				value: initialState.chat.value,
			},
		};
	},

	[types.TOGGLE_MATCH_CHAT](state, action) {
		return {
			...state, 
			chat: {
				...state.chat,
				showMatchChat: !state.chat.showMatchChat,
			},
		};
	},



})