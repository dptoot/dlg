'use strict';

import React, { Component } from 'react'
import classnames from 'classnames';
import { PlaceholderImage } from '../elements';
import {
    getRemoteImageStyle,
} from '../style/imageStyles';

class RemoteImage extends Component {

    render() {

        const {className, path, height, width, style, originalWidth, ...rest} = this.props;

        const classes = classnames({
            'remote-image': true,
        }, className);

        const imageWidth = originalWidth || width;
        const imageUri = `https://image.tmdb.org/t/p/w${imageWidth}${path}`

        const renderImage = () => {
            return (
                <img
                    className={classes}
                    style={getRemoteImageStyle(width)}
                    src={imageUri}
                />
            );
        }

        const renderPlaceholder = () => {
            return (
                <PlaceholderImage
                    className={classes} 
                    width={imageWidth}
                    icon="question"
                    />
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

}

export default RemoteImage;


