'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import {slide as Menu} from 'react-burger-menu';
import theme from '../../engine/theme';
import { createMatchDrawer } from '../style/drawerStyles';
import renderable from '../hoc/renderable';
import CreateMatch from '../containers/CreateMatch';
import {ListHeader} from '../elements';

class CreateMatchDrawer extends Component {
    
    render() {

        const menuOptions = {
            customBurgerIcon: false,
            customCrossIcon: false,
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
        user: state.user,
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(renderable(CreateMatchDrawer));

