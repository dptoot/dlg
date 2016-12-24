'use strict';

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../engine';
import {slide as Menu} from 'react-burger-menu';
import { createMatchDrawer } from '../style/drawerStyles';
import enhancedDrawer from '../hoc/enhancedDrawer';
import Search from '../containers/Search';
import ListHeader from '../elements/ListHeader';

class SearchDrawer extends Component {

    handleStateChange(state) {
        if (!state.isOpen) {
            this.props.unlockBodyScroll();
            this.props.hideSearch();
        } else {
            this.props.lockBodyScroll();
        }
    }

    renderSearch() {
        return this.props.search.collection && (
            <Search 
                searchCollection={this.props.search.collection}
                onSelection={this.props.search.onSelection}
                />
        );
    }

    render() {

        const menuOptions = this.getDrawerOptions({
            width: '100%',
            isOpen: this.props.search.showSearch,
            styles: createMatchDrawer,
            onStateChange: this.handleStateChange.bind(this),
        });

        return (
            <Menu {...menuOptions}>
                <ListHeader 
                    icon="remove"
                    onIconClick={this.props.hideSearch}
                    />
                {this.renderSearch()}
            </Menu>
        );
    
    }

}

function mapStateToProps(state) {
    return {
        browser: state.browser,
        search: state.search,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(enhancedDrawer(SearchDrawer));

