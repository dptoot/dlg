'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';


class CreateMatchInput extends Component {

    render() {

        const {label, onClick, placeholder} = this.props;

        return (
            <div className="create-match-input">
                <div>{label}</div>
                <input 
                    placeholder={placeholder}
                    onClick={onClick}
                    />
            </div>
        );
    }

}

CreateMatchInput.defaultProps = {

}

export default CreateMatchInput;


