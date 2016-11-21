import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, storage} from '../../engine';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppWrapper from './AppWrapper';
import Login from './Login';
import LastManStanton from './LastManStanton';
import Search from './Search';

class App extends Component {

	constructor(props) {
		super(props);
		this.autoLogin = this.autoLogin.bind(this);
		this.requireAuth = this.requireAuth.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.isAuthenticated) {
			browserHistory.push('/lastManStanton')
		}
	}

	autoLogin(nextState, replace) {
		if(!this.props.user.isAuthenticated) {
			storage.load({
			    key: 'loginState',
			    autoSync: false,
			}).then(user => {
			    this.props.loginUser(user);
			}).catch(err => {
			    switch (err.name) {
			        case 'NotFoundError':
						if (!this.props.user.isAuthenticated) {
							replace({
							  pathname: '/login',
							  state: { nextPathname: nextState.location.pathname }
							})
						}
			            break;
			        case 'ExpiredError':
			            // TODO
			            break;
			    }
			})
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
				<Route path="/" component={AppWrapper} onEnter={this.autoLogin}>
					<Route path="login" component={Login} />
					<Route path="lastManStanton" component={LastManStanton} onEnter={this.requireAuth} />
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
