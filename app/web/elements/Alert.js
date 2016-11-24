'use strict';

import React, { Component } from 'react'
import {Modal} from 'react-overlays';

class Alert extends Component {

	renderButtons() {
		return this.props.buttons.map(button => {
			return (
				<div 
					className="alert-button"
					onClick={button.onClick}
					>
					{button.text}
				</div>
			)
		})
	}

    render() {
        return (
            <Modal
	          aria-labelledby='modal-label'
	          className="alert-modal"
	          backdropClassName="alert-backdrop"
	          show={this.props.show}
	          onHide={() => {}}
	        >
	        	<div className="alert-dialog">
	        		<div className="alert-title">{this.props.title}</div>
	        		<div className="alert-message">{this.props.message}</div>
	        		<div className="alert-buttons">{this.renderButtons()}</div>

				</div>
	        </Modal>
        );
    }

}

Alert.defaultProps = {

}

export default Alert;


