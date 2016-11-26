'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';


class Avatar extends Component {


    render() {

		const {name, text, ...rest} = this.props;

        let content = text;
        
        if (name) {
            content = name.slice(0,1).toUpperCase();
        } 

        return (
            <div className="avatar" {...rest}>
                <div>
                    {content}
                </div>
            </div>
        );
    }

}

Avatar.defaultProps = {

}

export default Avatar;


