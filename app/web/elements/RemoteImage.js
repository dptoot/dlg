'use strict';

import React, { Component } from 'react'
import classnames from 'classnames';

class RemoteImage extends Component {

    render() {

        const {className, path, height, width, style, originalWidth, maintainAspectRatio, circular, shadow, ...rest} = this.props;


        const classes = classnames({
            'remote-image': true,
        }, className)
        

        const uri = `https://image.tmdb.org/t/p/w${width}${path}`

        const remoteImageWidth = originalWidth || width;

        const imageStyle = {
            width: width, 
            height: height || width * 1.5,
        }; 

        const renderImage = () => {
            return (
                <img
                    className={classes}
                    style={imageStyle}
                    src={`https://image.tmdb.org/t/p/w${remoteImageWidth}${path}`}
                />
            );
        }

        const renderPlaceholder = () => {
            return (
                <div 
                    className="remote-image placeholder"
                    style={imageStyle}
                    >
                    <span>?</span>
                </div>
            );
        }

        return  (
            <div>
                {path ? renderImage() : renderPlaceholder()}
            </div>  
        )
    }
}

RemoteImage.defaultProps = {
    maintainAspectRatio: false,
    circular: false,
    shadow: true,
}

export default RemoteImage;


