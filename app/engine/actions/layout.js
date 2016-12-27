import * as types from './types';

// CHAT
export function lockBodyScroll() {
	return (dispatch, getState) => {
		// Ensure we don't break React Native
		if (document.body) {

			// Disable scrolling web
			document.body.classList.add('unscrollable');

			// Disable scrolling IOS.
			// document.ontouchmove = function (event) {
			//   event.preventDefault();
			// }

		}
	}
}

export function unlockBodyScroll() {
	return (dispatch, getState) => {
		// Ensure we don't break React Native
		if (document.body) {

			// Disable scrolling web
			document.body.classList.remove('unscrollable');

			// Enable scrolling IOS.
			// document.ontouchmove = function (e) {
			//   return true;
			// }
		}
	}
}

// CHAT
export function showCreateMatch() {
	return {
		type: types.SHOW_CREATE_MATCH,
		payload: {},
	}
}

export function hideCreateMatch() {
	return {
		type: types.HIDE_CREATE_MATCH,
		payload: {},
	}
}

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
