import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';

import classnames from 'classnames';

import Match from '../containers/Match';
import MatchesColumn from '../containers/MatchesColumn';
import MatchesDrawer from '../containers/MatchesDrawer';

import MatchChatColumn from '../containers/MatchChatColumn';
import MatchChatDrawer from '../containers/MatchChatDrawer';
import Header from '../containers/Header';
import UserSidebar from '../containers/UserSidebar';

class LastManStanton extends Component {

	componentDidMount() {
		this.props.fetchMatches();
		this.props.initializeWebsocketListeners();
	}

	render() {

		const containerClasses = classnames({
			'mobile': this.props.browser.lessThan.small,
		})

		return (
				
				<div id="outer-container" className={containerClasses}>
					
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LastManStanton);
