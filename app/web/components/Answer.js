'use strict';

import React, { Component } from 'react'

import { 
    Flipper,
    PlaceholderImage, 
} from '../elements';

import { 
    AnswerBack,
    AnswerFront,
} from '../components';

import {
    getRemoteImageStyle,
} from '../style/imageStyles';

const imageWidth = 185;

class Answer extends Component {

    renderAnswer() {
        return (
            <Flipper
                {...getRemoteImageStyle(imageWidth)}
                containerClassName="margin-vertical-sm"
                front={<AnswerFront answer={this.props.answer} imageWidth={imageWidth}/>}
                back={<AnswerBack answer={this.props.answer} />}
                />
        );
    }

    renderPlaceholder() {
        return (
            <PlaceholderImage 
                width={imageWidth}
                className="answer"
                text={this.props.answer.year}
                />
        );
    }

    render() {
        return this.props.answer.selected ? this.renderAnswer() : this.renderPlaceholder();
    }

}

Answer.defaultProps = {

}

export default Answer;


