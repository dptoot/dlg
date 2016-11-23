'use strict';

import React, { Component } from 'react'

class CenteredWrapper extends Component {

    render() {

		const {children, ...rest} = this.props;

        return (
            <div className="centered-wrapper" {...rest}>
            	<div className="centered-main">
                	{children}
                </div>
            </div>
        );
    }

}

CenteredWrapper.defaultProps = {

}

export default CenteredWrapper;


