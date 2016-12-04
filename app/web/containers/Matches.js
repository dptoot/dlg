import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import {mapDispatchToProps} from '../../engine';
import socket from '../websocket';
import { showNotification } from '../notifications';

import { 
	MatchListItem,
} from '../components';

import { 
	Alert,
	ListHeader,
} from '../elements';

class Matches extends Component {

	constructor() {
		super();

		this.handleMatchClick = this.handleMatchClick.bind(this);
		this.handleCreateMatchClick = this.handleCreateMatchClick.bind(this);
	}

	componentDidMount() {
		socket.on('matchupdate', message => {	
			if(message.players.includes(this.props.user.id)) {
				this.props.fetchMatchesList(this.props.user.id);
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		// Show pending match alert if there is a pending match present
		if (nextProps.matches.lists.pending.length !== this.props.matches.lists.pending.length) {
			this.props.showPendingMatchAlert()
		}

		// Show a window notification if there has been a change in current matches
		// and it is not the initial data load
		const isInitialDataLoad = this.props.matches.isInitialState && !nextProps.matches.isInitialState;
		
		if ( !isInitialDataLoad && (nextProps.matches.lists.current.length > this.props.matches.lists.current.length)) {
			this.showMatchUpdateNotification()
		}
	}

	showMatchUpdateNotification() {
		showNotification('There has been an match update', 'Looks like it\'s your turn again.');	
	}

	handleMatchClick(matchId) {
		this.props.fetchMatch(matchId)
	}

	handleCreateMatchClick() {
		browserHistory.push('/create-match');
	}
	
	renderPendingMatchAlert() {

		const match = this.props.matches.lists.pending[0];
		const buttons = [
			{
				text: 'Accept', 
				onClick: () => {
					this.props.acceptMatch(match.id);
				}
			}, 
			{
				text: 'Decline',
				onClick: () => {
					this.props.deleteMatch(match.id);
				}
			}
		];
		
		return (
			<Alert 
				show={true}
				onHide={this.props.hidePendingMatchAlert}
				title={`${match.opponent.user.name} wants to challenge you`}
				message={`The actor is ${match.actor.name}.  Do you accept?`}
				buttons={buttons}
				/>
		);
		
	}

	renderMatches(list) {
		const matches = this.props.matches.lists[list];
		let element;

		if (matches.length > 0) {
			element = this.props.matches.lists[list].map(match => {
				const dynamicProps = {}
				if (list === 'inactive') {
					Object.assign(dynamicProps, {
						onDelete: this.props.archiveMatch.bind(null, match.id)
					})
				}

				return (
					<MatchListItem 
						key={match.id} 
						match={match} 
						onClick={this.handleMatchClick}
						{...dynamicProps}
						/>
				);
			});
		} else {

			const messages = {
				inactive: 'You have no recently completed matches',
				waiting: 'You are not waiting on anyone to play',
				current: 'It is not your turn in any matches',
			}

			element = (
				<div className="match-list-item-placeholder">
					<div>{messages[list]}</div>
				</div>
			)
		}

		return element;
	}

	render() {
		
		return(
			<div className="matches">
				<div>
					<ListHeader
						title="Your Turn" 
						icon="plus"
						onIconClick={this.handleCreateMatchClick}
						/>
					{this.renderMatches('current')}	
				</div>
				<div>
					<ListHeader
						title="Waiting on Opponent" 
						/>
					{this.renderMatches('waiting')}	
				</div>
				<div>
					<ListHeader
						title="Completed Matches" 
						/>
					{this.renderMatches('inactive')}	
				</div>

				{this.props.matches.showPendingMatchAlert && this.renderPendingMatchAlert()}
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
		matches: state.matches,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
