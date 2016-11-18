import * as types from './types';
import Api from '../api';

export function addRecipe() {
	return {
		type: types.ADD_RECIPE,
	}
}

export function fetchRecipes(ingredients) {
	return (dispatch, getState) => {
		console.log(getState())
	}
}