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

    renderActorMatchHistory() {
        let actorMatchHistory;
        if (!!this.props.match.actor.played) {
            actorMatchHistory = (
                <div className="text-center">
                    <div className="text-gray">{`The most movies guessed correctly in a match is ${this.props.match.actor.most_answers} by ${this.props.match.actor.most_answers_by.name}.`}</div>
                    <div className="text-gray">{`The highest percentage completed in a single match of ${this.props.match.actor.name} is ${Math.ceil(this.props.match.actor.highest_percentage_completed*100)}%.`}</div>
                </div>
            );
        } else {
            actorMatchHistory = (
                <div className="text-gray">Bold move!  You and {this.props.match.opponent.user.name} are the first people to play {this.props.match.actor.name}</div>
            );
        }

        return actorMatchHistory;
    }

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
                shadow={false}
                >
                <section className="flex flex-middle flex-center">
                    <Avatar text={`${match.answerCompletionPercentage}%`} />
                    <div className="margin-horizontal-md margin-collapse-right">complete</div>
                </section>
                <div className="margin-vertical-lg text-center">
                    <div className="text-md">{`${match.selectedAnswerCount} of ${match.totalAnswerCount} ${match.actor.name} movies have been selected.`}</div>
                    {this.renderActorMatchHistory()}
                </div>
            </Card>
        );
    }

}

MatchStatus.defaultProps = {

}

export default renderable(MatchStatus);


