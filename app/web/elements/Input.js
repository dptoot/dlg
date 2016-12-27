'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';

class Input extends Component {

    render() {

		const {className, isUpdating, ...rest} = this.props;

		const containerClasses = classnames({
            'input-wrapper': true,
        });

        return (
            <div className={containerClasses} {...rest}>
                <input
                    className={className} 
                    {...rest}
                    />
                { isUpdating && <Icon name="spinner" className="fa-spin text-grayDark"/> }
            </div>
        );
    }

}

Input.defaultProps = {
    type: 'primary',
    badge: false,
}

export default renderable(Input);


