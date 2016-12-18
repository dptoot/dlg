'use strict';

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { Container, RemoteImage, Avatar } from '../components';
import theme from '../styles/theme';

class MatchTitle extends Component {

    getMatchStatusText() {
        let matchStatusText;
        const matchStatusCopy = {
            loser: 'You Lost!', 
            winner: 'You Won!',
            current: 'It\'s your turn to guess.',
            waiting: 'Waiting on your opponent to guess.',
        }

        if (this.props.match.status === 'inactive') {
            matchStatusText = matchStatusCopy[this.props.match.players.user.status]; 
        } else {
            matchStatusText = matchStatusCopy[this.props.match.players.user.status]; 
        }

        return matchStatusText;
    }

    render() {
        
        return (
            <Container 
                style={styles.container}
                expand={false} 
                alignItems="stretch">
                        
                <Text style={styles.title}>{this.props.match.actor.name}</Text>
                <Container 
                    expand={false}
                    style={styles.actorContainer}
                    
                    vertical={false}
                    alignItems="stretch"
                    >
                    <RemoteImage 
                        path={this.props.match.actor.profile_path}
                        originalWidth={154}
                        width={154}
                        shadow={false}
                        />
                    <Container 
                        centered
                        >   
                        <Text style={styles.matchStatusText}>{this.getMatchStatusText()}</Text>
                        <Avatar 
                            text={`${this.props.match.answerCompletionPercentage}%`}
                            size={96}
                             />
                        <Text style={styles.actorCompletionText}>{this.props.match.selectedAnswerCount} of {this.props.match.totalAnswerCount} total movies have been guessed</Text>

                    </Container>
                </Container>
                
            </Container>
        )
    }
}

MatchTitle.defaultProps = {
    
}


const styles = StyleSheet.create({
    container: {
        ...theme.shadow,
        marginBottom: theme.margin.sm,
    },
    title: {
        backgroundColor: theme.colors.grayDarker,
        color: theme.colors.light,
        padding: theme.padding.sm,
        fontSize: theme.text.xlg,
    },
    actorContainer: {
        backgroundColor: theme.colors.grayDark,
    },
    matchStatusText: {
        fontSize: theme.text.xlg,
        color: theme.colors.light,
        textAlign: 'center',
    },
    actorCompletionText: {
        fontSize: theme.text.lg,
        color: theme.colors.light,
    },
})

export default MatchTitle;


