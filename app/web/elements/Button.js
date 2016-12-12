'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';


class Button extends Component {

    render() {

		const {className, text, type, icon, badge, ...rest} = this.props;

		const classes = classnames({
			button: true,
			[`button-${type}`]: true,
		}, className)

        return (
            <div className={classes} {...rest}>
                {badge && <div className="badge">{badge}</div>}
                {icon && <Icon name={icon} />}
                {text}
            </div>
        );
    }

}

Button.defaultProps = {
    type: 'primary',
    badge: false,
}

export default renderable(Button);


