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

	constructor() {
		super();

		this.state = {
			mediaQuery: null,
			matchesSidebarOpen: false,
			matchesSidebarDocked: true,
		}

		this.handleCloseMatchesSidebar = this.handleCloseMatchesSidebar.bind(this);
		this.handleOpenMatchesSidebar = this.handleOpenMatchesSidebar.bind(this);
		this.handleMediaQueryChanged = this.handleMediaQueryChanged.bind(this);

	}

	
	componentWillMount() {
		
	}
	

	componentDidMount() {

		// Get Initial dataset
		if (this.props.user.isAuthenticated) {
			this.props.fetchMatchesList(this.props.user.id);
		}

		var mediaQuery = window.matchMedia(`(min-width: 800px)`);
			console.log(mediaQuery)
		    mediaQuery.addListener(this.handleMediaQueryChanged);
		    this.setState({
		    	mediaQuery: mediaQuery, 
		    	matchesSidebarDocked: mediaQuery.matches
		    });

	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.user.isAuthenticated && nextProps.user.isAuthenticated) {
			this.props.fetchMatchesList(nextProps.user.id);
		}
	}

	componentWillUnmount() {
		this.state.mediaQuery.removeListener(this.handleMediaQueryChanged);
	}

	getMatchesSidebarStyles() {
		return {
			root: {
			    boxShadow: 'none',
			},
			sidebar: {
				// background: 'transparent',
				width: '20%',
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

	handleMediaQueryChanged() {
		this.setState({matchesSidebarDocked: this.state.mediaQuery.matches});
	}

	handleOpenMatchesSidebar() {
		this.setState({
			matchesSidebarOpen: true,
		})
	}

	handleCloseMatchesSidebar() {
		if (!this.state.matchesSidebarDocked) {
			this.setState({
				matchesSidebarOpen: false,
			})
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
							docked={this.state.matchesSidebarDocked}
							open={this.state.matchesSidebarOpen}
							onSetOpen={this.handleCloseMatchesSidebar}		
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
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LastManStanton);
