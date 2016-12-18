import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import classnames from 'classnames';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

import {
	Button, 
	ButtonToolbar, 
    ListView,
    ListHeader,
} from '../elements';

class MatchChat extends Component {

	constructor(props) {
		super(props);
		
		this.handleChatInputValueChange = this.handleChatInputValueChange.bind(this);
		this.handleChatInputKeyDown = this.handleChatInputKeyDown.bind(this);
		// this.handleChatInputFocus = this.handleChatInputFocus.bind(this);
	}

	componentDidUpdate() {
		scroll.scrollToBottom({
			containerId: 'chatHistory'
		});
	}

	// handleChatInputFocus(event) {
	// 	this.props.clearMatchChatInputValue();
	// } 

  	handleChatInputKeyDown(event) {
  		if (event.key == 'Enter' && this.props.match.chat.value !== ''){
  			
  			this.props.submitChatMessage();
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

		return !this.props.match.isInitialState && (
			<div className="match-chat">
				<div className="match-chat-wrapper">

					<ListHeader
						title="Match Chat" 
						icon="remove"
						onIconClick={this.props.hideMatchChat}
						/>
					
					<ListView
						id="chatHistory"
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