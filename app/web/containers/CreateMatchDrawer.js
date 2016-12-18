'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import {slide as Menu} from 'react-burger-menu';
import { createMatchDrawer } from '../style/drawerStyles';
import enhancedDrawer from '../hoc/enhancedDrawer';
import CreateMatch from '../containers/CreateMatch';

class CreateMatchDrawer extends Component {

    handleStateChange(state) {
        if (!state.isOpen) {
            this.props.hideCreateMatch();
            this.props.clearUserSearchResult();
            this.props.clearActorSearchResult();
        }
    }

    render() {

        const menuOptions = this.getDrawerOptions({
            width: '30%',
            isOpen: this.props.layout.showCreateMatch,
            styles: createMatchDrawer,
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

