import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, storage} from '../../engine';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {ActionCreators} from '../../engine/actions';
import { Provider } from 'react-redux';
import PublicWrapper from './PublicWrapper';
import AuthWrapper from './AuthWrapper';
import Login from './Login';
import Register from './Register';
import LastManStanton from './LastManStanton';
import CreateMatch from './CreateMatch';
import Search from './Search';

/*
<Router history={browserHistory}>
					
	<Route 
		path='/' 
		component={PublicWrapper} 
		onEnter={this.handleAutoLogin}
		>
		<IndexRoute component={Login} />
		<Route path="/register" component={Register} />
	</Route>

	<Route 
		path="lastmanstanton" 
		component={AuthWrapper} 
		onEnter={this.handleAutoLogin}
		>
		<IndexRoute component={LastManStanton} />
	</Route>

</Router>
*/

class App extends Component {

	constructor(props) {
		super(props);
		
		this.requireAuth = this.requireAuth.bind(this);
		this.handleAutoLogin = this.handleAutoLogin.bind(this);	

		this.routes = (
			<div>
				<Route 
					path='/' 
					component={PublicWrapper}
					onEnter={this.handleAutoLogin} 
					>
					<IndexRoute component={Login} />
					<Route path="/register" component={Register} />
				</Route>
				<Route 
					path="lastmanstanton" 
					component={AuthWrapper}
					onEnter={this.requireAuth} 
					>
					<IndexRoute component={LastManStanton} />
				</Route>
			</div>
		);
	}

	requireAuth() {
		const {getState} = this.props.store;
		const state = getState();

		if (!state.user.isAuthenticated) {
			browserHistory.push('/');
		}
	}
	
	handleAutoLogin(nextState, replace, callback) {
		
		const {getState, dispatch} = this.props.store;
		const state = getState();
				
		// Try and auto login
		storage.load({
		    key: 'loginState',
		    autoSync: false,
		})

		// If there is a user then log them in and load page
		.then(user => {
		    dispatch(ActionCreators.loginUser(user));
		    callback();
		})

		// if not then just load the page
		.catch(err => {
		   	callback()
		})
	}
	
	render() {
		return (
			<Router history={browserHistory}>
				{this.routes}
			</Router>	
		);
	}

}

export default App;
