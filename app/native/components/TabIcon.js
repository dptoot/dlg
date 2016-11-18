'use strict';

import React, { Component } from 'react'
import { View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import theme from '../styles/theme';

class TabIcon extends Component {
    render() {
    	const textStyle = [{
    		color: this.props.selected ? theme.colors.primary : theme.colors.light,
    		fontWeight: 'bold',
    	}]

        return (
        	<View style={styles.container}>
            	<Text style={[styles.tabText, textStyle]}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.grayDarker,
      
    },
    tabText: {
    	
    },
})

export default TabIcon;


