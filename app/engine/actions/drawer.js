import * as types from './types';

export function openDrawer(token) {
	return {
		type: types.OPEN_DRAWER,
		payload: {},
	}
}

export function closeDrawer() {
	return {
		type: types.CLOSE_DRAWER,
		payload: {},
	}
}

