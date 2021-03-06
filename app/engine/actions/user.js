import * as types from './types';
import Api from '../api';
import storage from '../storage';

export function loginUser(user) {

	const userObject = {
		id: user.id,
		token: user.token,
		name: user.name,
	};

	return (dispatch, getState) => {

		return storage.save({
		    key: 'loginState',
		    rawData: userObject,
		    expires: null,
		})

		.then(() => {
			dispatch(updateUser(userObject))
		})
	}

	
}

export function logoutUser() {

	return (dispatch, getState) => {

		return storage.remove({
		    key: 'loginState',
		})

		.then(() => {
			dispatch(appReset())
		})
	}
}

export function updateUser(user) {
	return {
		type: types.UPDATE_USER,
		payload: user,
	}
}

export function appReset() {
	return {
		type: types.APP_RESET,
		payload: {},
	}
}

export function updateUserLogin(data) {
	return {
		type: types.UPDATE_USER_LOGIN,
		payload: data,
	}
}

export function authenticatingUser(data) {
	return {
		type: types.AUTHENTICATING_USER,
		payload: {},
	}
}

export function authenticateUser() {
	return (dispatch, getState) => {

		// Signal that we are authenticating
		dispatch(authenticatingUser());

		const state = getState();
		
		Api.post('/accounts/authenticate', {
			name: state.user.name,
			password: state.user.password,
		})
		.then(response => {
			if (response.success) {
				dispatch(loginUser(response))
			} else {
				// handle bad login
			}
		});
	}
}

export function createUser(user) {
	return (dispatch, getState) => {

		// Signal that we are authenticating
		//dispatch(creatinguser());

		const state = getState();
		
		Api.post('/accounts/create/', {
			name: user.username,
			password: user.password,
		}).then(response => {
			if (response.success) {
				dispatch(loginUser(response))
			} else {
				// handle bad login
			}
		})
	}
}

export function setLastUserLogin() {
	return (dispatch, getState) => {
		const state = getState();

		state.websocket.emit('setLastUserLogin', {
			userId: state.user.id,
		})
	}
}
