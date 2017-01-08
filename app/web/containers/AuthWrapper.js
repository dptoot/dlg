import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import { requestNotificationPermission } from '../notifications';
import {CenteredWrapper} from '../elements';
import Icon from 'react-fontawesome';

class AuthWrapper extends Component {

	componentDidMount() {
		
	}

	componentWillReceiveProps(nextProps) {

		// Allow users to logout
		if (!nextProps.user.isAuthenticated) {
			browserHistory.push('/');
		}

	}

	renderLoading() {
		return (
			<CenteredWrapper>
				<div>Connecting</div>
				<Icon name="spinner" className="fa-spin margin-vertical-sm" />
			</CenteredWrapper>
		);
	}

	render() {
		// return this.props.websocket ? this.props.children : this.renderLoading();
		return this.props.children;
	}
	
}		

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
