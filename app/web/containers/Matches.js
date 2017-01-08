import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import {mapDispatchToProps} from '../../engine';
import { showNotification } from '../notifications';
import renderable from '../hoc/renderable';
import Icon from 'react-fontawesome';

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
		this.handleArchiveMatchesClick = this.handleArchiveMatchesClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {

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

	handleArchiveMatchesClick() {
		this.props.archiveInactiveMatches();
	}

	renderMatches(type) {
		const matches = this.props.matches.types[type];
		
		let element;

		if (matches.length > 0) {
			return this.props.matches.types[type].map(matchId => {
				
				const match = this.props.matches.instances[matchId];
				
				const matchItemProps = {
					key: match.id,
					match: match,
					onClick: this.handleMatchClick,
				}

				return <MatchListItem {...matchItemProps} />;

			});
		} else {
			return (
				<div className="match-list-item-placeholder">
					<div
						className="linkable" 
						onClick={this.handleCreateMatchClick}
						>
						Start a New Match
					</div>
				</div>
			)
		}

		
	}

	render() {

		const showWaitingMatches = this.props.matches.types.waiting.length > 0;
		const showInactiveMatches = this.props.matches.types.inactive.length > 0;
		
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
						rendered={showWaitingMatches}
						title="Waiting on Opponent" 
						/>
					{showWaitingMatches && this.renderMatches('waiting')}	
				</div>
				<div>
					<ListHeader
						rendered={showInactiveMatches}
						title="Completed Matches"
						icon="trash"
						onIconClick={this.handleArchiveMatchesClick} 
						/>
					{showInactiveMatches && this.renderMatches('inactive')}	
				</div>
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
