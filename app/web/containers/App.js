import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, storage} from '../../engine';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppWrapper from './AppWrapper';
import Login from './Login';
import Register from './Register';
import LastManStanton from './LastManStanton';
import CreateMatch from './CreateMatch';
import Search from './Search';
import socket from '../websocket';


class App extends Component {

	constructor(props) {
		super(props);
		
		this.requireAuth = this.requireAuth.bind(this);
		this.handleAutoLogin = this.handleAutoLogin.bind(this);

		socket.on('connect', () => {
			props.updateWebsocket(socket);  
		})
	}

	componentWillReceiveProps(nextProps) {

		// User Login
		if (!this.props.user.isAuthenticated && nextProps.user.isAuthenticated) {
			browserHistory.push('/lastmanstanton');
		}

		// User Logout
		if (this.props.user.isAuthenticated && !nextProps.user.isAuthenticated) {
			browserHistory.push('/login');
		}

		if (nextProps.user.id && nextProps.websockets) {
			nextProps.fetchMatches();
		}
		

		// Wait until sockets are available to bind to them.
		if (!this.props.websocket && nextProps.websocket) {


			nextProps.fetchMatches();
			

			// UPDATE MATCHES
			nextProps.websocket.on('updateMatches', data => {
				if(data.userId === this.props.user.id) {
					nextProps.updateMatches(data.matches);
				}
			});

			// UPDATE MATCH
			nextProps.websocket.on('updateMatch', data => {

				const player1Id = data.match.player_1.user._id;
				const player2Id = data.match.player_2.user._id;

				if([player1Id, player2Id].includes(this.props.user.id)) {
					nextProps.updateMatch(data.match);
				}
			});

			// UPDATE SEARCH
			nextProps.websocket.on('updateSearch', data => {
				if(data.userId === this.props.user.id) {
					nextProps.updateSearch(data);
				}
			});

			// UPDATE SEARCH
			nextProps.websocket.on('updateUser', data => {
				this.props.loginUser(data);
			});

		}
	}

	
	handleAutoLogin(nextState, replace, callback) {
		const publicPaths = ['/login', '/register'];
		// Ignore all this if we are already on a white list page
		if (publicPaths.includes(nextState.location.pathname)) {
			callback();
		} 

		if (!this.props.user.isAuthenticated) {
			storage.load({
			    key: 'loginState',
			    autoSync: false,
			}).then(user => {
			    this.props.loginUser(user);
			    callback();
			}).catch(err => {
			    switch (err.name) {
			        case 'NotFoundError':
						replace({
						  pathname: '/login',
						  state: { nextPathname: nextState.location.pathname }
						});
						callback();
						break;
			        case 'ExpiredError':
			            replace({
						  pathname: '/login',
						  state: { nextPathname: nextState.location.pathname }
						})
						callback();
			            break;
			    }
			})
		} else {
			callback();
		}

	}

	requireAuth(nextState, replace) {
		// if (!this.props.user.isAuthenticated) {
		// 	replace({
		// 	  pathname: '/login',
		// 	  state: { nextPathname: nextState.location.pathname }
		// 	})
		// }
	}

	
	render() {
		return(
			<Router history={browserHistory} >
				<Route path='/' component={AppWrapper} onEnter={this.handleAutoLogin}>
					
					<Route path="login" component={Login} />
					<Route path="register" component={Register} />

					<Route path="lastmanstanton" component={LastManStanton} onEnter={this.requireAuth} />
					
					<Route path="create-match" component={CreateMatch} onEnter={this.requireAuth}/>

				</Route>
			</Router>
		);
	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
		websocket: state.websocket,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
