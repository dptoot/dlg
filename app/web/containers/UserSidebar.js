'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import Sidebar from 'react-sidebar';
import theme from '../../engine/theme';

import { 
    Alert,
    RemoteImage,
    Button,
} from '../elements';



class UserSidebar extends Component {

    renderSidebar() {
        return ( 
            <div className="sidebar">
                <div className="header">
                    Logged in as: {this.props.user.name}
                </div>
                <Button 
                    className="text-gray"
                    type="link"
                    onClick={this.props.logoutUser}
                    text="Logout"
                    />
            </div>    
        );
    }

    render() {

        return (
          <Sidebar sidebar={this.renderSidebar()}
                   open={this.props.drawer.open}
                   onSetOpen={this.props.closeDrawer}
                   pullRight
                   styles={{
                        sidebar: {
                            zIndex: 102,
                            width: '20%',
                            background: theme.light,
                        },
                        overlay: {
                            zIndex: 101,
                            backgroundColor: 'rgba(0,0,0,.6)',
                        },
                        dragHandle: {
                            zIndex: 101,
                        }
                   }}
                   >
            {this.props.children}
          </Sidebar>
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

