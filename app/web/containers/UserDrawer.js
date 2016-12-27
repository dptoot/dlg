'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import {bubble as Menu} from 'react-burger-menu';
import enhancedDrawer from '../hoc/enhancedDrawer';


import { 
    Alert,
    RemoteImage,
    Button,
    ListHeader,
} from '../elements';

class UserDrawer extends Component {

    handleStateChange(state) {
        if (!state.isOpen) {
            this.props.unlockBodyScroll();
            this.props.hideUserDrawer();
        } else {
            this.props.lockBodyScroll();
        }
    }
    
    render() {

        const menuOptions = this.getDrawerOptions({
            fullScreen: false,
            isOpen: this.props.layout.showUserDrawer,
            right: true,
            onStateChange: this.handleStateChange.bind(this)
        });

        return (
            <Menu {...menuOptions}>
                <ListHeader title={`Logged in as: ${this.props.user.name}`} />
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

