'use strict';

import React, { Component } from 'react'

import {
    View, 
    Text,
    StyleSheet
} from 'react-native';

import {
    Container, 
    ListItem, 
    RemoteImage,
} from '../components';

import theme from '../styles/theme';

class UserListItem extends Component {

    render() {
        
        return (
            <ListItem onPress={this.props.onPress}>
                <Container
                    expand={false}
                    vertical={false}
                    alignItems="center"
                    >
                    <Text>{this.props.user.name}</Text>
                </Container>
            </ListItem>
        )
    }
}

UserListItem.defaultProps = {
    
}


const styles = StyleSheet.create({
    thumb: {
        marginRight: theme.margin.sm,
    }

})

export default UserListItem;


