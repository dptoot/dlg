'use strict';

import React, { Component } from 'react'
import renderable from '../hoc/renderable';
import { 
    RemoteImage,
} from '../elements';
import Icon from 'react-fontawesome';

class AnswerFront extends Component {

    renderSelectedBy() {
        return (
            <div className="selected-by">
                {`${this.props.answer.selectedBy.name}`}
                <Icon name="check-circle" className="text-secondary" />
            </div>
        )  
    }

    render() {
        return (
            <div className="answer-front">
                <RemoteImage path={this.props.answer.imagePath} width={this.props.imageWidth} />
                {this.props.answer.selectedBy && this.renderSelectedBy()}
            </div>      
        );
    }

}

AnswerFront.defaultProps = {
    
}

export default renderable(AnswerFront);


