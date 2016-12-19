import React, { Component } from 'react'
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui'
import {FlatButton} from 'material-ui'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import dateFormat from 'dateformat'
import fallbackFeaturedImage from '../images/fallback-article-image.jpg'

export default class Article extends Component {
    render( ) {
      const cardStyle={
        textAlign: 'left',
        marginBottom: '30px'
      }
        return (

            <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>

                <Card containerStyle={cardStyle}>
                    <CardHeader title={dateFormat(this.props.article.published_date)}/>
                    <CardMedia overlay={< CardTitle
                    subtitle={
                        this.props.article.multimedia[4]===undefined ? "" : this.props.article.multimedia[4].copyright
                    } />}>
                        <img src={this.props.article.multimedia[4]===undefined ? fallbackFeaturedImage : this.props.article.multimedia[4].url} role="presentation"/>
                    </CardMedia>
                    <CardTitle title={this.props.article.title} subtitle={this.props.article.byline}/>
                    <CardText>
                        {this.props.article.abstract}
                    </CardText>
                    <CardActions>
                        <a href={this.props.article.short_url}><FlatButton label="Full Article"/></a>
                    </CardActions>
                </Card>
                </MuiThemeProvider>

        )
    }
}
