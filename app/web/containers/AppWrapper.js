import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import { requestNotificationPermission } from '../notifications';

class AppWrapper extends Component {

	handleWebsockets() {
		
	}


	render() {
		return this.props.websocket && (
			<div>
				{this.props.initializeUserWebsocketListeners()}
				{this.props.children}
			</div>

		)
	}
	
}		

function mapStateToProps(state) {
	return {
		user: state.user,
		websocket: state.websocket,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
