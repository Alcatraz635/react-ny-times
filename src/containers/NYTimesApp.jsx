import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Drawer } from 'material-ui'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Masonry from 'react-masonry-component'
import Header from '../components/Header.jsx'
import CategoryItem from '../components/CategoryItem.jsx'
import Article from '../components/Article.jsx'
import * as NYTimesAppActions from '../actions/NYTimesAppActions'

import '../styles/NYTimesApp.css';

class NYTimesApp extends Component {
  constructor( props ) {
    super( props )
    injectTapEventPlugin( )
  }
  componentWillMount( ) {
    this.props.fetchArticlesIfNeeded( 'home' )
  }
  render( ) {
    const categoryItems = this.props.categoryItems.map(( item, index ) => {
      return ( <CategoryItem key={index} item={item} category={this.props.category} closeDrawer={this.props.closeDrawer} selectedCategory={this.props.selectedCategory} fetchArticlesIfNeeded={this.props.fetchArticlesIfNeeded}/> )
    })
    const articles = this.props.articles === undefined
      ? (
        <div></div>
      )
      : this.props.articles.articles.map(( article, index ) => {
        return (
          <Col lg={3} md={4} sm={6} xs={12} key={`article-${ index }`}>
            <Article article={article}/>
          </Col>
        )
      })
    return (
      <div className="App">
        <Header openDrawer={this.props.openDrawer}/>
        <h1 onClick={() => this.props.filterByDate( Date("2016-12-19T05:43:55-05:00") )}>Click</h1>
        <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>

          <Drawer docked={false} width={200} open={this.props.drawerIsOpen} onRequestChange={( ) => this.props.openDrawer( )}>
            {categoryItems}
          </Drawer>

        </MuiThemeProvider>
        <Row className="articles-section">
          <Masonry className={'my-gallery-class'} elementType={'div'} // default 'div''
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
            {articles}
          </Masonry>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    category: state.selectedCategory,
    articles: state.articles[state.selectedCategory],
    drawerIsOpen: state.drawerIsOpen,
    categoryItems: state.categoryItems
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    selectedCategory: ( category ) => dispatch(NYTimesAppActions.selectedCategory( category )),
    fetchArticlesIfNeeded: ( category ) => dispatch(NYTimesAppActions.fetchArticlesIfNeeded( category )),
    filterByDate: ( date ) => dispatch(NYTimesAppActions.filterByDate( date )),
    filterClear: (  ) => dispatch(NYTimesAppActions.filterClear( )),
    openDrawer: ( ) => dispatch(NYTimesAppActions.openDrawer( )),
    closeDrawer: ( ) => dispatch(NYTimesAppActions.closeDrawer( ))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( NYTimesApp )
