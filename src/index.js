import React from 'react';
import ReactDOM from 'react-dom';
import NYTimesApp from './containers/NYTimesApp.jsx';
import { combineReducers, createStore, applyMiddleware, } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import devToolsEnhancer from 'remote-redux-devtools';
import {selectedCategory, articlesByCategory, selectedFilterDate, toggleDrawer, categoryItems, selectedSortBy} from './reducers/NYTimesAppReducer.js'
import './index.css';

const rootReducer = combineReducers({ selectedCategory: selectedCategory, articlesByCategory, selectedFilterDate, selectedSortBy, drawerIsOpen:toggleDrawer, categoryItems:categoryItems})

const store = createStore(rootReducer, devToolsEnhancer( ), applyMiddleware( thunkMiddleware ))


ReactDOM.render(
  <Provider store={store}>
   <NYTimesApp />
 </Provider>, document.getElementById( 'root' ));
