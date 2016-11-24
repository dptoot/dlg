'use strict';

import React, { Component } from 'react'

import {
    RemoteImage,
} from '../elements';

class RemoteSearchItem extends Component {

    render() {
        
        return (
            <a 
                onClick={this.props.onClick}
                className="remote-search-item"
                >
                
                    <RemoteImage 
                        path={this.props.item.imagePath} 
                        width={154}
                        />
                    <div className="name">
                        {this.props.item.name}
                    </div>

            </a>
        )
    }
}

RemoteSearchItem.defaultProps = {
    
}




export default RemoteSearchItem;


