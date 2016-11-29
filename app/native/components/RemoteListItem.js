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

    renderYear() {
        return this.props.item.year && (
            <Text style={styles.itemYear}>{this.props.item.year}</Text>
        );
    }

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
                    <Container expand={false}
                        style={styles.itemLabel}
                        >
                        <Text style={styles.itemName}>{this.props.item.name}</Text>
                        {this.renderYear()}
                    </Container>
                </Container>
            </ListItem>
        )
    }
}

RemoteListItem.defaultProps = {
    
}


const styles = StyleSheet.create({
    itemLabel: {
        marginLeft: theme.margin.sm,
    },
    itemYear: {
        color: theme.colors.gray,
    }

})

export default RemoteListItem;


