import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';

class AuthWrapper extends Component {

	componentWillReceiveProps(nextProps) {

		// Allow users to logout
		if (!nextProps.user.isAuthenticated) {
			browserHistory.push('/');
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
