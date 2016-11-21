import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import { MatchListItem } from '../components';

class Matches extends Component {

	constructor() {
		super();

		this.handleMatchClick = this.handleMatchClick.bind(this);
	}

	handleMatchClick(matchId) {
		this.props.fetchMatch(matchId)
	}

	renderMatches(list) {
		return this.props.matches.lists[list].map(match => <MatchListItem key={match.id} match={match} onClick={this.handleMatchClick} />);
	}

	render() {
		
		return(
			<div className>
				<div>
					<div className="list-header">Your Turn</div>
					{this.renderMatches('current')}	
				</div>
				<div>
					<div className="list-header">Waiting on Opponent</div>
					{this.renderMatches('waiting')}	
				</div>
				<div>
					<div className="list-header">Completed Matches</div>
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
