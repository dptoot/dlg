'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';


class Avatar extends Component {


    render() {

		const {name, text, ...rest} = this.props;

        return (
            <div className="avatar" {...rest}>
                <div>
                    {name && name.slice(0,1).toUpperCase()}
                </div>
            </div>
        );
    }

}

Avatar.defaultProps = {

}

export default Avatar;


