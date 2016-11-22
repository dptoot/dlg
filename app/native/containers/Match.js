import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { mapDispatchToProps } from '../../engine';
import socket from '../lib/websocketConfig';

import {
	Alert,
	View,
	Text,
	Image,
	ListView,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	RefreshControl,
} from 'react-native';
import theme from '../styles/theme';

import {
	Container, 
	ListItem, 
	RemoteImage,
	TextInput,
	LastAnswer,
	MatchTitle,
} from '../components';

class Match extends Component {

	constructor(props) {
		super(props);
		
		this.handleAnswersPress = this.handleAnswersPress.bind(this);
		this.handleSearchFocus = this.handleSearchFocus.bind(this);
		this.handleQuitMatch = this.handleQuitMatch.bind(this);
	}

	componentDidMount() {
		if(this.props.match.id !== this.props.matchId) {
			this.props.fetchMatch(this.props.matchId);
		}

		socket.on('matchupdate', message => {
			
			// Only listen to the users events
			if(message.players.includes(this.props.user.id)) {
			
				// update matches lists for the user
				this.props.fetchMatchesList(this.props.user.id);

				// update current match if it is affected
				if (message.id === this.props.match.id) {
					this.props.fetchMatch(this.props.match.id);
				}
				
			}

		})
	}

	componentDidUpdate (prevProps) {
		if (!prevProps.match.showMatchAlert && this.props.match.showMatchAlert) {
			this.renderMatchAlert();
		}
	}

	handleAnswersPress() {
  		Actions.answersScene();
  	}

  	handleSearchFocus() {
  		Actions.searchScene({
  			searchCollection: 'movies',
  			onSelection: (answer) => {
  				// Remove the search screen
  				Actions.pop();

  				// Process Answer
  				this.props.verifyAnswer(answer);

  				// Clear the search
  				this.props.clearMovieSearchResults();
  				this.props.clearMovieSearchValue();
  			}
  		});
  	}

  	handleQuitMatch() {
  		this.props.quitMatch();
  	}

  	handleRefresh() {
		this.props.refreshMatch(this.props.matchId);
  	}

  	isMatchLoaded() {
  		return this.props.match.id === this.props.matchId;
  	}

  	renderMatchAlert() {

  		const {title, message, buttons} = this.props.match.matchAlert;
  		const defaultButtons = [
			{
				text: 'OK', 
				onPress: () => {
					this.props.hideMatchAlert();
          		},
			}
        ]
  		return Alert.alert(
			title,
			message,
			buttons || defaultButtons
		)
  	}

  	renderSearch() {

  		return (
  			<Container 
  				expand={false} 
  				padding="sm" 
				style={{backgroundColor: theme.colors.grayDark}}
				>
				<TextInput
					onFocus={this.handleSearchFocus}
					placeholder={`Guess a ${this.props.match.actor.name} Movie`}
				/>
			</Container>
		);
  	}

  	renderRefreshControl() {
  		return (
  			<RefreshControl
	            refreshing={this.props.match.isRefreshing}
	            onRefresh={this.handleRefresh.bind(this)}
	            title="Refreshing Match"
          />
  		);
  	}

  	renderMatch() {
  		
		return (
			<Container alignItems="stretch">

				<ScrollView 
					refreshControl={this.renderRefreshControl()}
					contentContainerStyle={styles.scrollView}
					>
					<Container alignItems="stretch">
						<MatchTitle match={this.props.match} />

						{this.props.match.lastAnswer && <LastAnswer answer={this.props.match.lastAnswer} />}
						
						<Container alignItems="stretch">
			        		<ListItem 
			        			onPress={this.handleAnswersPress.bind(this)}
								icon="chevron-right"
								>
								<Text>Answers</Text>
							</ListItem>
							<ListItem 
			        			onPress={this.handleAnswersPress.bind(this)}
								icon="chevron-right"
								>
								<Text>Your stats against {this.props.match.opponent.user.name}</Text>
							</ListItem>
							<ListItem 
			        			onPress={this.handleQuitMatch.bind(this)}
								icon="remove"
								>
								<Text>Quit this match</Text>
							</ListItem>

						</Container>
					</Container>
				
				</ScrollView>
				{this.props.match.showSearch && this.renderSearch()}
			</Container>
		)
	}

	render() {
		return this.isMatchLoaded() ? this.renderMatch(): <ActivityIndicator animating={true} />;
	}
}

var styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	}
});


function mapStateToProps(state) {
	return {
		user: state.user,
		match: state.match,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);