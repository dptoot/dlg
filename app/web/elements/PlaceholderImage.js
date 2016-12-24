'use strict';

import React, { Component } from 'react'
import classnames from 'classnames';
import Icon from 'react-fontawesome';

import {
    getRemoteImageStyle,
} from '../style/imageStyles';

const PlaceholderImage = ({className, width, icon, text, ...rest}) => {

    const containerClasses = classnames({
            'placeholder-image': true,
    }, className);

    return  (
        <div 
            className={containerClasses}
            style={getRemoteImageStyle(width)}
            >
            {icon && <Icon name={icon} />}
            {text}
        </div>
    );

};

export default PlaceholderImage;


