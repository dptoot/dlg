import {combineReducers} from 'redux';
import {responsiveStateReducer} from 'redux-responsive'
import * as userReducer from './user';
import * as matchesReducer from './matches';
import * as matchChatReducer from './matchChat';
import * as matchReducer from './match';
import * as matchAlertsReducer from './matchAlerts';
import * as searchReducer from './search';
import * as layoutReducer from './layout';

export default combineReducers(Object.assign({
	browser: responsiveStateReducer,
}, 
	layoutReducer,
	matchReducer,
	matchAlertsReducer,
	matchChatReducer,
	matchesReducer,
	searchReducer,
	userReducer,
));

