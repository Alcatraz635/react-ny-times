import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Drawer } from 'material-ui'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import dateFormat from 'dateformat'
import Masonry from 'react-masonry-component'
import Header from '../components/Header.jsx'
import CategoryItem from '../components/CategoryItem.jsx'
import Article from '../components/Article.jsx'
import * as NYTimesAppActions from '../actions/NYTimesAppActions'

import '../styles/NYTimesApp.css';

const propTypes = {
  selectedCategory: PropTypes.func.isRequired,
  fetchArticlesIfNeeded: PropTypes.func.isRequired,
  selectFilterDate: PropTypes.func.isRequired,
  selectSortBy: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer:  PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired,
  selectedFilterDate: PropTypes.instanceOf(Date),
  selectedSortBy: PropTypes.string,
  drawerIsOpen: PropTypes.bool.isRequired,
  categoryItems: PropTypes.array.isRequired
}

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
      return ( <CategoryItem
        key={index}
        item={item}
        category={this.props.category}
        closeDrawer={this.props.closeDrawer}
        selectedCategory={this.props.selectedCategory}
        fetchArticlesIfNeeded={this.props.fetchArticlesIfNeeded}
        selectFilterDate={this.props.selectFilterDate}
      />)
    })
    const articles = this.props.articles.map(( article, index ) => {
      return (
        <Col lg={3} md={4} sm={6} xs={12} key={`article-${ index }`}>
          <Article article={article}/>
        </Col>
      )
    })
    return (
      <div className="App">
        <Header
          openDrawer={this.props.openDrawer}
          selectFilterDate={this.props.selectFilterDate}
          selectedFilterDate={this.props.selectedFilterDate}
          selectSortBy={this.props.selectSortBy}
          selectedSortBy={this.props.selectedSortBy}
        />
        <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>

          <Drawer
            docked={false}
            width={300}
            open={this.props.drawerIsOpen}
            onRequestChange={( ) => this.props.openDrawer( )}
          >
            {categoryItems}
          </Drawer>

        </MuiThemeProvider>
        <Row className="articles-section">
          <Masonry
            className={'my-gallery-class'}
            elementType={'div'}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
          >
            {articles}
          </Masonry>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => {
  console.log(state.selectedFilterDate);
  return {
    category: state.selectedCategory,
    articles: state.articlesByCategory[state.selectedCategory] === undefined
      ? [ ]
      : state
        .articlesByCategory[state.selectedCategory]
        .articles
        .filter(article => {
            if ( state.selectedFilterDate === null ) {
              return true
            } else {
              return dateFormat(article.published_date, "dddd, mmmm dS, yyyy") === (dateFormat(state.selectedFilterDate, "dddd, mmmm dS, yyyy"))
            }
          })
        .sort( (articleOne, articleTwo) => articleTwo[state.selectedSortBy].localeCompare(articleOne[state.selectedSortBy]))
        .reverse(),
    selectedFilterDate: state.selectedFilterDate,
    selectedSortBy: state.selectedSortBy,
    drawerIsOpen: state.drawerIsOpen,
    categoryItems: state.categoryItems
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    selectedCategory: ( category ) => dispatch(NYTimesAppActions.selectedCategory( category )),
    fetchArticlesIfNeeded: ( category ) => dispatch(NYTimesAppActions.fetchArticlesIfNeeded( category )),
    selectFilterDate: ( date ) => dispatch(NYTimesAppActions.selectFilterDate( date )),
    selectSortBy: (sortBy ) => dispatch(NYTimesAppActions.selectSortBy( sortBy )),
    openDrawer: ( ) => dispatch(NYTimesAppActions.openDrawer( )),
    closeDrawer: ( ) => dispatch(NYTimesAppActions.closeDrawer( ))
  }
}

NYTimesApp.propTypes = propTypes;

export default connect( mapStateToProps, mapDispatchToProps )( NYTimesApp )
