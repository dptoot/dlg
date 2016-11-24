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

class App extends Component {

	constructor(props) {
		super(props);
		
		this.requireAuth = this.requireAuth.bind(this);
		this.handleAutoLogin = this.handleAutoLogin.bind(this);
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
