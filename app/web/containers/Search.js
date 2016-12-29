import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import {
    RemoteSearchItem,
    UserSearchItem,
} from '../components';

import {
	Button, 
	ButtonToolbar, 
    ListView,
    Input,
} from '../elements';

class Search extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			dataSource: [],
		}
		
		this.handleSearchChangeText = this.handleSearchChangeText.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.search[this.props.search.collection].results !== nextProps.search[nextProps.search.collection].results) {
			this.setState({
				dataSource: nextProps.search[nextProps.search.collection].results
			})
		}
  	}

  	getPlaceholder() {
  		switch(this.props.search.collection) {
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


	handleSearchChangeText(event) {
		const value = event.target.value;

		if (value !== '') {
			this.props.fetchSearch(this.props.search.collection, value);
		} else {
			this.props.clearSearchInputValue(this.props.search.collection);
		}
  	}

  	renderListItem(item) {

  		switch(this.props.search.collection) {
  			case 'movies':
  				return (
		  			<RemoteSearchItem
		  				key={item.id} 
		  				item={item} 
		  				onClick={this.props.onSelection.bind(null, item)}
		  				/>
		  		)
  				break;
  			case 'users':
  				return (
		  			<UserSearchItem
		  				key={item.id} 
		  				item={item} 
		  				onClick={this.props.onSelection.bind(null, item)}
		  				/>
		  		)
  				break;
  			case 'actors':
  				return (
		  			<RemoteSearchItem
		  				key={item.id} 
		  				item={item} 
		  				onClick={this.props.onSelection.bind(null, item)}
		  				/>
		  		)
  				break;
  		}

  	}

  	renderResultsList() {
  		return (
  			<ListView
  				className="search-results"
				dataSource={this.state.dataSource}
				renderRow={this.renderListItem}
	        />
  		);
  	}

  	renderRandomSearch() {
  		return this.props.search.collection === 'actors' && (
  			<ButtonToolbar className="flex flex-centered margin-vertical-lg margin-collapse-top">
	  			<Button 
					type="secondary" 
					text="Find Random Actors" 
					onClick={this.props.fetchRandomActorSearch} 
					/>
			</ButtonToolbar>
  		);
  	}

  	renderNoResults() {
  		
  		return (
  			<div className="no-results-placeholder">
  				<div>No Results Found</div>
			</div>
  		)
  	}

	render() {
		return (
			<div className="search-wrapper">
				<div className="search-header">
					<Input 
						autoFocus
						value={this.props.search[this.props.search.collection].value} 
						onChange={this.handleSearchChangeText}
						placeholder={this.getPlaceholder()}
						/>
				</div>

				{this.renderRandomSearch()}
				
				{this.state.dataSource.length > 0 ? this.renderResultsList() : this.renderNoResults()}
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		user: state.user,
		search: state.search,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);