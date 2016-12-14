import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import classnames from 'classnames';
import renderable from '../hoc/renderable';
import Matches from '../containers/Matches';

class MatchesColumn extends Component {

	render() {

		const containerClasses = classnames({
			'matches-column': true,
			'closed': !this.props.showMatches,
		});

		return (
			<div className={containerClasses}>
				<Matches />
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		showMatchesColumn: state.layout.showMatchChat,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(renderable(MatchesColumn));