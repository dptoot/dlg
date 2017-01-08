import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import {mapDispatchToProps} from '../../engine';
import { showNotification } from '../notifications';
import renderable from '../hoc/renderable';

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

	componentWillReceiveProps(nextProps) {
		// Show pending match alert if there is a pending match present
		if (nextProps.matches.types.pending.length !== this.props.matches.types.pending.length) {
			this.props.showPendingMatchAlert()
		}

		// Show a window notification if there has been a change in current matches
		// and it is not the initial data load
		const isInitialDataLoad = this.props.matches.isInitialState && !nextProps.matches.isInitialState;
		
		if ( !isInitialDataLoad && (nextProps.matches.types.current.length > this.props.matches.types.current.length)) {
			this.showMatchUpdateNotification()
		}
	}

	showMatchUpdateNotification() {
		showNotification('There has been an match update', 'Looks like it\'s your turn again.');	
	}

	handleMatchClick(matchId) {
		this.props.onMatchClick();
		this.props.selectMatch(matchId);
	}

	handleCreateMatchClick() {
		this.props.showCreateMatch();
	}
	
	renderPendingMatchAlert() {

		const pendingMatchId = this.props.matches.types.pending[0];
		const match = this.props.matches.instances[pendingMatchId];

		if (match) {
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
					title={`${match.players.opponent.name} wants to challenge you`}
					message={`The actor is ${match.actor.name}.  Do you accept?`}
					buttons={buttons}
					/>
			);
		} else {
			return null;
		}
	}

	renderMatches(list) {
		const matches = this.props.matches.types[list];
		let element;

		if (matches.length > 0) {
			element = this.props.matches.types[list].map(matchId => {
				const match = this.props.matches.instances[matchId];
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

Matches.defaultProps = {
	onMatchClick: () => {},
}

function mapStateToProps(state) {
	return {
		user: state.user,
		matches: state.matches,
		browser: state.browser,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(renderable(Matches));
