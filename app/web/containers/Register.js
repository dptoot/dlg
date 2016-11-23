import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import { mapDispatchToProps } from '../../engine';
import {
	Card, 
	CenteredWrapper,
	Button,
} from '../elements'

import tcomb from 'tcomb-form';

const Form = tcomb.form.Form;

const UserRegister = tcomb.struct({
  username: tcomb.String,
  email: tcomb.String, 
  password: tcomb.String,
  repeat: tcomb.String,
});

const options = {
	auto: 'placeholders',
    fields: {
        password: {
            password: true,
            secureTextEntry: true,
        }
    }
}


class Register extends Component {

	constructor(props) {
		super(props)
		this.state = {
			model: {},
		}
		this.handleRegister = this.handleRegister.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.isAuthenticated) {
			browserHistory.push('/lastmanstanton');
		}
	}

	handleInputChange(model) {
		this.setState({
			model: model,
		})
	}

	handleRegister() {
		this.props.createUser(this.state.model);
	}

	render() {
		return (
			<CenteredWrapper>

				<Card 
					className="register-card"
					title="Register"
					>
					<Form 
	                    type={UserRegister} 
	                    value={this.state.model}
	                    options={options}
	                    onChange={this.handleInputChange}
	                />
	                
                    <Button 
                        onClick={this.handleRegister}
                        text="Sign Up for an Account"
                        />
                        
	                
				</Card>

				<Button 
                    onClick={() => browserHistory.push('/login')}
                    text="Already have an account? Well just log in then!"
                    type="link"
                    />

			</CenteredWrapper>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);