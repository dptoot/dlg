'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import theme from '../styles/theme';

import {Container, ListItem, RemoteImage} from '../components';

class AnswerList extends Component {

    renderAnswer(answer) {
        let item = <Text>{answer.year}</Text>;

        if(answer.imagePath) {
            item = (
                <RemoteImage 
                    style={styles.image}
                    path={answer.imagePath}
                    width={100}
                    originalWidth={154}
                    />
            )
        }

        return (
            <View
                key={answer.id} 
                style={styles.item}>
                {item}
            </View>
        );
    }

    render() {
        
        return (
            
               <ScrollView contentContainerStyle={styles.list}>
                    {this.props.answers.map(this.renderAnswer)}
               </ScrollView>
            
        )
    }
}

AnswerList.defaultProps = {
    onPress: null,
    text: null,
    underlayColor: "rgba(0,0,0,.015)",
}


var styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.grayLightest,
        margin: theme.margin.sm, 
        width: 100,
        height: 100*1.5,
    }, 
});


function mapStateToProps(state) {
    return {
        answers: state.match.answers,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);


