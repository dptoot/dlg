'use strict';

import React, {Component} from 'react';
import { Navigator, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Actions, Router, Scene, Switch, NavBar} from 'react-native-router-flux';
import {connect} from 'react-redux';

import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Login,
    SignUp,
    MatchList, 
    Match, 
    AnswerList, 
    Search, 
    Launch,
    CreateMatch,
    DrawerNavButton,
    Drawer,
} from '../containers';

import {
    IconButton,
    Container,
    TabIcon,
} from '../components';


// Redux Connections
const connectedSwitch = connect(state=>({isAuthenticated:state.user.isAuthenticated}))(Switch);

const navButtonAttributes = {
    color: theme.colors.light,
    size: theme.text.xlg,
}

const styles = StyleSheet.create({
    sceneWithNavBar: {
        flex: 1,
        backgroundColor: theme.colors.light,
        paddingTop: 64,
    },
    tabBarIconContainer: {
        flex: 1,
        alignItems: 'stretch',
    }, 
    navigationTitle: {
        color: theme.colors.light,
    },
    navigationBar: {
        backgroundColor: theme.colors.grayDark,
    },
})

const routerAttributes = {
    tabBarStyle: styles.tabBar,
    tabBarIconContainerStyle: styles.tabBarIconContainer,
    pressOpacity: .75,
    navigationBarStyle: styles.navigationBar,
    titleStyle: styles.navigationTitle,
    renderBackButton: () => {return <IconButton icon="chevron-left" onPress={Actions.pop} {...navButtonAttributes} /> }
}

const sharedMatchListSceneAttributes = {
    component: MatchList,
    hideBackImage: true,
    sceneStyle: styles.sceneWithNavBar,
    renderBackButton: false,
    renderRightButton: () => {return <IconButton icon="plus" onPress={Actions.createMatchScene} {...navButtonAttributes} /> },
    renderLeftButton: () => {return <DrawerNavButton {...navButtonAttributes} />}
};

const scenes = Actions.create(
    <Scene 
        component={connectedSwitch}
        key="root"
        tabs
        unMountScenes
        selector={props => props.isAuthenticated ? "authenticated" : "anonymous"}
        >
        
        {/* Anonymous */}
        <Scene hideNavBar key="anonymous">
            <Scene 
                key="launch"
                component={Launch}
                />
            <Scene 
                key="login"
                component={Login}
                />
            <Scene 
                key="signup"
                component={SignUp}
                />
        </Scene>

        {/* Authenticated */}
        <Scene key="authenticated">
            <Scene key="drawer" component={Drawer}>
                <Scene
                    key="main"
                    tabs={true}
                    tabBarStyle={styles.tabBar}
                    tabBarIconContainerStyle={styles.tabBar}
                    >

                    <Scene key="currentTab" title="Your turn" icon={TabIcon}>
                        <Scene
                            key="currentList"
                            title="Your turn"
                            matchDataType="current"
                            {...sharedMatchListSceneAttributes}  
                        />
                    </Scene>

                    <Scene key="waitingTab" title="Their turn" icon={TabIcon}>
                        <Scene
                            key="waitingList"
                            title="Their turn"
                            matchDataType="waiting"
                            {...sharedMatchListSceneAttributes}  
                        />
                    </Scene>

                    <Scene key="inactiveTab" title="Completed" icon={TabIcon}>
                        <Scene
                            key="inactiveList"
                            title="Completed"
                            matchDataType="inactive"
                            {...sharedMatchListSceneAttributes}  
                        />
                    </Scene>
                </Scene>
            </Scene>

            <Scene
                sceneStyle={styles.sceneWithNavBar}
                key="createMatchScene"
                component={CreateMatch}
                title="Create Match"
                hideTabBar
            />
            <Scene
                sceneStyle={styles.sceneWithNavBar}
                key="matchScene"
                component={Match}
                title="Match"
                hideTabBar
            />
            <Scene
                sceneStyle={styles.sceneWithNavBar}
                key="matchScene"
                component={Match}
                title="Match"
                hideTabBar
            />
            <Scene
                sceneStyle={styles.sceneWithNavBar}
                key="answersScene"
                component={AnswerList}
                title="Answers"
                hideTabBar
            />
            <Scene
                key="searchScene"
                component={Search}
                hideTabBar
                hideNavBar
                direction="vertical"
            />
        </Scene>
    </Scene>
)

export default class AppRouter extends React.Component {
    render() {
        return <Router scenes={scenes} {...routerAttributes} />
    }
}