import * as types from './types';

// CHAT
export function showMatchChat() {
	return {
		type: types.SHOW_MATCH_CHAT,
		payload: {},
	}
}

export function hideMatchChat() {
	return {
		type: types.HIDE_MATCH_CHAT,
		payload: {},
	}
}

// MATCHES
export function showMatches() {
	return {
		type: types.SHOW_MATCHES,
		payload: {},
	}
}

export function hideMatches() {
	return {
		type: types.HIDE_MATCHES,
		payload: {},
	}
}

// USER DRAWER
export function showUserDrawer() {
	return {
		type: types.SHOW_USER_DRAWER,
		payload: {},
	}
}

export function hideUserDrawer() {
	return {
		type: types.HIDE_USER_DRAWER,
		payload: {},
	}
}

