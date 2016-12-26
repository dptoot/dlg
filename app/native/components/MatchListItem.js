'use strict';

import React, { Component } from 'react'
import { 
    StyleSheet,
    Image,
    View, 
    Text,
} from 'react-native';

import theme from '../styles/theme';
import {ListItem, RemoteImage} from '../components';


class MatchListItem extends Component {

    render() {
        const {match} = this.props;

        return (
            <ListItem onPress={this.props.onPress} icon="chevron-right">
                <View style={styles.container}>
                    <RemoteImage 
                        style={styles.thumb}
                        path={match.actor.profile_path}
                        originalWidth={154}
                        width={66}
                        circular
                        />
                    <View style={styles.matchInfo}>
                        <Text style={styles.actorName}>{match.actor.name}</Text>
                        <Text style={styles.opponent}>Playing against {match.players.opponent.name}</Text>
                        <Text style={styles.lastPlayed}>Last Played: {match.lastPlayed}</Text>
                    </View>
                </View>
            </ListItem>
        )
    }
}

MatchListItem.defaultProps = {
    onPress: () => {},
    data: {}
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
    }, 
    thumb: {
        flex:0,
        marginRight: 10,
    },
    matchInfo: {
        flex:0,
    },
    actorName: {
        fontSize: theme.text.xlg,
        fontWeight: "400",
    },
    lastPlayed: {
        color: theme.colors.gray,
    },
})

export default MatchListItem;


