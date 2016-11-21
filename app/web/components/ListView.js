'use strict';

import React, { Component } from 'react'

class ListView extends Component {

    render() {

        return (
            <div {...this.props}>
                {this.props.dataSource.map(this.props.renderRow)}
            </div>
        );
    }
}

ListView.defaultProps = {
    
}

export default ListView;
