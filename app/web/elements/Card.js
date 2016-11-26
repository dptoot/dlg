'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';
import classnames from 'classnames';


class Card extends Component {

    render() {

		const {
            children, 
            title, 
            className, 
            containerClassName, 
            shadow = '1x', 
            vertical = false,
            justify = 'center', 
            ...rest
        } = this.props;

        const classes = classnames({
            card: true,
            [`shadow-${shadow}`]: true,
        }, containerClassName)

        const contentClasses = classnames({
            'card-content': true,
            'flex-column': vertical,
            [`flex-${justify}`]: true,
        }, className);

        return (
            <div className={classes} {...rest}>
            	<div className="card-title">{title}</div>
            	<div className={contentClasses}>
                	{children}
                </div>
            </div>
        );
    }

}

Card.defaultProps = {

}

export default Card;


