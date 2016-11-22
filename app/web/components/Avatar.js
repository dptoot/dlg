'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';


class Avatar extends Component {


    render() {

		const {text, ...rest} = this.props;

        return (
            <div className="avatar" {...rest}>
                <div>
                    {this.props.text}
                </div>
            </div>
        );
    }

}

Avatar.defaultProps = {

}

export default Avatar;


