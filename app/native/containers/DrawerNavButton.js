import React, { Component } from 'react';
import {connect} from 'react-redux';
import { mapDispatchToProps } from '../../engine';
import {IconButton} from '../components';

class DrawerNavButton extends React.Component {

	render() {
		return(
			<IconButton icon="bars" onPress={this.props.openDrawer} {...this.props} />
		);
	}

}


function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavButton);