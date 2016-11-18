'use strict';

import React, { Component } from 'react'
import {View, Image, StyleSheet} from 'react-native';
import { Container } from '../components';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

class RemoteImage extends Component {

    render() {
        
        const {path, height, width, style, originalWidth, maintainAspectRatio, circular, shadow, ...rest} = this.props;

        const uri = `https://image.tmdb.org/t/p/w${width}${path}`

        const remoteImageWidth = originalWidth || width;

        const imageStyle = [
            styles.container,
            {
                width: width, 
                height: height || width * 1.5,
            }, 
            style,
        ];

        if (circular) {
            imageStyle.push({
                width: width,
                height: width,
                borderRadius: width/2,
            });
        }

        const containerStyle = [];

        if (shadow) {
            containerStyle.push({...theme.shadow})
        }

        const renderImage = () => {
            return (
                <Image
                    source={{
                        uri:`https://image.tmdb.org/t/p/w${remoteImageWidth}${path}`,
                    }} 
                    style={imageStyle}
                />
            );
        }

        const renderPlaceholder = () => {
            return (
                <Container centered style={[imageStyle, styles.placeholderContainer]}>
                    <Icon name="question" color={theme.colors.gray} size={theme.text.lg} />
                </Container>
            );
        }

        return  (
            <View style={!circular && containerStyle}>
                {path ? renderImage() : renderPlaceholder()}
            </View>  
        )
    }
}

RemoteImage.defaultProps = {
    maintainAspectRatio: false,
    circular: false,
    shadow: true,
}


var styles = StyleSheet.create({
    placeholderContainer: {
        backgroundColor: theme.colors.grayLightest,
    }
});

export default RemoteImage;


