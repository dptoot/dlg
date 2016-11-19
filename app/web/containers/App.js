import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';

class App extends Component {

	render() {

		console.log(this.props)

		return(
			<div>
				App!
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
