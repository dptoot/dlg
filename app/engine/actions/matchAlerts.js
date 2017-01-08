import * as types from './types';

export function hideMatchAlert() {
	return {
		type: types.HIDE_MATCH_ALERT, 
		payload: {},
	}
}

export function showMatchAlert({title, message}) {
	return {
		type: types.SHOW_MATCH_ALERT, 
		payload: {
			title: title,
			message: message,
		},
	}
}

export function showQuitMatchAlert() {
	return {
		type: types.SHOW_QUIT_MATCH_ALERT, 
		payload: {},
	}
}

export function showPendingMatchAlert() {
	return {
		type: types.SHOW_PENDING_MATCH_ALERT, 
		payload: {},
	}
}

