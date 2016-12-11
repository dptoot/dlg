import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import socket from '../websocket';
import {

} from '../components';

import {
	Button, 
	ButtonToolbar, 
    ListView,
} from '../elements';

class MatchChat extends Component {

	constructor(props) {
		super(props);
		
		
		
		this.handleChatInputValueChange = this.handleChatInputValueChange.bind(this);
		this.handleChatInputKeyDown = this.handleChatInputKeyDown.bind(this);
	}

  	handleChatInputKeyDown(event) {
  		if (event.key == 'Enter' && this.props.match.chat.value !== ''){
  			
  			// Send chat data to server via websockets
  			socket.emit('chatMessage', {
  				matchId: this.props.match.id,
  				user: this.props.user.id,
  				message: this.props.match.chat.value,
  				timestamp: Date.now(), 
  			});

  			this.props.clearMatchChatInputValue();
  		}
  	}

  	
	handleChatInputValueChange(event) {
		const value = event.target.value;

		if (value) {
			this.props.updateMatchChatInputValue(value);
		} else {
			this.props.clearMatchChatInputValue()
		}
  	}

  	renderChatItem(item) {
  		return (
  			<div>{item.message}</div>
  		);
  	}

  	renderChatHistory() {
  		return (
  			<ListView
  				className="chat-history"
				dataSource={this.props.match.chat.history}
				renderRow={this.renderChatItem}
	        />
  		);
  	}

	render() {
		return (
			<div className="match-chat">
				<div className="title-bar">Chat</div>
				{this.renderChatHistory()}
				<input 
					autoFocus
					value={this.props.match.chat.value}
					onChange={this.handleChatInputValueChange}
					onKeyDown={this.handleChatInputKeyDown}
					placeholder=""
					/>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		user: state.user,
		match: state.match,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchChat);