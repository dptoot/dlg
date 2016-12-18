import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, storage} from '../../engine';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import PublicWrapper from './PublicWrapper';
import AuthWrapper from './AuthWrapper';
import Login from './Login';
import Register from './Register';
import LastManStanton from './LastManStanton';
import CreateMatch from './CreateMatch';
import Search from './Search';



class App extends Component {

	constructor(props) {
		super(props);
		
		this.handleAutoLogin = this.handleAutoLogin.bind(this);	
	}
	
	handleAutoLogin(nextState, replace, callback) {
		
		// Ignore if we are logged in
		if (this.props.user.isAuthenticated) {
			return callback();
		}

		// Try and auto login
		storage.load({
		    key: 'loginState',
		    autoSync: false,
		})

		// If there is a user then log them in and load page
		.then(user => {
		    this.props.loginUser(user);
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
				
				<Route path='/' component={PublicWrapper} onEnter={this.handleAutoLogin}>
					<IndexRoute component={Login} />
					<Route path="register" component={Register} />
				</Route>

				<Route path="lastmanstanton" component={AuthWrapper} onEnter={this.handleAutoLogin}>
					<IndexRoute component={LastManStanton} />
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
