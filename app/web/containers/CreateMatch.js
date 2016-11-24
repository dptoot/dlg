import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { mapDispatchToProps } from '../../engine';
import Header from './Header';

import {
	SearchModal,
	CreateSelection,
	CreateMatchInput,
} from '../components';

import {
	Card,
	CenteredWrapper,
	RemoteImage,
	Avatar,
	Button,
} from '../elements';

class CreateMatch extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			showUserSearch: false,
			showActorSearch: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCloseSearch = this.handleCloseSearch.bind(this);
		this.handleUserSearchInputClick = this.handleUserSearchInputClick.bind(this);
		this.handleActorSearchInputClick = this.handleActorSearchInputClick.bind(this);
	}
	
	handleSubmit() {
  		this.props.createMatch();
  		this.props.clearUserSearchResult();
  		this.props.clearActorSearchResult();
  		browserHistory.push('/lastManStanton');
  	}

  	handleCloseSearch() {
  		this.setState({
  			showUserSearch: false,
  			showActorSearch: false,
  		})
  	}

  	handleUserSearchInputClick() {
  		this.setState({
  			showUserSearch: true,
  		});
  	}

  	handleActorSearchInputClick() {
  		this.setState({
  			showActorSearch: true,
  		});
  	}

  	renderSelectedUser() {
  		return (
  			<CreateSelection 
  				title="Selected User"
  				name={this.props.search.users.selected.name}
  				onRemove={this.props.clearUserSearchResult}
  				>
  				<Avatar text={this.props.search.users.selected.name.slice(0,1).toUpperCase()} />
			</CreateSelection>
		); 
  	}

  	renderSelectedActor() {
  		return (
			<CreateSelection 
  				title="Selected Actor"
  				name={this.props.search.actors.selected.name}
  				onRemove={this.props.clearActorSearchResult}
  				>
  				<RemoteImage 
                    path={this.props.search.actors.selected.imagePath} 
                    width={92}
                    />
			</CreateSelection>
  			
		); 
  	}

  	renderTextInput(props) {
  		return <CreateMatchInput {...props} />;
  	}

  	renderUserSearch() {
		return (
			<SearchModal 
				show={this.state.showUserSearch}
				searchCollection="users"
				onSelection={user => {
					// Close the modal
	  				this.handleCloseSearch();
	  				
	  				// Store Result
	  				this.props.selectUserSearchResult(user);

	  				// Clear the search
	  				this.props.clearUserSearchResults();
	  				this.props.clearUserSearchValue();
	  			
				}}
				onClose={this.handleCloseSearch}
				/>
			);
	}

  	renderActorSearch() {
		return (
			<SearchModal 
				show={this.state.showActorSearch}
				searchCollection="actors"
				onSelection={actor => {
					// Close the modal
	  				this.handleCloseSearch();
	  				
	  				// Store Result
	  				this.props.selectActorSearchResult(actor);

	  				// Clear the search
	  				this.props.clearActorSearchResults();
	  				this.props.clearActorSearchValue();
	  			
				}}
				onClose={this.handleCloseSearch}
				/>
			);
	} 

  	render() {
		return (
			<CenteredWrapper>
				<Card 
					containerClassName="width-50"
					title="Create Match"
					vertical
					>
				{this.props.search.users.selected ? this.renderSelectedUser() : this.renderTextInput({
					title: 'Select an Opponent',
					placeholder: 'Enter any user name',
					onInputClick: this.handleUserSearchInputClick,
				})}

				{this.props.search.actors.selected ? this.renderSelectedActor() : this.renderTextInput({
					title: 'Select an Actor',
					placeholder: 'Enter any Actor\'s or Actress\' name',
					onInputClick: (this.handleActorSearchInputClick),
				})}
				
				
				<Button 
					onClick={this.handleSubmit}
					text="Request Match"
					/>

				</Card>
				
				{/*	Search Modals */}
				{this.renderActorSearch()}
				{this.renderUserSearch()}
			</CenteredWrapper>
		)
	}
}




function mapStateToProps(state) {
	return {
		search: state.search,
		user: state.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMatch);