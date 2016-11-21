'use strict';

import React, { Component } from 'react'

import {
    RemoteImage,
} from '../components';

class UserSearchItem extends Component {

    render() {
        
        return (
            <a 
                onClick={this.props.onClick}
                className="remote-search-item"
                >
                    <div className="name">
                        {this.props.item.name}
                    </div>

            </a>
        )
    }
}

UserSearchItem.defaultProps = {
    
}




export default UserSearchItem;


