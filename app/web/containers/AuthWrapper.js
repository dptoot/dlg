import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import { requestNotificationPermission } from '../notifications';
import {connectSocket, getSocket} from '../websocket';
import {CenteredWrapper} from '../elements';
import Icon from 'react-fontawesome';

class AuthWrapper extends Component {

	componentWillMount() {
		if (!this.props.user.isAuthenticated) {
			browserHistory.push('/');
		}
	}

	componentDidMount() {
		if (!this.props.websocket) {
			connectSocket()
			.then(socket => {
				this.props.updateWebsocket(socket);  
			})
		}
	}

	componentWillReceiveProps(nextProps) {

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
		return this.props.websocket ? this.props.children : this.renderLoading();
	}
	
}		

function mapStateToProps(state) {
	return {
		user: state.user,
		websocket: state.websocket,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
