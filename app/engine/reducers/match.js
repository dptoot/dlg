import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/types';

const initialState = {
	selectedMatchId: null,
};

export const match = createReducer(initialState, {

	[types.APP_RESET](state, action) {
		return initialState;
	}, 

	[types.SELECT_MATCH](state, action) {
		return {
			...state, 
			selectedMatchId: action.payload.matchId,
		};
	},

})