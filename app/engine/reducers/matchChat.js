import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	showMatchChat: false,
	value: '',
	history: [],
	lastActivity: null,
	newMessageCount: 0,
};

export const matchChat = createReducer(initialState, {

	[types.APP_RESET](state, action) {
		return initialState;
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