'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import {slide as Menu} from 'react-burger-menu';
import enhancedDrawer from '../hoc/enhancedDrawer';
import CreateMatch from '../containers/CreateMatch';

class CreateMatchDrawer extends Component {

    handleStateChange(state) {
        if (!state.isOpen) {
            this.props.unlockBodyScroll();
            this.props.hideCreateMatch();
            this.props.clearSearchSelectedResult('actors');
            this.props.clearSearchSelectedResult('users');
        } else {
            this.props.lockBodyScroll();
        }
    }

    render() {

        const menuOptions = this.getDrawerOptions({
            fullScreen: false,
            isOpen: this.props.layout.showCreateMatch,
            onStateChange: this.handleStateChange.bind(this),
        });

        return (
            <Menu {...menuOptions}>
                <CreateMatch />
            </Menu>
        );
    
    }

}

function mapStateToProps(state) {
    return {
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(enhancedDrawer(CreateMatchDrawer));

