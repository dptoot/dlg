import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import {mapDispatchToProps} from '../../engine';
import { MatchListItem, ListHeader } from '../components';

class Matches extends Component {

	constructor() {
		super();

		this.handleMatchClick = this.handleMatchClick.bind(this);
		this.handleCreateMatchClick = this.handleCreateMatchClick.bind(this);
	}

	handleMatchClick(matchId) {
		this.props.fetchMatch(matchId)
	}

	handleCreateMatchClick() {
		browserHistory.push('/createMatch');
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

			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		matches: state.matches,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
