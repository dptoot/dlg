import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import {mapDispatchToProps} from '../../engine';
import socket from '../webSocket';
import { 
	MatchListItem,
	ListHeader,
	Alert,
} from '../components';

class Matches extends Component {

	constructor() {
		super();

		this.handleMatchClick = this.handleMatchClick.bind(this);
		this.handleCreateMatchClick = this.handleCreateMatchClick.bind(this);
	}

	componentDidMount() {
		socket.on('matchupdate', message => {
			console.log('matchupdate', message);
			if(message.players.includes(this.props.user.id)) {
				this.props.fetchMatchesList(this.props.user.id);
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.matches.lists.pending.length !== this.props.matches.lists.pending.length) {
			this.props.showPendingMatchAlert()
		}
	}

	handleMatchClick(matchId) {
		this.props.fetchMatch(matchId)
	}

	handleCreateMatchClick() {
		browserHistory.push('/createMatch');
	}
	
	renderPendingMatchAlert() {

		const match = this.props.matches.lists.pending[0];
		const buttons = [
			{
				text: 'Accept', 
				onClick: () => {
					this.props.acceptMatch(match.id);
					this.props.hidePendingMatchAlert();
				}
			}, 
			{
				text: 'Decline',
				onClick: () => {
					this.props.deleteMatch(match.id);
					this.props.hidePendingMatchAlert();
				}
			}
		];
		return (
			<Alert 
				show={true}
				title={`${match.opponent.user.name} wants to challenge you`}
				message={`The actor is ${match.actor.name}.  Do you accept?`}
				buttons={buttons}
				/>
		);
		
	}

	renderMatches(list) {
		return this.props.matches.lists[list].map(match => <MatchListItem key={match.id} match={match} onClick={this.handleMatchClick} />);
	}

	render() {
		
		return(
			<div className>
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
