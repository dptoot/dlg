'use strict';

import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native';

import {
    Container,
    RemoteImage,
} from '../components';

import theme from '../styles/theme';

class LastAnswer extends Component {

    render() {
        
        return (
            <Container 
                expand={false}
                padding="sm"
                alignItems="stretch"
                style={styles.lastAnswer}
                >
                <Text style={styles.lastAnswerTitle}>Last Movie Answered</Text>
                <Container style={styles.answerContainer} vertical={false} expand={false} >

                    <RemoteImage 
                        path={this.props.answer.imagePath}
                        width={45}
                        />
                    <Container style={styles.answerText}>
                        <Container justifyContent="center">
                            <Text style={styles.answerTitle}>{this.props.answer.title}</Text>
                            <Text style={styles.answerSubtitle}>{this.props.answer.year}</Text>
                        </Container>
                    </Container>
                </Container>
            </Container>
        )
    }
}

LastAnswer.defaultProps = {
    
}


const styles = StyleSheet.create({
    lastAnswer: {
        borderBottomColor: theme.colors.grayLighter,
        borderBottomWidth: .5,
    },
    lastAnswerTitle: {
        fontSize: theme.text.lg,
    },
    answerContainer: {
        marginTop: theme.margin.sm,
        marginBottom: theme.margin.sm,
    },
    answerText: {
        marginLeft: theme.margin.sm
    },
    answerTitle: {
        fontSize: theme.text.xlg
    },
    answerSubtitle: {
        color: theme.colors.gray
    },
})

export default LastAnswer;


