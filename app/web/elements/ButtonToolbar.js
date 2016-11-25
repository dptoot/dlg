'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';
import classnames from 'classnames';


class ButtonToolbar extends Component {

    render() {

        const {reversed, className, ...rest} = this.props;

		const classes = classnames({
            'button-toolbar': true,
			'button-toolbar-reversed': reversed,
		}, className)

        return (
            <div className={classes} {...rest}>
                {this.props.children}
            </div>
        );
    }

}

ButtonToolbar.defaultProps = {
    reversed: false,
}

export default ButtonToolbar;


