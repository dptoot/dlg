import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import { Alert } from '../elements';
import { Answer, LastAnswer, MatchStatus } from '../components';
import Search from '../containers/Search';
import MatchHeader from '../containers/MatchHeader';
import MatchChat from '../containers/MatchChat';
import {Modal} from 'react-overlays';
import classnames from 'classnames';

class Match extends Component {

	getMatchChatStyles() {
		return {
			root: {
			    boxShadow: 'none',
			},
			sidebar: {
				width: this.props.browser.greaterThan.small ? '20%' : '90%',
				marginTop: '100px',
			},
			content: {
				marginTop: '100px',
				boxShadow: 'none',
			},
			overlay: {
				boxShadow: 'none',
			},
			dragHandle: {
				boxShadow: 'none',
			},
		}
	}
		
	renderMatch() {

		const containerClasses = classnames({
			'flex': this.props.browser.greaterThan.extraSmall,
		})

		return (

			<div className="match-board">
				<Alert
					show={this.props.matchAlerts.renderMatchAlert}
					onHide={this.props.hideMatchAlert}
					title={this.props.matchAlerts.title}
					message={this.props.matchAlerts.message}
					/>

				<MatchHeader 
					match={this.props.match} 
					onSearchClick={this.handleToggleSearch} 
					/>

				<div className={containerClasses}>	
					<LastAnswer 
						rendered={this.props.match.lastAnswer}
						answer={this.props.match.lastAnswer} 
						/>

					<MatchStatus 
						match={this.props.match}
						/>
				</div>
					
				<div className="item-grid">
					{this.props.match.answers.map(answer => <Answer key={answer.id} answer={answer} />)}
				</div>
			</div>
			
		)
	}

	renderPlaceholder() {
		return (
			<div className="match-board-placeholder">
				<div>Select a match from the sidebar or start a new match by pressing the + icon.</div>
			</div>
		);
	}

	render() {
		return (
			<div className="match-board-container">
				{this.props.match ? this.renderMatch() : this.renderPlaceholder()}
			</div>
		);
	}

}

function mapStateToProps(state) {
	console.log('match: ', state.matches.instances[state.match.selectedMatchId])
	return {
		user: state.user,
		match: state.matches.instances[state.match.selectedMatchId],
		matchAlerts: state.matchAlerts,
		browser: state.browser,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);
