import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';

import classnames from 'classnames';

import Match from '../containers/Match';
import MatchesColumn from '../containers/MatchesColumn';
import MatchesDrawer from '../containers/MatchesDrawer';

import CreateMatchDrawer from '../containers/CreateMatchDrawer';
import MatchChatColumn from '../containers/MatchChatColumn';
import MatchChatDrawer from '../containers/MatchChatDrawer';
import Header from '../containers/Header';
import UserDrawer from '../containers/UserDrawer';
import SearchDrawer from '../containers/SearchDrawer';

class LastManStanton extends Component {

	componentDidMount() {
		this.props.initializeWebsocketListeners();
		this.props.fetchMatches();
		
		// This seems to break matches normalization
		// this.props.setLastUserLogin();

		// Show the matches drawer if we are in mobile mode
		if (this.props.browser.is.extraSmall) {
			this.props.showMatches();
		}
	}

	render() {
		const isMobile = this.props.browser.is.extraSmall;

		const containerClasses = classnames({
			'mobile': isMobile,
		})

		return (
				
				<div id="outer-container" className={containerClasses}>
					
					<Header />
					<UserDrawer />
					<MatchesDrawer rendered={isMobile} />
					<MatchChatDrawer rendered={isMobile} />
					<CreateMatchDrawer />	
					<SearchDrawer />	
					
					<div id="page-wrap">
						
						<div className="app-wrapper">
							<MatchesColumn rendered={!isMobile} />	
							<Match />
							<MatchChatColumn rendered={!isMobile}/>
						</div>
					</div>
				</div>
			
		);
	}

}

function mapStateToProps(state) {
	return {
		browser: state.browser,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LastManStanton);
