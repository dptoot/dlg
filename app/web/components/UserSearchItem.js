'use strict';

import React, { Component } from 'react'
import { Avatar } from '../elements';

class UserSearchItem extends Component {

    render() {
        
        return (
            <a 
                onClick={this.props.onClick}
                className="user-search-item"
                >
                    <div className="item-label">
                        <Avatar name={this.props.item.name} />
                        <div className="name">
                            {this.props.item.name}
                        </div>
                    </div>

            </a>
        )
    }
}

UserSearchItem.defaultProps = {
    
}




export default UserSearchItem;


