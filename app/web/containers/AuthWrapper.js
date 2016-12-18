import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import { requestNotificationPermission } from '../notifications';
import {connectSocket, getSocket} from '../websocket';

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
				console.log(socket)
				this.props.updateWebsocket(socket);  
			})
		}
	}

	componentWillReceiveProps(nextProps) {

		if (!nextProps.user.isAuthenticated) {
			browserHistory.push('/');
		}

	}

	render() {
		return this.props.websocket ? this.props.children : (<h1>LOADING</h1>)
	}
	
}		

function mapStateToProps(state) {
	return {
		user: state.user,
		websocket: state.websocket,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
