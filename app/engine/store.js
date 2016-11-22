import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';

const loggerMiddleware = createLogger({ 
    collapsed: true,
    predicate: (getState, action) => process.env !== 'production', 
});

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware, 
    loggerMiddleware,
  ),
);

const store = createStore(reducer, {}, enhancer);

if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

export default store;
