'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';



class MatchHeader extends Component {

    render() {
        return (
            <div className="match-title">
                <RemoteImage 
                            path={this.props.match.actor.profile_path}
                            width={154}
                            />

                <div className="match-title-content">
                    <div className="text-xlg">{this.props.match.actor.name}</div>
                    <input 
                        onClick={this.props.onSearchClick}  
                        placeholder={`Guess a ${this.props.match.actor.name} movie`} 
                        />
                </div>    
            </div>
        );
    }

}

MatchHeader.defaultProps = {

}

export default MatchHeader;


