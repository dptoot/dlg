import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import { Alert } from '../elements';
import { Answer, LastAnswer, MatchStatus } from '../components';
import Search from '../containers/Search';
import MatchHeader from '../containers/MatchHeader';
import MatchChat from '../containers/MatchChat';
import Sidebar from 'react-sidebar';
import {Modal} from 'react-overlays';
import socket from '../websocket';

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
		return (
			<Sidebar
				pullRight
				sidebar={<MatchChat />}
				docked={this.props.match.chat.showMatchChat}
				open={false}
				onSetOpen={this.props.toggleMatchChatSidebar}	
				styles={this.getMatchChatStyles()}	
				>
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
			</Sidebar>
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
