'use strict';

import React, { Component } from 'react'
import { 
    RemoteImage,
    Flipper,
} from '../elements';

import { 
    AnswerBack
} from '../components';

class Answer extends Component {

    render() {

        const {answer, ...rest} = this.props;
        const imageWidth = 185;
        const placeholderStyle = {
            width: imageWidth,
            height: imageWidth*1.5,
        }

        let item = (
            <div 
                key={answer.id} 
                style={placeholderStyle}
                className="answer"
                >
                <span>{answer.year}</span>
            </div>
        );

        if (answer.imagePath) {
            item = (
                
                <Flipper
                    containerClassName="margin-vertical-sm"
                    key={answer.id} 
                    front={<RemoteImage path={answer.imagePath} width={imageWidth} />}
                    back={<AnswerBack answer={answer} />}
                    {...placeholderStyle}
                    />
                
            )
        }

        return item;
    }

}

Answer.defaultProps = {

}

export default Answer;


