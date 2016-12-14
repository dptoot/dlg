import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {mapDispatchToProps} from '../../engine';
import { requestNotificationPermission } from '../notifications';
import socket from '../websocket';

class AppWrapper extends Component {

	constructor(props) {
		super();
	}

	componentDidMount() {

		requestNotificationPermission();
		
	}

	componentWillReceiveProps(nextProps) {
		
		
	}


	render() {
		return this.props.children;
	}
	
}		

function mapStateToProps(state) {
	return {
		// user: state.user,
		// websocket: state.websocket,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
