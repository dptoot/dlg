'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../elements';
import classnames from 'classnames';
import Icon from 'react-fontawesome';

class MatchListItem extends Component {

    render() {
        const {match, onDelete, ...rest} = this.props;

        return (
            <div 
                className="match-list-item" 
                onClick={this.props.onClick.bind(null, this.props.match.id)}
                >
                
                {onDelete && <Icon name="remove" onClick={onDelete}/>}

                <RemoteImage 
                    path={match.actor.profile_path}
                    originalWidth={154}
                    width={66}
                    circular
                    />

                
                <div>

                    <div >{match.actor.name}</div>
                    <div >Playing against {match.opponent.user.name}</div>
                    <div >Last Played: {match.lastPlayed}</div>

                </div>
                
            </div>
        )
    }
}

MatchListItem.defaultProps = {
    onCLick: () => {},
    match: {}
}

export default MatchListItem;


