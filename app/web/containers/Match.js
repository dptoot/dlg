import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import { Answer, LastAnswer, MatchStatus } from '../components';
import Search from '../containers/Search';
import MatchHeader from '../containers/MatchHeader';
import {Modal} from 'react-overlays';
import socket from '../webSocket';

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
		socket.on('matchupdate', message => {
			// Update match if the message includes the user id and the match is loaded
			if(message.players.includes(this.props.user.id) && message.id === this.props.match.id) {
				this.props.fetchMatch(this.props.match.id);
			}
		})
	}
	
	handleToggleSearch() {
		this.setState({
			showSearch: !this.state.showSearch,
		})
	}

	handleSearchSelection(answer) {
		this.handleToggleSearch();
		this.props.verifyAnswer(answer);
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
		return (
			<div className="match-board">
				<MatchHeader 
					match={this.props.match} 
					onSearchClick={this.handleToggleSearch} 
					/>

				<div className="flex">	
					<LastAnswer 
						rendered={this.props.match.lastAnswer}
						className="flex-grow margin-horizontal-lg margin-collapse-left"
						answer={this.props.match.lastAnswer} 
						/>

					<MatchStatus 
						className="flex-grow"
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
				{this.props.match.id ? this.renderMatch() : this.renderPlaceholder()}
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
		match: state.match,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);
