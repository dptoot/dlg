import * as UserActions from './user';
import * as LayoutActions from './layout';
import * as MatchesActions from './matches';
import * as MatchActions from './match';
import * as SearchActions from './search';
import * as WebsocketActions from './websocket';

export const ActionCreators = Object.assign({}, 
 	UserActions,
	LayoutActions,
	MatchesActions,
	MatchActions,
	SearchActions,
	WebsocketActions,
);