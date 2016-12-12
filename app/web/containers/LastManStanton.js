import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';

import classnames from 'classnames';

import Match from './Match';
import Matches from './Matches';
import MatchChat from './MatchChat';
import Header from './Header';
import UserSidebar from './UserSidebar';

class LastManStanton extends Component {

	componentDidMount() {

		// Get Initial dataset
		if (this.props.user.isAuthenticated) {
			this.props.fetchMatchesList(this.props.user.id);
		}

	}

	componentWillReceiveProps(nextProps) { 
		if (!this.props.user.isAuthenticated && nextProps.user.isAuthenticated) {
			this.props.fetchMatchesList(nextProps.user.id);
		}
	}

	render() {

		const containerClasses = classnames({
			'mobile': this.props.browser.lessThan.medium,
		})

		return(
				
				<div id="outer-container" className={containerClasses}>
				<Header />
					<UserSidebar />
						
					
					<div id="page-wrap">
						
						<div className="app-wrapper">
							<Matches />	
							<Match />
							<MatchChat />
						</div>
					</div>
				</div>
			
		);
	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
		browser: state.browser,
		matches: state.matches,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LastManStanton);
