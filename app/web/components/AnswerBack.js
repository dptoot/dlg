'use strict';

import React, { Component } from 'react'
import renderable from '../hoc/renderable';


class AnswerBack extends Component {

    render() {

        const {answer, ...rest} = this.props;

        return (
            <div className="answer-back">
                <div className="answer-title">{answer.title}</div>
                <div className="answer-year">{answer.year}</div>
                {/*<div className="answer-overview">{answer.overview}</div>*/}
            </div>
        );
    }

}

AnswerBack.defaultProps = {
    type: 'primary',
}

export default renderable(AnswerBack);


