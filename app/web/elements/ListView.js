'use strict';

import React, { Component } from 'react'

class ListView extends Component {

    render() {

    	const {renderRow, dataSource, ...rest} = this.props;


        return (
            <div {...rest}>
                {this.props.dataSource.map(this.props.renderRow)}
            </div>
        );
    }
}

ListView.defaultProps = {
    
}

export default ListView;
