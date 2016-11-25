'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';


class Button extends Component {

    render() {

		const {text, type, icon, ...rest} = this.props;

		const classes = classnames({
			button: true,
			[`button-${type}`]: true,
		})

        return (
            <div className={classes} {...rest}>
                {icon && <Icon name={icon} />}
                {text}
            </div>
        );
    }

}

Button.defaultProps = {
    type: 'primary',
}

export default renderable(Button);


