'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import {slide as Menu} from 'react-burger-menu';
import { createMatchDrawer } from '../style/drawerStyles';
import renderable from '../hoc/renderable';
import CreateMatch from '../containers/CreateMatch';

class CreateMatchDrawer extends Component {

    getDrawerWidth() {
        const percentage = this.props.browser.greaterThan.extraSmall ? .3 : 1;
        return this.props.browser.width * percentage;
    }
    
    render() {

        const menuOptions = {
            customBurgerIcon: false,
            customCrossIcon: false,
            width: this.getDrawerWidth(),
            isOpen: this.props.layout.showCreateMatch,
            styles: createMatchDrawer,
            pageWrapId: 'page-wrap',
            outerContainerId: 'outer-container',
            onStateChange: state => {
                if (!state.isOpen) {
                    this.props.hideCreateMatch();
                    this.props.clearUserSearchResult();
                    this.props.clearActorSearchResult();
                }
            }
        }

        return (
            <Menu {...menuOptions}>
                <CreateMatch />
            </Menu>
        );
    
    }

}

CreateMatchDrawer.defaultProps = {

}

function mapStateToProps(state) {
    return {
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(renderable(CreateMatchDrawer));

