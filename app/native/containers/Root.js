import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {store} from '../../engine';
import AppRouter from './AppRouter';


export default class Root extends React.Component {

	render() {
		return(
			<Provider store={store}>
		    	<AppRouter />
		    </Provider>
		);
	}

}
