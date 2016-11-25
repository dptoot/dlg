'use strict';

import React, { Component } from 'react'
import { 
    RemoteImage
 } from '../elements';
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';


class LastAnswer extends Component {

    render() {

		const {answer, ...rest} = this.props;

		const classes = classnames({
			'last-answer': true,
		})

        return (
            <div className="last-answer">
                <div className="last-answer-title">
                    Last Movie Answered
                </div>
                <section>
                    <RemoteImage 
                        path={this.props.answer.imagePath} 
                        width={92}
                        />
                    <div class="answer-content">
                        <div className="answer-title">{this.props.answer.title}</div>
                        <div className="answer-year">{this.props.answer.year}</div>
                    </div>
                </section>
            </div>
        );
    }

}

LastAnswer.defaultProps = {

}

export default renderable(LastAnswer);


