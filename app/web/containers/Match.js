import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import { Alert } from '../elements';
import { Answer, LastAnswer, MatchStatus } from '../components';
import MatchHeader from '../containers/MatchHeader';
import classnames from 'classnames';

class Match extends Component {
		
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

	render() {
		return (
			<div className="match-board-container">
				{this.props.match && this.renderMatch()}
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
		match: state.matches.instances[state.match.id],
		matchAlerts: state.matchAlerts,
		browser: state.browser,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);
