'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';

import { 
    Alert,
} from '../elements';

class PendingMatchContainer extends Component {
    
    renderAlert() {

        const buttons = [
            {
                text: 'Accept', 
                onClick: () => {
                    this.props.acceptMatch(this.props.match.id);
                }
            }, 
            {
                text: 'Decline',
                onClick: () => {
                    this.props.deleteMatch(this.props.match.id);
                }
            }
        ];
        
        return (
            <Alert 
                show={true}
                onHide={this.props.hideMatchAlert}
                title={`${this.props.match.players.opponent.name} wants to challenge you`}
                message={`The actor is ${this.props.match.actor.name}.  Do you accept?`}
                buttons={buttons}
                />
        );
        
    }

    render() {
        return this.props.hasPendingMatch && this.renderAlert();
    }

}

function mapStateToProps(state) {
    return {
        match: state.matches.instances[state.matches.types.pending[0]],
        hasPendingMatch: state.matches.types.pending.length > 0,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingMatchContainer);

