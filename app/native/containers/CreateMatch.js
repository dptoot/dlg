import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import { Actions } from 'react-native-router-flux';

import {
	View,
	Text,
	Image,
	StyleSheet,
} from 'react-native';

import theme from '../styles/theme';

import {
	Container, 
	ListItem, 
	RemoteImage,
	TextInput,
	Button,
} from '../components';

class CreateMatch extends Component {

	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserSearchFocus = this.handleUserSearchFocus.bind(this);
		this.handleActorSearchFocus = this.handleActorSearchFocus.bind(this);
	}
	
	handleSubmit() {
  		this.props.createMatch();
  		Actions.pop();
  	}

  	handleUserSearchFocus() {
  		Actions.searchScene({
  			searchCollection: 'users',
  			onSelection: (selection) => {
  				// Remove the search screen
  				Actions.pop();
  				console.log(selection)

  				// Store Result
  				this.props.selectUserSearchResult(selection);

  				// Clear the search
  				this.props.clearUserSearchResults();
  				this.props.clearUserSearchValue();
  			}
  		})
  	}

  	handleActorSearchFocus() {
  		Actions.searchScene({
  			searchCollection: 'actors',
  			onSelection: (selection) => {
  				// Remove the search screen
  				Actions.pop();
  				
  				// Store Result
  				this.props.selectActorSearchResult(selection);

  				// Clear the search
  				this.props.clearActorSearchResults();
  				this.props.clearActorSearchValue();
  			}
  		})
  	}

  	renderSelectedUser() {
  		return (
  			<Container
				style={styles.formRow} 
				expand={false}
				>
				<Text style={styles.label}>Selected Actor</Text>
	  			<Container
                    expand={false}
                    vertical={false}
                    alignItems="center"
                    >
                    <View style={styles.selectedUserAvatarContainer}>
                        <Text style={styles.selectedUserAvatar}>
                            {this.props.search.users.selected.name.slice(0,1).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.selectedNameText}>{this.props.search.users.selected.name}</Text>
                </Container>
			</Container>
		); 
  	}

  	renderSelectedActor() {
  		return (
  			<Container
				style={styles.formRow} 
				expand={false}
				>
				<Text style={styles.label}>Selected Actor</Text>
	  			<Container
                    expand={false}
                    vertical={false}
                    alignItems="center"
                    >
                    <RemoteImage 
                        style={styles.thumb}
                        path={this.props.search.actors.selected.imagePath} 
                        width={92}
                        />
                    <Text style={styles.selectedNameText}>{this.props.search.actors.selected.name}</Text>
                </Container>
			</Container>
		); 
  	}

  	renderTextInput({label, onFocus, placeholder}) {

  		return (
  			<Container
				style={styles.formRow} 
				expand={false}
				>
	  			<Text style={styles.label}>{label}</Text>
				<TextInput 
					placeholder={placeholder}
					onFocus={onFocus}
					/>
			</Container>
		);
  		
  	}

  	render() {
		return (
			<Container 
			style={styles.container}
				alignItems="stretch" 
				padding="sm"
				>
				<Container 
					alignItems="stretch" 
					expand="false"
					>
					{this.props.search.users.selected ? this.renderSelectedUser() : this.renderTextInput({
						label: 'Select an Opponent',
						placeholder: 'Enter any user name',
						onFocus: this.handleUserSearchFocus,
					})}

					{this.props.search.actors.selected ? this.renderSelectedActor() : this.renderTextInput({
						label: 'Select an Actor',
						placeholder: 'Enter any Actor\'s or Actress\' name',
						onFocus: (this.handleActorSearchFocus),
					})}
					
					<Container
						expand={false}
						alignItems="stretch"
						>
						<Button 
							onPress={this.handleSubmit}
							text="Request Match" 
						/>
					</Container>
				</Container>
			</Container>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.grayDarker,
	},
	formRow: {
		borderRadius: theme.border.radius,
		padding: theme.padding.md,
		marginBottom: theme.margin.sm,
		backgroundColor: theme.colors.grayDark,
	},
	label: {
		color: theme.colors.light,
		fontWeight: 'bold',
		fontSize: theme.text.md,
		marginBottom: theme.margin.sm,
	},
    selectedNameText: {
    	color: theme.colors.light,
    	fontSize: theme.text.lg,
    	marginLeft: theme.margin.md,
    },
    selectedUserAvatarContainer: {
        flex:0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 92,
        width: 92,
        borderRadius: 46,
        backgroundColor: theme.colors.primary,
        ...theme.shadow, 
    }, 
    selectedUserAvatar: {
        color: theme.colors.light,
        fontSize: theme.text.xlg,
        fontWeight: "bold",
    },
});


function mapStateToProps(state) {
	return {
		search: state.search,
		user: state.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMatch);