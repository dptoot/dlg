'use strict';

import React, { Component } from 'react'
import { ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Container} from '../components';
import theme from '../styles/theme';

class CustomActivityIndicator extends Component {

    render() {
        
        return (
            <Container 
                centered
                style={styles.container}>
                <ActivityIndicator {...this.props} />
            </Container>
        )
    }
}

CustomActivityIndicator.defaultProps = {
    animating: false,
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
    }, 

})

export default CustomActivityIndicator;


