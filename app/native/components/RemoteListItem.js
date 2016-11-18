'use strict';

import React, { Component } from 'react'
import { View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import {
    Container, 
    ListItem, 
    RemoteImage,
} from '../components';

import theme from '../styles/theme';

class RemoteListItem extends Component {

    render() {
        
        return (
            <ListItem onPress={this.props.onPress}>
                <Container
                    expand={false}
                    vertical={false}
                    alignItems="center"
                    >
                    <RemoteImage 
                        style={styles.itemThumb}
                        path={this.props.item.imagePath} 
                        width={45}
                        />
                    <Text style={styles.itemText}>{this.props.item.name}</Text>
                </Container>
            </ListItem>
        )
    }
}

RemoteListItem.defaultProps = {
    
}


const styles = StyleSheet.create({
    itemText: {
        marginLeft: theme.margin.sm,
    }

})

export default RemoteListItem;


