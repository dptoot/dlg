import React, {Component} from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import {
	ListView,
    RemoteSearchItem,
    UserSearchItem,
} from '../components';

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
		if (this.props.search[this.props.searchCollection].results !== nextProps.search[nextProps.searchCollection].results) {
			this.setState({
				dataSource: nextProps.search[nextProps.searchCollection].results
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


	handleSearchChangeText(event) {
		const value = event.target.value;

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
		  			<RemoteSearchItem 
		  				item={data} 
		  				onClick={this.props.onSelection.bind(null, data)}
		  				/>
		  		)
  				break;
  			case 'users':
  				return (
		  			<UserSearchItem 
		  				item={data} 
		  				onClick={this.props.onSelection.bind(null, data)}
		  				/>
		  		)
  				break;
  			case 'actors':
  				return (
		  			<RemoteSearchItem 
		  				item={data} 
		  				onClick={this.props.onSelection.bind(null, data)}
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
					<input 
						autoFocus
						value={this.props.search[this.props.searchCollection].value} 
						onChange={this.handleSearchChangeText}
						placeholder={this.getPlaceholder()}
						/>
				</div>
				
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