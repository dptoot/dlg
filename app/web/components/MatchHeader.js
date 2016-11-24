'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../elements';



class MatchHeader extends Component {

    renderSearchInput() {
        return (
            <input 
                onClick={this.props.onSearchClick}  
                placeholder={`Guess a ${this.props.match.actor.name} movie`} 
                />
        );
    }

    render() {
        return (
            <div className="match-title">
                <RemoteImage 
                            path={this.props.match.actor.profile_path}
                            width={154}
                            />

                <div className="match-title-content">
                    <div className="text-xlg">{this.props.match.actor.name}</div>
                    {this.props.match.userPlayer.status === 'current' && this.renderSearchInput()}
                </div>    
            </div>
        );
    }

}

MatchHeader.defaultProps = {

}

export default MatchHeader;


