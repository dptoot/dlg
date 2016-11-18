'use strict';

import React, { Component } from 'react'
import { View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import theme from '../styles/theme';

class Button extends Component {

    render() {

        let backgroundStyles = [styles.buttonBackground];
        let textStyles = [styles.buttonText];

        if (this.props.type === 'link') {
            backgroundStyles.push({
                backgroundColor: 'transparent',
                
            });
        }

        if (this.props.type === 'link') {
            textStyles.push({
                color: theme.colors.link,
                
            });
        }

        return (
            <TouchableHighlight
                style={backgroundStyles}
                underlayColor={theme.colors.underlay}
                onPress={this.props.onPress}>
                    <Text style={textStyles}>
                        {this.props.text}
                    </Text>
            </TouchableHighlight>
        )
    }
}

Button.defaultProps = {
    onPress: null,
    text: null,
}


const styles = StyleSheet.create({
    buttonBackground: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: theme.colors.primary,
    }, 
    buttonText: {
        color: theme.colors.light,
    }

})

export default Button;


