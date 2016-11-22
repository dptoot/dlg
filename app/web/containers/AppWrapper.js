import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';

class AppWrapper extends Component {

	componentWillReceiveProps(nextProps) {
		
		// User Login
		if (!this.props.user.isAuthenticated && nextProps.user.isAuthenticated) {
			browserHistory.push('/lastmanstanton');
		}

		// User Logout
		if (this.props.user.isAuthenticated && !nextProps.user.isAuthenticated) {
			browserHistory.push('/login')
		}
	}


	render() {
		return this.props.children;
	}
	
}		

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
