import * as UserActions from './user';
import * as DrawerActions from './drawer';
import * as MatchesActions from './matches';
import * as MatchActions from './match';
import * as SearchActions from './search';

export const ActionCreators = Object.assign({}, 
 	UserActions,
	DrawerActions,
	MatchesActions,
	MatchActions,
	SearchActions,
);