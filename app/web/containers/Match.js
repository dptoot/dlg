import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import { Alert } from '../elements';
import { Answer, LastAnswer, MatchStatus } from '../components';
import Search from '../containers/Search';
import MatchHeader from '../containers/MatchHeader';
import MatchChat from '../containers/MatchChat';
import {Modal} from 'react-overlays';
import socket from '../websocket';
import classnames from 'classnames';

class Match extends Component {

	constructor() {
		super();

		this.state = {
			showSearch: false,
		}

		this.handleToggleSearch = this.handleToggleSearch.bind(this);
		this.handleSearchSelection = this.handleSearchSelection.bind(this);
	}

	componentDidMount() {
		// this.props.fetchMatch(this.props.match.id);
	}

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
	
	handleToggleSearch() {
		this.setState({
			showSearch: !this.state.showSearch,
		})
	}

	handleSearchSelection(answer) {
		this.handleToggleSearch();
		this.props.clearMovieSearchValue();
		this.props.verifyAnswer(answer);
	}

	renderMatchAlert() {
		
		return (
			<Alert
				show={this.props.match.showMatchAlert}
				onHide={this.props.hideMatchAlert}
				title={this.props.match.matchAlert.title}
				message={this.props.match.matchAlert.message}
				/>
		)
	}

	renderSearch() {
		return (
			<Modal
	          aria-labelledby='modal-label'
	          className="search-modal"
	          backdropClassName="search-backdrop"
	          show={this.state.showSearch}
	          onHide={this.handleToggleSearch}
	        >
	        	<div className="search-dialog">
					<Search 
						searchCollection="movies"
						onSelection={this.handleSearchSelection}
						/>
				</div>
	        </Modal>
			);
	} 
	
	renderMatch() {

		const containerClasses = classnames({
			'flex': this.props.browser.greaterThan.extraSmall,
		})

		return (

			<div className="match-board">
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
				{this.renderSearch()}
				{this.renderMatchAlert()}
				{this.props.match.id ? this.renderMatch() : this.renderPlaceholder()}
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
		match: state.match,
		browser: state.browser,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);
