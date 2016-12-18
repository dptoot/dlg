'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import {bubble as Menu} from 'react-burger-menu';
import { userDrawer } from '../style/drawerStyles';
import enhancedDrawer from '../hoc/enhancedDrawer';


import { 
    Alert,
    RemoteImage,
    Button,
} from '../elements';

class UserDrawer extends Component {

    handleStateChange(state) {
        if (!state.isOpen) {
            this.props.hideUserDrawer();
        }
    }
    
    render() {

        const menuOptions = this.getDrawerOptions({
            width: '30%',
            isOpen: this.props.layout.showUserDrawer,
            styles: userDrawer,
            right: true,
            onStateChange: this.handleStateChange.bind(this)
        });

        return (
            <Menu {...menuOptions}>
                <div className="header">
                    Logged in as: {this.props.user.name}
                </div>
                <div>
                    <Button 
                        className="text-gray"
                        type="link"
                        onClick={this.props.logoutUser}
                        text="Logout"
                        />
                </div>
            </Menu>
        );
    
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(enhancedDrawer(UserDrawer));

