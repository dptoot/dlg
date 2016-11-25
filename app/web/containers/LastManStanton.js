import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import Match from './Match';
import Matches from './Matches';
import Header from './Header';

class LastManStanton extends Component {

	constructor() {
		super();

	}

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
		
		return(
			<div>

				<Header />

				<div className="wrapper">
					
					
					<div className="sidebar">
						<Matches />	
					</div>

					<div className="main">
						<Match />
					</div>
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
