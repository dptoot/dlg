'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps, storage} from '../../engine';

import { 
    Avatar,
} from '../elements';

import Icon from 'react-fontawesome';


class Header extends Component {

    render() {
        return (
            <header>
    	
        		<Avatar 
                    name={this.props.user.name} 
                    onClick={this.props.openDrawer}
                    />
        		
            </header>
        );
    }

}

Header.defaultProps = {

}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


