'use strict';

import React, { Component } from 'react'
import Icon from 'react-fontawesome';
import classnames from 'classnames';
import renderable from '../hoc/renderable';


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

export default renderable(ListHeader);
