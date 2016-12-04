'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import { 
    Alert,
    RemoteImage,
    Button,
    ButtonToolbar,
} from '../elements';



class MatchHeader extends Component {

    renderSearchInput() {
        return (
            <input 
                onClick={this.props.onSearchClick}  
                placeholder={`Guess a ${this.props.match.actor.name} movie`} 
                />
        );
    }

    renderSearchPlaceholder({message, icon}) {
        return (
            <div className="flex text-gray">
                <Icon name={icon} className="text-xlg text-primary" />
                <div className="margin-horizontal-md margin-collapse-right">
                    {message}
                </div>
            </div>
        );
    }

    renderHeaderAction() {
        let action;

        switch(this.props.match.userPlayer.status) {
            case 'current':
                action = this.renderSearchInput();
                break;

            case 'waiting': 
                action = this.renderSearchPlaceholder({
                    message: `Just waiting on ${this.props.match.opponent.user.name} to come up with that next answer.`,
                    icon: 'clock-o',
                });
                break;
            case 'loser': 
                action = this.renderSearchPlaceholder({
                    message: `You lost to ${this.props.match.opponent.user.name}!  Better luck next time.`,
                    icon: 'frown-o',
                });
                break;
            case 'winner': 
                action = this.renderSearchPlaceholder({
                    message: `You beat ${this.props.match.opponent.user.name}!  No one knows more ${this.props.match.actor.name} movies than you do.`,
                    icon: 'trophy',
                });
                break;
            default:
        }

        return action;
    }

    renderQuitMatchAlert() {
        const buttons = [
            {
                text: 'Accept', 
                onClick: this.props.deactivateMatch.bind(null,'resign'),
            }, 
            {
                text: 'Decline',
            }
        ];
        
        return (
            <Alert 
                show={this.props.match.showQuitMatchAlert}
                onHide={this.props.hideQuitMatchAlert}
                title={`Quit Match`}
                message={`Are you sure you want to quit?`}
                buttons={buttons}
                />
        );
    }

    render() {
        return (
            <div className="match-header">
                <RemoteImage 
                            path={this.props.match.actor.profile_path}
                            width={154}
                            />

                <div className="match-header-content">
                    <div className="text-xlg">{this.props.match.actor.name}</div>

                    <div className="match-header-action">
                        {this.renderHeaderAction()}
                    </div>

                    <ButtonToolbar reversed>
                        <Button 
                            type="secondary"
                            rendered={this.props.match.status === 'active'}
                            icon="remove"
                            text="Quit Match"
                            onClick={this.props.showQuitMatchAlert}
                            />
                    </ButtonToolbar>   

                </div>
                 
                {this.renderQuitMatchAlert()}

            </div>
        );
    }

}

MatchHeader.defaultProps = {

}

function mapStateToProps(state) {
    return {
        match: state.match,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchHeader);

