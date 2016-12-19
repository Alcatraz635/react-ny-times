import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { Drawer } from 'material-ui'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Masonry from 'react-masonry-component'
import Header from '../components/Header.jsx'
import SectionItem from '../components/SectionItem.jsx'
import Article from '../components/Article.jsx'
import * as NYTimesAppActions from '../actions/NYTimesAppActions'

import '../styles/NYTimesApp.css';

class NYTimesApp extends Component {
    constructor( props ) {
        super( props )
        injectTapEventPlugin( )
    }
    componentDidMount( ) {
        this
            .props
            .fetchArticlesIfNeeded( 'home' )
    }
    render( ) {
        const sectionItems = this
            .props
            .sectionItems
            .map(( item, index ) => {
                return ( <SectionItem key={index} item={item} closeDrawer={this.props.closeDrawer} selectedCategory={this.props.selectedCategory} fetchArticlesIfNeeded={this.props.fetchArticlesIfNeeded}/> )
            })
            const articles = this.props.articles === undefined
                ? (<div></div>)
                : this
                    .props
                    .articles
                    .articles
                    .map(( article, index ) => {
                        return (
                            <div key={`article-${index}`}>
                                <Article article={article} />
                            </div>
                        )
                    })
            console.log(articles.length);
        return (
            <div className="App">
                <Header openDrawer={this.props.openDrawer}/>
                <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>

                    <Drawer docked={false} width={200} open={this.props.drawerIsOpen} onRequestChange={( ) => this.props.openDrawer( )}>
                        {sectionItems}
                    </Drawer>

                </MuiThemeProvider>
                <Row>
                <Masonry className={'my-gallery-class'}
                    elementType={'div'} // default 'div''
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
        sectionItems: state.sectionItems,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        selectedCategory: ( category ) => dispatch(NYTimesAppActions.selectedCategory( category )),
        fetchArticlesIfNeeded: ( category ) => dispatch(NYTimesAppActions.fetchArticlesIfNeeded( category )),
        openDrawer: ( ) => dispatch(NYTimesAppActions.openDrawer( )),
        closeDrawer: ( ) => dispatch(NYTimesAppActions.closeDrawer( )),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( NYTimesApp )
