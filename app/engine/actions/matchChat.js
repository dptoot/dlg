import * as types from './types';
import Api from '../api';

export function clearMatchChatInputValue() {
	return {
		type: types.CLEAR_MATCH_CHAT_INPUT_VALUE, 
		payload: {},
	}
}