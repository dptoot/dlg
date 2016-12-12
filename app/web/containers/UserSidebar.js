'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import {bubble as Menu} from 'react-burger-menu';
import theme from '../../engine/theme';

import { 
    Alert,
    RemoteImage,
    Button,
} from '../elements';

class UserSidebar extends Component {

    getMenuStyles() {
        return {
            bmBurgerButton: {
                display: 'none'
              },
              bmBurgerBars: {
                display: 'none',
              },
              bmCrossButton: {
                height: '24px',
                width: '24px',
                cursor: 'pointer',
              },
              bmCross: {
                background: theme.light,
              },
              bmMenuWrap: {
                zIndex: 1001,
              },
              bmMenu: {
                background: theme.grayDark,
                padding: theme.paddingLarge,
                fontSize: '1em'
              },
              bmMorphShape: {
                fill: theme.grayDark,
              },
              bmItemList: {
                color: theme.light,
                padding: '1em'
              },
              bmOverlay: {
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.7)'
              }
        }
    }

 

    render() {

        const menuOptions = {
            isOpen: this.props.drawer.open,
            styles: this.getMenuStyles(),
            right: true,
            pageWrapId: 'page-wrap',
            outerContainerId: 'outer-container',
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
        drawer: state.drawer,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSidebar);

