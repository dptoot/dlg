'use strict';

import React, { Component } from 'react'
import { 
    View,
    Alert,
    StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../engine';

import theme from '../styles/theme';

class AppWrapper extends Component {

    componentDidMount() {

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
            `${match.players.opponent.name} wants to challenge you`,
            `The actor is ${match.actor.name}.  Do you accept?`,
            [
                {
                    text: 'Accept', 
                    onPress: () => this.props.acceptMatch(match.id),
                }, 
                {
                    text: 'Decline', 
                    onPress: () => this.props.deleteMatch(match.id),
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