'use strict';

import React, { Component } from 'react'
import {Alert} from 'react-native';


class CustomAlert extends Component {

    render() {
         const buttons = React.Children.map(this.props.children, button => {
            return {
                text: button.props.text,
                onPress: () => {
                    button.props.onPress()
                    this.props.onHide();
                }
            }
        });

        if (this.props.show) {
            Alert.alert(
                this.props.title, 
                this.props.message,
                buttons
            )
        }

        return null;
    }
}

CustomAlert.defaultProps = {
    show: true,
}

export default CustomAlert;


