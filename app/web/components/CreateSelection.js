'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';

import {
    Card,
} from '../elements';



class CreateSelection extends Component {

    render() {
        return (
            <Card 
                shadow={false}
                className="create-selection"
                >

                <Icon name="remove" onClick={this.props.onRemove}/>

                <div className="create-selection-image">
                    {this.props.children}
                </div>
                
                <div className="create-selection-label">
                    {this.props.name}
                </div>

            </Card>
        );
    }

}

CreateSelection.defaultProps = {

}

export default CreateSelection;


