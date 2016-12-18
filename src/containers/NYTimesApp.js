import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as NYTimesAppActions from '../actions/NYTimesAppActions'

import '../styles/NYTimesApp.css';

class NYTimesApp extends Component {
  componentDidMount( ) {
    this.props.fetchArticlesIfNeeded( 'home' )
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


const mapStateToProps = ( state, ownProps ) => {
  return {
    category: state.selectedCategory,
    articles: state.articles[state.selectedCategory],
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    selectCategory: ( category ) => dispatch(NYTimesAppActions.selectCategory( category )),
    fetchArticlesIfNeeded: ( category ) => dispatch(NYTimesAppActions.fetchArticlesIfNeeded( category )),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( NYTimesApp )
