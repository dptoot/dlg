import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import SideMenu from '../containers/SideMenu';
import {connect} from 'react-redux';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import {mapDispatchToProps} from '../../engine';

class DrawerContainer extends Component {
    render(){
        // const state = this.props.navigationState;
        // const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={this.props.open}
                onClose={this.props.closeDrawer}
                type="static"
                content={<SideMenu />}
                openDrawerOffset={100}
                styles={drawerStyles}
                tweenHandler={(ratio, side = 'left') => {
                    return { 
                        drawer: { 
                            [side] : -150 * (1 - ratio)
                        },
                        
                        mainOverlay: { 
                            backgroundColor: `rgba(0,0,0,${Math.min(0.75, ratio)})`
                        },
                    }
                }}
                >
                <DefaultRenderer navigationState={this.props.children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}

const drawerStyles = {
    
}

function mapStateToProps(state) {
    return {
        open: state.drawer.open
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);