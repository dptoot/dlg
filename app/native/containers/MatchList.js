import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { mapDispatchToProps } from '../../engine';
import Swipeout from 'react-native-swipeout';

import {
	Alert,
	View,
	Text,
	Image,
	ListView,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from 'react-native';

import { 
	MatchListItem, 
	Container,
	Button,
	} from '../components';

import theme from '../styles/theme';


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class MatchesList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: ds.cloneWithRows(this.getMatchesList(props.name, props.matches))
		}

		this.handleMatchListPress = this.handleMatchListPress.bind(this);
		this.renderRefreshControl = this.renderRefreshControl.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
	}

	componentDidMount() {
		this.props.fetchMatches(this.props.user.id);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.matches !== nextProps.matches) {
			this.setState({
				dataSource: ds.cloneWithRows(this.getMatchesList(nextProps.name, nextProps.matches))
			})
		}
  	}

  	handleMatchListPress(match) {
  		
		Actions.matchScene({
			matchId: match.id,
		});
			
  	}

  	handleRefresh() {
		this.props.refreshMatches(this.props.user.id);
  	}

	getMatchesList(name, matches) {
		let matchesList;
		
		switch(name) {
			case 'inactiveList':
				matchesList = matches.lists.inactive;
				break;
			case 'currentList':
				matchesList = matches.lists.current;
				break;
			case 'waitingList':
				matchesList = matches.lists.waiting;
				break;
			default:
				matchesList = [];
		}

		return matchesList;	
	}

	

	renderMatchListItem(match) {
		if (this.props.name === 'inactiveList') {
			const swipeoutBtns = [
				{
					text: 'Delete', 
					onPress: this.props.archiveMatch.bind(null, match.id),
					backgroundColor: theme.colors.primary,
					underlayColor: theme.colors.underlay,
				}
			]
			return (
			// Swipeout component
			<Swipeout right={swipeoutBtns} autoClose={true}>
			  <MatchListItem 
				match={match} 
				onPress={this.handleMatchListPress.bind(this, match)}
				/>
			</Swipeout>
			);
		}


		return (
			<MatchListItem 
				match={match} 
				onPress={this.handleMatchListPress.bind(this, match)}
				/>
		);
	}

	renderListView() {
		return (
			<ListView
					refreshControl={this.renderRefreshControl()}
        			enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={this.renderMatchListItem.bind(this)}
		        />
		);
	}

	renderNoItems() {

		const copy = {
			current: 'It is not your turn in any current matches',
			waiting: 'You are not waiting on anyone to take a turn',
			inactive: 'You have no completed matches',
		}

		return (
			<ScrollView 
				refreshControl={this.renderRefreshControl()} 
				contentContainerStyle={styles.scrollView}
				>
				<Container centered>
					<Text style={styles.noResultsText}>{copy[this.props.matchDataType]}</Text>
				</Container>
			</ScrollView>
		);
	}

	renderRefreshControl() {
  		return (
  			<RefreshControl
	            refreshing={this.props.matches.isRefreshing}
	            onRefresh={this.handleRefresh.bind(this)}
	            title="Refreshing Matches"
          />
  		);
  	}

	render() {

		return (
			<Container alignItems="stretch">
				{this.state.dataSource.getRowCount() > 0 ? this.renderListView() : this.renderNoItems()}
			</Container>
		)
	}
}

var styles = StyleSheet.create({
    noResultsText: {
        color: theme.colors.grayLight
    }, 
    scrollView: {
		flex: 1,
	}
});

function mapStateToProps(state) {
	return {
		matches: state.matches,
		user: state.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesList);