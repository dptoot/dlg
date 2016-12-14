import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import classnames from 'classnames';
import renderable from '../hoc/renderable';
import MatchChat from '../containers/MatchChat';

class MatchChatColumn extends Component {

	render() {

		const containerClasses = classnames({
			'match-chat-column': true,
			'closed': !this.props.showMatchChatColumn,
		});

		return (
			<div className={containerClasses}>
				<MatchChat />
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		showMatchChatColumn: state.layout.showMatchChat,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchChatColumn);