'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';

class Answer extends Component {

    render() {

        const {answer, ...rest} = this.props;
        const placeholderStyle = {
            width: 154,
            height: 154*1.5,
        }

        let item = (
            <div 
                style={placeholderStyle}
                className="answer"
                >
                <span>{answer.year}</span>
            </div>
        );

        if (answer.imagePath) {
            item = (
                <div className="answer">
                    <RemoteImage 
                        path={answer.imagePath}
                        width={154}
                        />
                </div>
            )
        }

        return (
            <div
                key={answer.id} 
               >
                {item}
            </div>
        );
    }

}

Answer.defaultProps = {

}

export default Answer;


