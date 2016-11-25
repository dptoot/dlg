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

    renderSearchPlaceholder() {
        return (
            <div className="flex text-gray">
                <Icon name="clock-o" className="text-xlg" />
                <div className="margin-horizontal-md margin-collapse-right">
                    Just waiting on {this.props.match.opponent.user.name} to come up with that next answer.
                </div>
            </div>
        );
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
                        {this.props.match.userPlayer.status === 'current' && this.renderSearchInput()}
                        {this.props.match.userPlayer.status === 'waiting' && this.renderSearchPlaceholder()}
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

