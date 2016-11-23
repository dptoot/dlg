'use strict';

import React, { Component } from 'react'
import { View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import renderable from '../hoc/renderable';
import theme from '../styles/theme';

class Container extends Component {

    render() {

        const {padding, margin, children, vertical, justifyContent, alignItems, expand, style, centered, ...rest} = this.props;

        const containerStyle = [
            styles.container, 
            {
                flex: expand ? 1 : 0,
                padding: theme.padding[padding], 
                margin: theme.margin[margin],
                flexDirection: vertical ? 'column' : 'row',
                justifyContent: justifyContent,
                alignItems: alignItems,
            },
            style,
        ];

        if (centered) {
            containerStyle.push({
                justifyContent: 'center',
                alignItems: 'center',
            })
        }
        
        return (
            <View style={containerStyle}>
                {children}
            </View>
        )
    }
}

Container.defaultProps = {
    expand: true, 
    centered: false,
    padding: 'collapsed',
    margin: 'collapsed',
    vertical: true,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}


const styles = StyleSheet.create({
    

})

export default renderable(Container);


