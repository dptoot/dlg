import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {
  AppRegistry,
  View,
  Text,
} from 'react-native';

import Root from './app/native/containers/Root';

AppRegistry.registerComponent('DougLovesMovieGames', () => Root);
