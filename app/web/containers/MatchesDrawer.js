'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import {slide as Menu} from 'react-burger-menu';
import { matchesDrawer } from '../style/drawerStyles';
import enhancedDrawer from '../hoc/enhancedDrawer';
import Matches from '../containers/Matches';
import {ListHeader} from '../elements';

class MatchesDrawer extends Component {
    
    handleStateChange(state) {
        if (!state.isOpen) {
            this.props.unlockBodyScroll();
            this.props.hideMatches();
        } else {
            this.props.lockBodyScroll();
        }
    }

    render() {

        const menuOptions = this.getDrawerOptions({
            width: '100%',
            isOpen: this.props.layout.showMatches,
            styles: matchesDrawer,
            onStateChange: this.handleStateChange.bind(this),
        });

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

function mapStateToProps(state) {
    return {
        layout: state.layout,
        browser: state.browser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(enhancedDrawer(MatchesDrawer));

