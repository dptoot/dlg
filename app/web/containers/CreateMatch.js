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
	ListHeader, 
} from '../elements';

class CreateMatch extends Component {

	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInputClick = this.handleUserInputClick.bind(this);
		this.handleActorInputClick = this.handleActorInputClick.bind(this);
		this.handleUserSelection = this.handleUserSelection.bind(this);
		this.handleActorSelection = this.handleActorSelection.bind(this);
	}
	
	handleSubmit() {
  		this.props.createMatch();
  		this.props.hideCreateMatch();
  		this.props.clearUserSearchResult();
  		this.props.clearActorSearchResult();
  	}

  	handleUserSelection(user) {
		this.props.selectUserSearchResult(user);
		this.props.hideSearch();
  	}

  	handleActorSelection(actor) {
		this.props.selectActorSearchResult(actor);
		this.props.hideSearch();
  	}
  	

  	handleUserInputClick(user) {
  		this.props.showSearch({
  			collection: 'users', 
  			onSelection: this.handleUserSelection.bind(this),
  		});
  	}

  	handleActorInputClick(actor) {
  		this.props.showSearch({
  			collection: 'actors',
  			onSelection: this.handleActorSelection.bind(this),
  		});
  	}

  	renderSelectedUser() {
  		return (
  			<CreateSelection 
  				title="Selected User"
  				name={this.props.search.users.selected.name}
  				onRemove={this.props.clearUserSearchResult}
  				>
  				<Avatar name={this.props.search.users.selected.name} />
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

  	render() {
		return (
			<div>
				<ListHeader 
					title="Create a Match"
					icon="remove"
					onIconClick={this.props.hideCreateMatch}
					/>
				<div className="padding-horizontal-md padding-vertical-md">
					{this.props.search.users.selected ? this.renderSelectedUser() : this.renderTextInput({
						title: 'Select an Opponent',
						placeholder: 'Enter any user name',
						onInputClick: this.handleUserInputClick,
					})}

					{this.props.search.actors.selected ? this.renderSelectedActor() : this.renderTextInput({
						title: 'Select an Actor',
						placeholder: 'Enter any Actor\'s or Actress\' name',
						onInputClick: (this.handleActorInputClick),
					})}
					
					
					<Button 
						onClick={this.handleSubmit}
						text="Request Match"
						/>
				
				</div>
		</div>
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