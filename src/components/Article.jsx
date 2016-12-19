import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
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

export default class Article extends Component {
    render( ) {
        return (
            <Col lg={3} md={4} sm={6} xs={12}>
            <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>

                <Card>
                    <CardHeader title={this.props.article.published_date}/>
                    <CardMedia overlay={< CardTitle title = {
                        this.props.article.multimedia[4] === undefined ? "" : this.props.article.multimedia[4].caption
                    }
                    subtitle = {
                        this.props.article.multimedia[4] === undefined ? "" : this.props.article.multimedia[4].copyright
                    } />}>
                        <img src={this.props.article.multimedia[4] === undefined ? "#" : this.props.article.multimedia[4].url}/>
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
            </Col>
        )
    }
}
