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
		lastActivity: null,
		newMessageCount: 0,
	},
};

export const match = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 
	
	[types.UPDATE_MATCH](state, action) {
		const {chat, ...rest} = action.payload.match;
		return {
			...state, 
			isInitialState: false,
			chat: Object.assign(state.chat, chat),
			...rest,
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

	[types.UPDATE_MATCH_CHAT_LAST_ACTIVITY](state, action) {
		return {
			...state, 
			chat: {
				...state.chat,
				lastActivity: Date.now(),
				newMessageCount: initialState.chat.newMessageCount,
			},
		};
	},



})