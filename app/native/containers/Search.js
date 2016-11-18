import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { mapDispatchToProps } from '../../engine';

import {
	View,
	Text,
	Image,
	ListView,
	ScrollView,
	StyleSheet,
} from 'react-native';
import theme from '../styles/theme';

import {
	Container, 
	ListItem, 
	RemoteImage,
	TextInput,
	RemoteListItem,
	UserListItem,
} from '../components';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dataSource: ds.cloneWithRows(props.search[props.searchCollection].results)
		};

		this.renderListItem = this.renderListItem.bind(this);
		this.handleSearchChangeText = this.handleSearchChangeText.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.search[this.props.searchCollection].results !== nextProps.search[nextProps.searchCollection].results) {
			this.setState({
				dataSource: ds.cloneWithRows(nextProps.search[nextProps.searchCollection].results)
			})
		}
  	}

  	getPlaceholder() {
  		switch(this.props.searchCollection) {
  			case 'movies':
  				return 'Enter a movie title'
  				break;
  			case 'users':
  				return 'Enter a user name'
  				break;
  			case 'actors':
  				return 'Enter an actor name'
  				break;
  		}
  	}

	handleSearchChangeText(value) {
		if (value) {
			this.props.fetchSearch(this.props.searchCollection, value);
		} else {
			switch(this.props.searchCollection) {
				case 'movies': 
					this.props.clearMovieSearchValue();
					break;
				case 'users': 
					this.props.clearUserSearchValue();
					break;
				case 'actors': 
					this.props.clearActorSearchValue();
					break;
			}
			
		}
  	}

  	renderListItem(data) {

  		switch(this.props.searchCollection) {
  			case 'movies':
  				return (
		  			<RemoteListItem 
		  				item={data} 
		  				onPress={this.props.onSelection.bind(null, data)}
		  				/>
		  		)
  				break;
  			case 'users':
  				return (
		  			<UserListItem 
		  				user={data} 
		  				onPress={this.props.onSelection.bind(null, data)}
		  				/>
		  		)
  				break;
  			case 'actors':
  				return (
		  			<RemoteListItem 
		  				item={data} 
		  				onPress={this.props.onSelection.bind(null, data)}
		  				/>
		  		)
  				break;
  		}

  	}

  	renderResultsList() {
  		return (
  			<ListView
    			enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={this.renderListItem.bind(this)}
	        />
  		);
  	}

  	renderNoResults() {
  		
  		return (
  			<Container centered>
  				<Text style={styles.noResultsText}>No Results Found</Text>
			</Container>
  		)
  	}

	render() {
		return (
			<Container alignItems="stretch">
				<View style={styles.navBar}>
					<View>
						<TextInput 
							autoFocus
							value={this.props.search[this.props.searchCollection].value} 
							onChangeText={this.handleSearchChangeText}
							placeholder={this.getPlaceholder()}
							/>
					</View>
				</View>
				{this.state.dataSource.getRowCount() > 0 ? this.renderResultsList() : this.renderNoResults()}
			</Container>
		)
	}
}

var styles = StyleSheet.create({
	container:{

	},
	navBar: {
		backgroundColor: theme.colors.grayDark,
		padding: theme.padding.sm,
		paddingTop: theme.padding.md,
	},
	noResultsText: {
		color: theme.colors.grayLight,
	}
});


function mapStateToProps(state) {
	return {
		user: state.user,
		search: state.search,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);