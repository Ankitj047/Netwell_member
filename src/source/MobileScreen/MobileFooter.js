import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class MobileFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myneedsfooter: false
    }
  }

  componentDidMount() {
    var myneedsfootertemp = sessionStorage.getItem('myneedsfooter')
    console.log('my needs footer text', myneedsfootertemp)
    this.setState({ myneedsfooter: myneedsfootertemp })
    // alert("mynneds",myneedsfootertemp)
  }

  render() {
    return (
      <div className="footer fixed-bottom d-flex justify-content-around">
        {this.props.name == 'Dashboard' ? (
          <Link to="/" style={{ textDecoration: 'none' }} className="footer_icon_view">
            <img src={require('../Images/bottom/dashboard_icon_wh_active.svg')} className="bottom_tab_icon" />
            <div className="mobile_footer_icon_name_active">Dashboard</div>
          </Link>
        ) : (
          <Link to="/" style={{ textDecoration: 'none' }} className="footer_icon_view">
            <img src={require('../Images/bottom/dashboard_icon_wh.svg')} className="bottom_tab_icon" />
            <div className="mobile_footer_icon_name">Dashboard</div>
          </Link>
        )}

        {this.props.name == 'Documents' ? (
          <div className="footer_icon_view">
            <img src={require('../Images/LeftDrawer Icon/documents-icon-active.svg')} className="bottom_tab_icon_documents" />
            <div className="mobile_footer_icon_name_active">Documents</div>
          </div>
        ) : (
          <Link to="/DocumentsScreen">
            <div className="footer_icon_view">
              <img src={require('../Images/bottom/documents_icon_wh.svg')} className="bottom_tab_icon_documents" />
              <div className="mobile_footer_icon_name">Documents</div>
            </div>
          </Link>
        )}

        {this.state.myneedsfooter == true || this.state.myneedsfooter == 'true' || true ? (
          <>
            {this.props.name == 'My Needs' ? (
              <Link to="/MyneedsMobile" style={{ textDecoration: 'none' }} className="footer_icon_view">
                <img src={require('../Images/bottom/needs_icon_wh_active.svg')} className="bottom_tab_icon" />
                <div className="mobile_footer_icon_name_active">My Needs</div>
              </Link>
            ) : (
              <Link to="/MyneedsMobile" style={{ textDecoration: 'none' }} className="footer_icon_view">
                <img src={require('../Images/bottom/needs_icon_wh.svg')} className="bottom_tab_icon" />
                <div className="mobile_footer_icon_name">My Needs</div>
              </Link>
            )}
          </>
        ) : null}

        {/* {
                 this.props.name =="Share Plus"
                 ? <div className="footer_icon_view">
                  <img src={require('../Images/bottom/shareplus_icon_wh_active.svg')} className="bottom_tab_icon"/>
                  <div className="mobile_footer_icon_name_active">Share Plus</div>
                  </div>
                 :
                 <div className="footer_icon_view">
                 <img src={require('../Images/bottom/shareplus_icon_wh.svg')} className="bottom_tab_icon"/>
                 <div className="mobile_footer_icon_name">Share Plus</div>
                 </div>
                 } */}
      </div>
    )
  }
}
