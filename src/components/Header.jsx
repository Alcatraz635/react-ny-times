import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import {RaisedButton} from 'material-ui'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {DatePicker} from 'material-ui'
import '../styles/Header.css'


export default class Header extends Component {
  handleChange (e, date){
    console.log(e, date);
  };
   render(){
     return(
       <div className="header-section">
         <h2>New York Times API Client</h2>
         <Row>
            <Col sm={4} xs={12}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
               <RaisedButton
                  label="Select Category"
                  style={{ margin: 12 }}
                  onTouchTap={() => this.props.openDrawer()}/>
            </MuiThemeProvider>
            </Col>
            <Col sm={4} xs={12}>
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                 <DatePicker
                   hintText="FILTER BY DATE"
                   onChange={this.handleChange}
                 />
              </MuiThemeProvider>
            </Col>
            <Col sm={4} xs={12}></Col>
         </Row>
       </div>
     )
   }
}
