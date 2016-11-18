'use strict';

import React, { Component } from 'react'
import { TextInput, View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import { Container, ListItem, Avatar } from '../components'; 
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../engine';

import theme from '../styles/theme';

class SideMenu extends Component {

    render() {

        return (
            <Container
                style={styles.container}
                alignItems="stretch"
                >
                <Container alignItems="stretch" expand={false} vertical={false}>
                    <Avatar
                        size={64}
                        text={this.props.user && this.props.user.name.slice(0,1).toUpperCase()}
                        />
                    <Container centered>
                        <Text style={styles.usernameText}>
                            {this.props.user.name}
                        </Text>
                    </Container>
                </Container>
                
                <Container alignItems="stretch" expand={false}>
                    
                    <ListItem 
                        icon="chevron-right"
                        onPress={this.props.logoutUser}
                        text="Your all-time stats"
                        />

                    <ListItem 
                        icon="chevron-right"
                        onPress={this.props.logoutUser}
                        text="Logout"
                        />
               
                </Container>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: theme.margin.lg,
    }, 
    usernameText: {
        fontSize: theme.text.xlg,
    }
});

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);