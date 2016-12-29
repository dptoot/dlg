import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../engine/store';
import AppRouter from './AppRouter';

class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<AppRouter store={ store }/>
			</Provider>
		);
	}

}

export default App;
