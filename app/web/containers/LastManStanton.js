import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import { requestNotificationPermission } from '../notifications';
import classnames from 'classnames';

import Icon from 'react-fontawesome';
import {CenteredWrapper} from '../elements';
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
		this.props.fetchMatches();
		
		// This seems to break matches normalization
		// this.props.setLastUserLogin();

		// Show the matches drawer if we are in mobile mode
		if (this.props.browser.is.extraSmall) {
			this.props.showMatches();
		}

		// Poll for Match updates
		window.setInterval(this.props.fetchMatches, 20000);
	}

	shouldComponentUpdate(nextProps, nextState) {
	 	return this.props.isInitialState && !nextProps.isInitialState;
	}

	renderLoading() {
		return (
			<CenteredWrapper>
				<div>Loading</div>
				<Icon name="spinner" className="fa-spin margin-vertical-sm" />
			</CenteredWrapper>
		);
	}

	renderGameBoard() {
		const isMobile = this.props.browser.is.extraSmall;

		const containerClasses = classnames({
			'mobile': isMobile,
		})

		return (
				
				<div id="outer-container" className={containerClasses}>
					<UserDrawer />
					<MatchesDrawer rendered={isMobile} />
					<MatchChatDrawer rendered={isMobile} />
					<CreateMatchDrawer />	
					<SearchDrawer />
						
					
					<div id="page-wrap">
						<Header />
						
						
						<div className="app-wrapper">
							<MatchesColumn rendered={!isMobile} />	
							<Match />
							{/*<MatchChatColumn rendered={!isMobile}/>*/}
						</div>
					</div>
				</div>
			
		);
	}

	render() {
		return this.props.isInitialState ? this.renderLoading() : this.renderGameBoard();
	}

}

function mapStateToProps(state) {
	return {
		browser: state.browser,
		isInitialState: state.matches.isInitialState,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LastManStanton);
