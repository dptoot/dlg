'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import Icon from 'react-fontawesome';
import {slide as Menu} from 'react-burger-menu';
import theme from '../../engine/theme';
import { matchesDrawer } from '../style/drawerStyles';
import renderable from '../hoc/renderable';
import Matches from '../containers/Matches';
import {ListHeader} from '../elements';

class MatchesDrawer extends Component {
    
    render() {

        const menuOptions = {
            customBurgerIcon: false,
            customCrossIcon: false,
            width: this.props.browser.width,
            isOpen: this.props.layout.showMatches,
            styles: matchesDrawer,
            pageWrapId: 'page-wrap',
            outerContainerId: 'outer-container',
            onStateChange: state => {
                if (!state.isOpen) {
                    this.props.hideMatches();
                }
            }
        }

        return (
            <Menu {...menuOptions}>
                <ListHeader 
                    title="Matches" 
                    icon="remove"
                    onIconClick={this.props.hideMatches}
                    />
                <Matches
                    onMatchClick={this.props.hideMatches}
                />
            </Menu>
        );
    
    }

}

MatchesDrawer.defaultProps = {

}

function mapStateToProps(state) {
    return {
        user: state.user,
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(renderable(MatchesDrawer));

