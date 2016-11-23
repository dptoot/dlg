import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import { mapDispatchToProps } from '../../engine';
// import { Card } from '../components';
import { 
	Card,
	CenteredWrapper,
	Button,
} from '../elements';
import tcomb from 'tcomb-form';


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

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.isAuthenticated) {
			browserHistory.push('/lastmanstanton');
		}
	}

	handleInputChange(model) {
		this.props.updateUserLogin(model);
	}

	handleLogin() {
		this.props.authenticateUser();
	}

	render() {
		return (
			<CenteredWrapper>
				<Card 
					className="login-card"
					title="Login"
					>

					<Form 
	                    type={UserLogin} 
	                    value={this.props.user}
	                    options={options}
	                    onChange={this.handleInputChange}
	                />

	                <Button 
	                	text="Submit"
	                	onClick={this.handleLogin} 
	                	/>
				</Card>	

				<Button 
                    onClick={() => browserHistory.push('/register')}
                    text="Don't have an account yet?  Register an account real quick."
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);