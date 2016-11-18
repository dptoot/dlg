import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	isAuthenticated: false,
	id: null,
	name: null,
	password: null,
	token: null
};

export const user = createReducer(initialState, {

	[types.CLEAR_USER](state, action) {
		return initialState;
	}, 

	[types.UPDATE_USER](state, action) {
		return {
			...state, 
			isAuthenticated: true,
			token: action.payload.token,
			name: action.payload.name,
			id: action.payload.id,
			password: null,
		};
	},
	
	[types.UPDATE_USER_LOGIN](state, action) {
		return {
			...state, 
			name: action.payload.name,
			password: action.payload.password,
		}
	}
})