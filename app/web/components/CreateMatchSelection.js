'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';


class CreateMatchSelection extends Component {

    render() {
        return (
            <div className="create-match-selection">
                <div className="create-match-selection-title">{this.props.title}</div>
                <div className="create-match-selection-content">
                    {this.props.children}
                    <div className="create-match-selection-name">{this.props.name}</div>
                </div>
            </div>
        );
    }

}

CreateMatchSelection.defaultProps = {

}

export default CreateMatchSelection;


