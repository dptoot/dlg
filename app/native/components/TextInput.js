'use strict';

import React, { Component } from 'react'
import {TextInput, View, StyleSheet} from 'react-native';
import {Container} from '../components';
import theme from '../styles/theme';

class CustomTextInput extends Component {

    render() {
        
        return (
            <Container vertical={false} expand={false} >
                <Container>
                    <TextInput 
                        {...this.props}
                        placeholderTextColor={theme.colors.grayLighter}
                        style={[styles.textInput, this.props.style]}
                        />
                </Container>
            </Container>
        )
    }
}

CustomTextInput.defaultProps = {
    onPress: null,
    text: null,
    underlayColor: "rgba(0,0,0,.015)",
}


const styles = StyleSheet.create({
    textInput: {
        height: 40, 
        borderColor: theme.colors.grayLight, 
        borderWidth: 1,
        color: theme.colors.gray,
        fontSize: theme.text.md,
        backgroundColor: theme.colors.light,
        padding: theme.padding.sm,
    }

})

export default CustomTextInput;


