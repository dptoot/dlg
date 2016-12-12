import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import socket from '../websocket';
import classnames from 'classnames';
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

  	renderChatItem(item, index) {
  		const bubbleClasses = classnames({
  			'chat-bubble': true,
  			'user': this.props.user.id === item.user,
  			'opponent': this.props.user.id !== item.user,
  		});

  		return (
  			<div 
  				key={index} 
  				className={bubbleClasses}
  				>
  				<div>{item.message}</div>
  				<div className="chat-bubble-timestamp">{item.timestamp}</div>
  			</div>
  		);
  	}

	render() {

		const containerClasses = classnames({
			'match-chat': true,
			'closed': !this.props.match.chat.showMatchChat,
		})

		return !this.props.match.isInitialState && (
			<div className={containerClasses}>
				<div className="match-chat-wrapper">

					<div className="match-chat-title">Chat</div>
					
					<ListView
		  				className="chat-history"
						dataSource={this.props.match.chat.history}
						renderRow={this.renderChatItem.bind(this)}
			        />
					
					<div className="match-chat-input-container">
						<input 
							autoFocus
							value={this.props.match.chat.value}
							onChange={this.handleChatInputValueChange}
							onKeyDown={this.handleChatInputKeyDown}
							placeholder="Enter a message"
							/>
					</div>
				</div>
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