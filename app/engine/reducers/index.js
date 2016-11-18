import {combineReducers} from 'redux';
import * as userReducer from './user';
import * as drawerReducer from './drawer';
import * as matchesReducer from './matches';
import * as matchReducer from './match';
import * as searchReducer from './search';

export default combineReducers(Object.assign({}, 
	userReducer,
	drawerReducer,
	matchesReducer,
	matchReducer,
	searchReducer,
));

