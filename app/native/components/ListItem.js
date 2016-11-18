'use strict';

import React, { Component } from 'react'
import { TextInput, View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import {Container} from '../components';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

class ListItem extends Component {

    renderPressableListItem(listItem) {
        
        return (
            <TouchableHighlight
              style={styles.container}
              underlayColor={theme.colors.primary}
              onPress={this.props.onPress}>
                <View style={styles.touchableContainer}>
                    {listItem}
                    {this.props.icon && <Icon name={this.props.icon} size={theme.text.md} color={theme.colors.primary} />}
                </View>
            </TouchableHighlight>
        );
    }

    renderReadOnlyListItem(listItem) {
        return (
            <View style={styles.container}>{listItem}</View>
        );
    }

    renderListItem(listItemChild) {
        return (
            <View>{listItemChild}</View>
        )
    }

    render() {
        const {text, children, ...rest } = this.props;
        let listItemChild = <Text style={styles.listItemText}>{text}</Text>;
        
        if (children) {
            listItemChild = <View>{children}</View> 
        } 

        const listItem = this.renderListItem(listItemChild);

        return this.props.onPress ? this.renderPressableListItem(listItem) : this.renderReadOnlyListItem(listItem)
        
    }
}

ListItem.defaultProps = {
    onPress: null,
    text: null,
    icon: false,
    underlayColor: "rgba(255,255,255,.015)",
}


const styles = StyleSheet.create({
  container: {
    flex:0,
    backgroundColor: theme.colors.light,
    borderBottomColor: theme.colors.grayLighter,
    borderBottomWidth: .5,
    padding: theme.padding.sm,
  },
  touchableContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    color: theme.colors.dark,
    fontSize: theme.text.md,
    fontWeight: '400',
  },
})

export default ListItem;


