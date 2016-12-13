import * as types from './types';

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

