'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';


class ListHeader extends Component {

    render() {
        return (
            <div
                className="list-header"
               >
                {this.props.title}
                {this.props.icon && <Icon name={this.props.icon} onClick={this.props.onIconClick} />}
            </div>
        );
    }

}

ListHeader.defaultProps = {

}

export default ListHeader;


