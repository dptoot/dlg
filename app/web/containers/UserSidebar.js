'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import {bubble as Menu} from 'react-burger-menu';
import theme from '../../engine/theme';
import { userDrawer } from '../style/drawerStyles';

import { 
    Alert,
    RemoteImage,
    Button,
} from '../elements';

class UserSidebar extends Component {
    
    render() {

        const menuOptions = {
            customBurgerIcon: false,
            isOpen: this.props.layout.showUserDrawer,
            styles: userDrawer,
            right: true,
            pageWrapId: 'page-wrap',
            outerContainerId: 'outer-container',
            onStateChange: state => {
                if (!state.isOpen) {
                    this.props.hideUserDrawer();
                }
            }
        }

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

UserSidebar.defaultProps = {

}

function mapStateToProps(state) {
    return {
        user: state.user,
        layout: state.layout,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSidebar);

