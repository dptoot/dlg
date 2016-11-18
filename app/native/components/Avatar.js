'use strict';

import React, { Component } from 'react'
import { View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import theme from '../styles/theme';

class Avatar extends Component {

    render() {

        const containerStyles = [styles.avatarContainer, {
            height: this.props.size,
            width: this.props.size,
            borderRadius: this.props.size / 2,
        }, this.props.containerStyles]
        
        return (
            <View style={containerStyles}>
                <Text style={styles.avatarText}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

Avatar.defaultProps = {
    onPress: null,
    text: null,
    size: null,
}


const styles = StyleSheet.create({
    avatarContainer: {
        flex:0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        margin: theme.margin.sm,
        ...theme.shadow,
    }, 
    avatarText: {
        color: theme.colors.light,
        fontWeight: "bold",
        fontSize: theme.text.xlg
    },
})

export default Avatar;


