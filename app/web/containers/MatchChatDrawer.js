'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import {push as Menu} from 'react-burger-menu';
import theme from '../../engine/theme';
import { matchChatDrawer } from '../style/drawerStyles';
import renderable from '../hoc/renderable';
import MatchChat from '../containers/MatchChat';
import {ListHeader} from '../elements';

class MatchChatDrawer extends Component {
    
    render() {

        const menuOptions = {
            customBurgerIcon: false,
            customCrossIcon: false,
            width: this.props.browser.width,
            isOpen: this.props.layout.showMatchChat,
            styles: matchChatDrawer,
            right: true,
            pageWrapId: 'page-wrap',
            outerContainerId: 'outer-container',
            onStateChange: state => {
                if (!state.isOpen) {
                    this.props.hideMatchChat();
                }
            }
        }

        return (
            <Menu {...menuOptions}>
                <MatchChat />
            </Menu>
        );
    
    }

}

MatchChatDrawer.defaultProps = {

}

function mapStateToProps(state) {
    return {
        user: state.user,
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(renderable(MatchChatDrawer));

