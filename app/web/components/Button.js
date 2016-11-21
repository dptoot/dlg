'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';


class Button extends Component {

    render() {

		const {text, ...rest} = this.props;

        return (
            <div className="button" {...rest}>
                {text}
            </div>
        );
    }

}

Button.defaultProps = {

}

export default Button;


