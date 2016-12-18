import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import { requestNotificationPermission } from '../notifications';

class PublicWrapper extends Component {

	componentWillMount() {
		// Login User if already authenticated
		if (this.props.user.isAuthenticated) {
			browserHistory.push('/lastmanstanton');
		}
	}

	componentWillReceiveProps(nextProps) {
		// User Login
		if (!this.props.user.isAuthenticated && nextProps.user.isAuthenticated) {
			browserHistory.push('/lastmanstanton');
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicWrapper);
