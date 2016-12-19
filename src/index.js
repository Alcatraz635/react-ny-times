import React from 'react';
import ReactDOM from 'react-dom';
import NYTimesApp from './containers/NYTimesApp.jsx';
import { combineReducers, createStore, applyMiddleware, } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import devToolsEnhancer from 'remote-redux-devtools';
import {selectedCategory, articlesByCategory, toggleDrawer, sectionItems} from './reducers/NYTimesAppReducer.js'
import {fetchArticlesIfNeeded} from './actions/NYTimesAppActions'
import './index.css';

//const loggerMiddleware = createLogger( )

const rootReducer = combineReducers({ selectedCategory: selectedCategory, articles: articlesByCategory, drawerIsOpen:toggleDrawer, sectionItems:sectionItems})

const store = createStore(rootReducer, devToolsEnhancer( ), applyMiddleware(  thunkMiddleware ))

ReactDOM.render(
  <Provider store={store}>
   <NYTimesApp/>
 </Provider>, document.getElementById( 'root' ));
