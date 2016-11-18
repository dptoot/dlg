import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import { Actions } from 'react-native-router-flux';

import tcomb from 'tcomb-form-native';

import {
	View,
	Image,
	StyleSheet,
} from 'react-native';

import {
	Container, 
	Button,
} from '../components/';


const Form = tcomb.form.Form;

const UserSignUp = tcomb.struct({
  username: tcomb.String,
  email: tcomb.String, 
  password: tcomb.String,
  matchPassword: tcomb.String,
});

const options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true,
        }
    }
}


class SignUp extends Component {

	constructor(props) {
		super(props)
		this.state = {
			model: {},
		}
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(model) {
		this.setState({
			model: model,
		})
	}

	handleSignUp() {
		this.props.createUser(this.state.model);
	}

	render() {
		return (
			<Container 
				padding="sm"
				justifyContent="center"
				alignItems="stretch"
				>

				<Container justifyContent="center" alignItems="stretch">
					<Form 
	                    type={UserSignUp} 
	                    value={this.state.model}
	                    options={options}
	                    onChange={this.handleInputChange}
	                />
	                <Container expand={false} alignItems="stretch">
	                    <Button 
	                        onPress={this.handleSignUp}
	                        text="Sign Up"
	                        />
                        <Button 
	                        onPress={Actions.login}
	                        text="Already have an account? Well just log in then!"
	                        type="link"
	                        />
	                </Container>
				</Container>

			</Container>
		)
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);