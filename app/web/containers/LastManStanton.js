import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import socket from '../websocket';

import classnames from 'classnames';

import Match from '../containers/Match';
import MatchesColumn from '../containers/MatchesColumn';
import MatchesDrawer from '../containers/MatchesDrawer';

import MatchChatColumn from '../containers/MatchChatColumn';
import MatchChatDrawer from '../containers/MatchChatDrawer';
import Header from '../containers/Header';
import UserSidebar from '../containers/UserSidebar';

class LastManStanton extends Component {

	render() {

		const containerClasses = classnames({
			'mobile': this.props.browser.lessThan.small,
		})

		return this.props.user.isAuthenticated && this.props.websocket && (
				
				<div id="outer-container" className={containerClasses}>
					{this.props.initializeMatchWebsocketListeners()}
					<Header />
					<UserSidebar />
					
					<MatchesDrawer rendered={this.props.browser.lessThan.small} />
					<MatchChatDrawer rendered={this.props.browser.lessThan.small} />
						
					
					<div id="page-wrap">
						
						<div className="app-wrapper">
							<MatchesColumn rendered={this.props.browser.greaterThan.extraSmall  } />	
							<Match />
							<MatchChatColumn rendered={this.props.browser.greaterThan.extraSmall}/>
						</div>
					</div>
				</div>
			
		);
	}

}

function mapStateToProps(state) {
	return {
		browser: state.browser,
		user: state.user,
		websocket: state.websocket,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LastManStanton);
