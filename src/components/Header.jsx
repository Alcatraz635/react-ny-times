import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { DatePicker, DropDownMenu, MenuItem } from 'material-ui'

import '../styles/Header.css'

export default class Header extends Component {
  render( ) {
    return (
      <div className="header-section">
        <h2>New York Times API Client</h2>
        <Row>
          <Col sm={4} xs={12}>
            <h4>Select category:</h4>
            <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>
              <RaisedButton label="Select Category" style={{
                margin: 12
              }} onTouchTap={( ) => this.props.openDrawer( )}/>
            </MuiThemeProvider>
          </Col>
          <Col sm={4} xs={12}>
            <h4>Filter by date:</h4>
            <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>
              <DatePicker hintText="FILTER BY DATE" value={this.props.selectedFilterDate} onChange={( e, date ) => {
                this.props.selectFilterDate( date )
              }}/>
            </MuiThemeProvider>
          </Col>
          <Col sm={4} xs={12}>
            <h4>Sort by:</h4>
            <MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>
            <DropDownMenu
              value={this.props.selectedSortBy}
              onChange={(e, index, value) => {
              this.props.selectSortBy(value)
              }}
              style={{width:"100%",marginTop:"-8px"}}
              autoWidth={false}
              >
              <MenuItem value={"title"} primaryText="Title"/>
              <MenuItem value={"published_date"} primaryText="Date"/>
            </DropDownMenu>
          </MuiThemeProvider>
          </Col>
        </Row>
      </div>
    )
  }
}
