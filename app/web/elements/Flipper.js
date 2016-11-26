'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';


class Flipper extends Component {

    render() {

		const {text, type, icon, containerClassName, ...rest} = this.props;

		const classes = classnames({
			flipper: true,
		})

        const containerClasses = classnames({
            'flipper-container': true,
        }, containerClassName)

        const dimensionsStyle = {
            height: this.props.height,
            width: this.props.width,
        }

        return (
            <div 
                style={dimensionsStyle}
                className={containerClasses} 
                onTouchStart="this.classList.toggle('hover');">
                <div className={classes}>
                    <div className="flipper-front" style={dimensionsStyle}>
                        {this.props.front}
                    </div>
                    <div className="flipper-back" style={dimensionsStyle}>
                        {this.props.back}
                    </div>
                </div>
            </div>
        );
    }

}

Flipper.defaultProps = {
    type: 'primary',
}

export default renderable(Flipper);


