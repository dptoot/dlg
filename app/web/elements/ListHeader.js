'use strict';

import React, { Component } from 'react'
import { RemoteImage } from '../components';
import Icon from 'react-fontawesome';
import classnames from 'classnames';


class ListHeader extends Component {

    render() {

        const containerClasses = classnames({
            'list-header': true,
        }, this.props.className);

        return (
            <div
                className={containerClasses}
               >
                <div>{this.props.title || this.props.children}</div>
                {this.props.icon && <Icon name={this.props.icon} onClick={this.props.onIconClick} />}
            </div>
        );
    }

}

ListHeader.defaultProps = {

}

export default ListHeader;


