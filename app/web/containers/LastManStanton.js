import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';

import Match from './Match';
import Matches from './Matches';

class LastManStanton extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
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

				<header>

				</header>

				<div className="wrapper">
					
					
					<div className="sidebar">
						<div className="scroll-panel">
							<Matches />	
						</div>
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
