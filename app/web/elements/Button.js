'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';
import classnames from 'classnames';


class Button extends Component {

    render() {

		const {text, type,...rest} = this.props;

		const classes = classnames({
			button: true,
			'button-link': type === 'link',
		})

        return (
            <div className={classes} {...rest}>
                {text}
            </div>
        );
    }

}

Button.defaultProps = {

}

export default Button;


