'use strict';

import React, { Component } from 'react'
import { View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import {
    Container
} from '../components';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';


class Button extends Component {

    render() {
        
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View>
                    <Container centered>
                        <Icon name={this.props.icon} color={this.props.color} size={this.props.size} />
                    </Container>
                </View>
            </TouchableHighlight>
        )
    }
}

Button.defaultProps = {

}


const styles = StyleSheet.create({
   

})

export default Button;


