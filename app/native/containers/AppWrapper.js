'use strict';

import React, { Component } from 'react'
import { 
    View,
    Alert,
    StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import socket from '../lib/websocketConfig';

import theme from '../styles/theme';

class AppWrapper extends Component {

    componentDidMount() {
        socket.on('matchupdate', message => {
            if(message.players.includes(this.props.user.id)) {
                // update matches lists for the user
                this.props.fetchMatchesList(this.props.user.id);

                // update current match if it is affected
                if (message.id === this.props.match.id) {
                    this.props.fetchMatch(this.props.match.id);
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        // Notify user if there are pending matches
        const pendingMatchesLength = nextProps.matches.lists.pending.length;
        const hasNewPendingMatch = pendingMatchesLength !== this.props.matches.lists.pending.length;
        if (pendingMatchesLength > 0 && hasNewPendingMatch) {
            this.renderPendingMatchAlert(nextProps.matches.lists.pending[0]);
        }
    }

    renderPendingMatchAlert(match) {
        return Alert.alert(
            `${match.opponent.user.name} wants to challenge you`,
            `The actor is ${match.actor.name}.  Do you accept?`,
            [
                {
                    text: 'Accept', 
                    onPress: () => this.props.acceptMatch(match.id),
                }, 
                {
                    text: 'Decline', 
                }
            ]
        )
    }

    render() {
        return (
            <View />
        );
    }
}

var styles = StyleSheet.create({

});

function mapStateToProps(state) {
    return {
        user: state.user,
        matches: state.matches,
        match: state.match,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);