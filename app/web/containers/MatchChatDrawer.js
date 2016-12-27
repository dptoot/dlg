'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import {push as Menu} from 'react-burger-menu';
import theme from '../../engine/theme';
import enhancedDrawer from '../hoc/enhancedDrawer';
import MatchChat from '../containers/MatchChat';
import {ListHeader} from '../elements';

class MatchChatDrawer extends Component {

    handleStateChange(state) {
        if (!state.isOpen) {
            this.props.unlockBodyScroll();
            this.props.hideMatchChat();
        } else {
            this.props.lockBodyScroll();
        }
    }
    
    render() {

        const menuOptions = this.getDrawerOptions({
            isOpen: this.props.layout.showMatchChat,
            styles: matchChatDrawer,
            right: true,
            onStateChange: this.handleStateChange,
        });

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

export default connect(mapStateToProps, mapDispatchToProps)(enhancedDrawer(MatchChatDrawer));

