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

    constructor() {
        super();

        this.handleRematch = this.handleRematch.bind(this);
        this.handleSearchSelection = this.handleSearchSelection.bind(this);
        this.handleSearchInputClick = this.handleSearchInputClick.bind(this);
    }

    handleRematch() {
        this.props.updateSearchSelectedResult('users', this.props.match.players.opponent);
        this.props.showCreateMatch();
    }

    handleSearchSelection(answer) {
        this.props.clearSearchSelectedResult('movies');
        this.props.hideSearch();
        this.props.verifyAnswer(answer);
    }

    handleSearchInputClick() {
        this.props.showSearch({
            collection: 'movies',
            onSelection: this.handleSearchSelection.bind(this),
        });
    }

    getButtonText(button) {
        let text = '';

        if (!this.props.browser.is.extraSmall) {
            switch(button) {
                case 'refresh': 
                    text = 'Refresh'
                    break;

                case 'chat':
                    text = this.props.layout.showMatchChat ? 'Close Chat' : 'Open Chat' 
                    break;

                case 'quit': 
                    text = 'Resign';
                    break;
                    
                case 'rematch': 
                    text = `Start match against ${this.props.match.players.opponent.name}`
                    break;

                default:
            }
        }

        return text;
    }

    renderSearchInput() {
        return (
            <input 
                onClick={this.handleSearchInputClick}  
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

        switch(this.props.match.players.user.status) {
            case 'current':
                action = this.renderSearchInput();
                break;

            case 'waiting': 
                action = this.renderSearchPlaceholder({
                    message: `Just waiting on ${this.props.match.players.opponent.name} to come up with that next answer.`,
                    icon: 'clock-o',
                });
                break;
            case 'loser': 
                action = this.renderSearchPlaceholder({
                    message: `You lost to ${this.props.match.players.opponent.name}!  Better luck next time.`,
                    icon: 'frown-o',
                });
                break;
            case 'winner': 
                action = this.renderSearchPlaceholder({
                    message: `You beat ${this.props.match.players.opponent.name}!  No one knows more ${this.props.match.actor.name} movies than you do.`,
                    icon: 'trophy',
                });
                break;
            default:
        }

        return action;
    }

    renderQuitMatchAlert() {

        console.log(this.props.match)

        const buttons = [
            {
                text: 'Yes', 
                onClick: () => this.props.deactivateMatch({
                    matchId: this.props.match.id,
                    winnerId: this.props.match.players.opponent.id,
                    loserId: this.props.match.players.user.id,
                }),
            }, 
            {
                text: 'No',
            }
        ];
        
        return (
            <Alert 
                show={this.props.renderQuitMatchAlert}
                onHide={this.props.hideMatchAlert}
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

                    <ButtonToolbar align="right">

                        <Button 
                            type="secondary"
                            icon="comments"
                            text={this.getButtonText('chat')}
                            onClick={this.props.layout.showMatchChat ? this.props.hideMatchChat : this.props.showMatchChat}
                            />
                        <Button 
                            rendered={this.props.match.status === 'active'}
                            type="secondary"
                            icon="remove"
                            text={this.getButtonText('quit')}
                            onClick={this.props.showQuitMatchAlert}
                            />
                        <Button 
                            rendered={this.props.match.status === 'active'}
                            type="secondary"
                            icon="refresh"
                            text={this.getButtonText('refresh')}
                            onClick={() => this.props.refreshMatches()}
                            />
                        <Button 
                            rendered={this.props.match.status === 'inactive'}
                            type="secondary"
                            icon="plus"
                            text={this.getButtonText('rematch')}
                            onClick={this.handleRematch}
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
        match: state.matches.instances[state.match.id],
        renderQuitMatchAlert: state.matchAlerts.renderQuitMatchAlert,
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchHeader);

