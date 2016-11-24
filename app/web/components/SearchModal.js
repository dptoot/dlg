'use strict';

import React, { Component } from 'react'
import Search from '../containers/Search';
import {Modal} from 'react-overlays';

class SearchModal extends Component {

    render() {
        return (
            <Modal
              aria-labelledby='modal-label'
              className="search-modal"
              backdropClassName="search-backdrop"
              show={this.props.show}
              onHide={this.props.onClose}
            >
                <div className="search-dialog">
                    <Search 
                        searchCollection={this.props.searchCollection}
                        onSelection={this.props.onSelection}
                        />
                </div>
            </Modal>
        );
    }

}

SearchModal.defaultProps = {

}

export default SearchModal;


