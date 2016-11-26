'use strict';

import React, { Component } from 'react'
import { 
    Card,
    RemoteImage,
 } from '../elements';
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';


class LastAnswer extends Component {

    render() {

		const {answer, className, ...rest} = this.props;

		const classes = classnames({
			'last-answer': true,
		}, className)

        return (
            <Card 
                justify="left"
                containerClassName={classes}
                title="Last Answer"
                shadow={false}
                >
                <RemoteImage 
                    path={this.props.answer.imagePath} 
                    width={92}
                    />
                <div className="margin-horizontal-lg margin-collapse-right">
                    <div className="text-lg">{this.props.answer.title}</div>
                    <div className="text-gray">{this.props.answer.year}</div>
                </div>
            </Card>
        );
    }

}

LastAnswer.defaultProps = {

}

export default renderable(LastAnswer);


