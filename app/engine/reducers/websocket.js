import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

export const websocket = createReducer(null, {

	[types.UPDATE_WEBSOCKET](state, action) {
		return action.payload.websocket;
	}, 
})