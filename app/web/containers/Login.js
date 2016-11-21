import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import { mapDispatchToProps } from '../../engine';
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
			browserHistory.push('/lastManStanton')
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
			<div>
				<Form 
                    type={UserLogin} 
                    value={this.props.user}
                    options={options}
                    onChange={this.handleInputChange}
                />

                <button 
                	onClick={this.handleLogin}>
                	Login
                </button>
			</div>	
		)
	}
}


function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);