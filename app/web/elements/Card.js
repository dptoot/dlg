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
            icon, 
            onIconClick,
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
            	<div className="card-title">
                    <div>{title}</div>
                    {this.props.icon && <Icon name={this.props.icon} onClick={this.props.onIconClick} />}
                </div>
            	<div className={contentClasses}>
                	{children}
                </div>
            </div>
        );
    }

}

Card.defaultProps = {
    onIconClick: () => {},
}

export default Card;


