'use strict';

import React, { Component } from 'react'

import {
    Card,
} from '../elements';

class CreateMatchInput extends Component {

    render() {

        const {title, onInputClick, placeholder} = this.props;

        return (
            <div className="create-match-input"
                title={title}
                >
                <input 
                    placeholder={placeholder}
                    onClick={onInputClick}
                    />
            </div>
        );
    }

}

CreateMatchInput.defaultProps = {

}

export default CreateMatchInput;


