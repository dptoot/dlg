'use strict';

import React, { Component } from 'react'
import { 
    Avatar,
    Card,
    RemoteImage
 } from '../elements';
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';


class MatchStatus extends Component {

    render() {

        const {match, className, ...rest} = this.props;

        const classes = classnames({
            'match-status': true,
        }, className)

        return (
            <Card
                justify="left" 
                containerClassName={classes}
                title="Match Stats"
                vertical
                >
                <section className="flex flex-middle flex-center">
                    <Avatar text={`${match.answerCompletionPercentage}%`} />
                    <div className="margin-horizontal-md margin-collapse-right">complete</div>
                </section>
                <div className="margin-vertical-lg">
                    <div className="text-md">{`${match.selectedAnswerCount} of ${match.totalAnswerCount} ${match.actor.name} movies have been selected.`}</div>
                    <div className="text-gray">{`The most movies guessed correctly in a match is ${match.actor.most_answers} by ${match.actor.most_answers_by.name}.`}</div>
                    <div className="text-gray">{`The highest percentage completed in a single match of ${match.actor.name} is ${Math.ceil(match.actor.highest_percentage_completed*100)}%.`}</div>
                </div>
            </Card>
        );
    }

}

MatchStatus.defaultProps = {

}

export default renderable(MatchStatus);


