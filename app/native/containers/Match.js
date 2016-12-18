import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { mapDispatchToProps } from '../../engine';

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
	AlertBox,
	AlertButton,
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
	}

	componentDidMount() {
		if(this.props.match.id !== this.props.matchId) {
			this.props.fetchMatch(this.props.matchId);
		}
	}

	componentDidUpdate (prevProps) {
		if (!prevProps.match.showMatchAlert && this.props.match.showMatchAlert) {
			this.renderMatchAlert();
		}
	}

	isMatchActive() {
		return this.props.match.status === 'active';
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

  	handleRefresh() {
		this.props.refreshMatch(this.props.matchId);
  	}

  	isMatchLoaded() {
  		return this.props.match.id === this.props.matchId;
  	}

  	renderMatchAlert() {
  		return Alert.alert(
			this.props.match.matchAlert.title,
			this.props.match.matchAlert.message,
			[{
				text: 'OK', 
				onPress: () => this.props.hideMatchAlert(),
			}]
		)
  	}

  	renderSearch() {
  		return (
  			<Container 
  				rendered={this.props.match.showSearch}
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
								<Text>Your stats against {this.props.match.players.opponent.user.name}</Text>
							</ListItem>
							<ListItem
								rendered={this.isMatchActive()} 
			        			onPress={() => this.props.showQuitMatchAlert()}
								icon="remove"
								>
								<Text>Quit this match</Text>
							</ListItem>

						</Container>
					</Container>
				
				</ScrollView>

				{this.renderSearch()}
				
				<AlertBox
					show={this.props.match.showQuitMatchAlert}
					onHide={this.props.hideQuitMatchAlert}
	  				title="Quit Match"
	  				message="Are you sure you want to give up?"
	  				>
  					<AlertButton text="Yes" onPress={() => this.props.deactivateMatch('resign')} />
  					<AlertButton text="No" />
	  			</AlertBox>
				
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