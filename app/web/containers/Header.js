'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import Icon from 'react-fontawesome';
import {mapDispatchToProps, storage} from '../../engine';

import { 
    Avatar,
} from '../elements';

class Header extends Component {

    renderMatchesSidebarTrigger() {
        return (
            <Icon name="bars" className="text-xlg text-gray" onClick={this.props.showMatches} />
        );
    }

    render() {
        return (
            <header>
                <div>
                    {this.props.browser.lessThan.medium && this.renderMatchesSidebarTrigger()}
    	        </div>
        		<Icon 
                    name="user"
                    className="text-xlg text-gray"
                    onClick={this.props.showUserDrawer}
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
        browser: state.browser,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


