'use strict';

import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native';
import { Container,} from '../components';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

class CreateSelection extends Component {

    render() {
        return (
            <Container
                style={styles.container} 
                expand={false}
                >
                
                <View style={styles.icon}>
                    <Icon 
                        onPress={this.props.onRemovePress}
                        name="remove" 
                        color={theme.colors.light} 
                        size={theme.text.md} 
                        />
                </View>

                <Container
                    expand={false}
                    vertical={false}
                    alignItems="center"
                    >
                    {this.props.children}
                    <Text style={styles.label}>{this.props.label}</Text>
                </Container>
            </Container>
        )
    }
}

CreateSelection.defaultProps = {

}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: theme.border.radius,
        padding: theme.padding.md,
        marginBottom: theme.margin.sm,
        backgroundColor: theme.colors.grayDark,
    },
    icon: {
        position: 'absolute',
        top: theme.padding.sm,
        right: theme.padding.sm,
    },
    label: {
        marginLeft: theme.margin.md,
        color: theme.colors.light,
    }

})

export default CreateSelection;


