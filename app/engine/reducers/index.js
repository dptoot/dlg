import {combineReducers} from 'redux';
import {responsiveStateReducer} from 'redux-responsive'
import * as userReducer from './user';
import * as matchesReducer from './matches';
import * as matchReducer from './match';
import * as searchReducer from './search';
import * as layoutReducer from './layout';

export default combineReducers(Object.assign({
	browser: responsiveStateReducer,
}, 
	userReducer,
	matchesReducer,
	matchReducer,
	searchReducer,
	layoutReducer,
));

