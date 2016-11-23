'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';
import classnames from 'classnames';


class Card extends Component {

    render() {

		const {children, title, className,...rest} = this.props;

        const classes = classnames({
            card: true,
        }, className)

        return (
            <div className={classes} {...rest}>
            	<div className="card-title">{title}</div>
            	<div className="card-content">
                	{children}
                </div>
            </div>
        );
    }

}

Card.defaultProps = {

}

export default Card;


