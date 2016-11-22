import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import { MatchHeader, Answer } from '../components';
import Search from '../containers/Search';
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
		this.props.verifyAnswer(answer.id);
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
			<div>

				<MatchHeader 
					match={this.props.match} 
					onSearchClick={this.handleToggleSearch} 
					/>
					
				<div className="item-grid">
					{this.props.match.answers.map(answer => <Answer key={answer.id} answer={answer} />)}
				</div>
				
			</div>
		)
	}

	renderPlaceholder() {
		return (
			<div className="centered">
				<div>No match</div>
			</div>
		);
	}

	render() {
		return (
			<div className="match-board">
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
