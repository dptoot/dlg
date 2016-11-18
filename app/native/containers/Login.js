import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import tcomb from 'tcomb-form-native';

import { Actions, ActionConst } from 'react-native-router-flux';

import {
	View,
	Image,
	StyleSheet,
} from 'react-native';

import {
	Container,
	Button,
} from '../components/';

import theme from '../styles/theme';

const Form = tcomb.form.Form;

const UserLogin = tcomb.struct({
  name: tcomb.String, 
  password: tcomb.Str, 
});

const options = {
	auto: 'placeholders',
    fields: {
    	name: {
    		autoCapitalize: 'none',
      		autoCorrect: false
    	},
        password: {
            password: true,
            secureTextEntry: true,
        }
    }
}


class Login extends Component {

	constructor(props) {
		super()
		this.handleLogin = this.handleLogin.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		
	}

	handleInputChange(model) {
		this.props.updateUserLogin(model);
	}

	handleLogin() {
		this.props.authenticateUser();
	}

	render() {
		return (
			<Container 
				style={styles.container}
				padding="sm"
				justifyContent="center"
				alignItems="stretch"
				>

        		<Container alignItems="stretch">
					<Image
						style={styles.canvas} 
						source={require('../../images/dlg-logo.jpg')} />
				</Container>	
				<Container alignItems="stretch">
					<Container justifyContent="center" alignItems="stretch">
		                <Form 
		                    type={UserLogin} 
		                    value={this.props.user}
		                    options={options}
		                    onChange={this.handleInputChange}
		                />
		                <Container expand={false} alignItems="stretch">
		                    <Button 
		                        onPress={this.handleLogin}
		                        text="Login"
		                        />
	                        <Button 
								text="First time here?  Sign up for an account." 
								onPress={Actions.signup}
								type="link"
								/>
		                </Container>
		            </Container>
				</Container>
				
                
			</Container>
		)
	}
}

var styles = StyleSheet.create({
  container: {
	
  },
  canvas: {
    flex:1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
});

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);