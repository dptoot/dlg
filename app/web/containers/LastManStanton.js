import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import Match from './Match';
import Matches from './Matches';
import Header from './Header';
import UserSidebar from './UserSidebar';
import Sidebar from 'react-sidebar';

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
	

	getMatchesSidebarStyles() {
		return {
			root: {
			    boxShadow: 'none',
			},
			sidebar: {
				width: this.props.browser.greaterThan.small ? '20%' : '90%',
				marginTop: '100px',
			},
			content: {
				// top: '88px',
				boxShadow: 'none',
			},
			overlay: {
				// top: '88px',
				boxShadow: 'none',
			},
			dragHandle: {
				// top: '88px',
				boxShadow: 'none',
			},
		}
	}

	render() {

		return(
				
				<div>
					<Header />

					<div className="wrapper">
						<UserSidebar>
							
							<Sidebar
								sidebar={<Matches />}
								docked={this.props.browser.greaterThan.small}
								open={this.props.matches.showMatchesSidebar}
								onSetOpen={this.props.toggleMatchesSidebar}		
								styles={this.getMatchesSidebarStyles()}
								>
								
								<Match />

							</Sidebar>

						</UserSidebar>
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
