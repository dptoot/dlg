import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps, storage } from '../../engine';
import { Actions, ActionConst } from 'react-native-router-flux';

import {
	View,
	Text,
	Image,
	ListView,
	ScrollView,
	StyleSheet,
} from 'react-native';
import theme from '../styles/theme';

import {
	Container, 
	ListItem, 
	RemoteImage,
	TextInput,
	MovieListItem,
} from '../components';

class Launch extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.getStoredUser()
	}

	componentWillReceiveProps(nextProps) {
		
  	}

  	getStoredUser() {
  		storage.load({
		    key: 'loginState',
		    autoSync: false,
		}).then(user => {
		    this.props.loginUser(user);
		}).catch(err => {
		    // any exception including data not found 
		    // goes to catch()
		    switch (err.name) {
		        case 'NotFoundError':
		            Actions.login({type: ActionConst.REPLACE});
		            break;
		        case 'ExpiredError':
		            // TODO
		            break;
		    }
		})
  	}

	render() {
		return (
			
			<Container
					alignItems="stretch"
					>
				<Image
					style={styles.canvas} 
					source={require('../../images/dlg-logo.jpg')} 
					/>
			</Container>
		
			
		)
	}
}

var styles = StyleSheet.create({
	canvas: {
	    flex:1,
	    width: null,
	    height: null,
	    resizeMode: 'contain'
	  },
});


function mapStateToProps(state) {
	return {
		user: state.user,
		search: state.search,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Launch);