import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React, { Component } from 'react'
import { Col, Navbar, ProgressBar, Row } from 'react-bootstrap'

export default class MobileMedical extends Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.onGoToMobileDetails = this.onGoToMobileDetails.bind(this)
  }
  goBack = () => {
    this.props.history.goBack()
  }

  onGoToMobileDetails = () => {
    this.props.history.push('MobileMedicalDetail')
  }

  navBarIconStyle = { color: '#ffffff', height: '25px', width: '25px' }

  render() {
    const renderBtn = status => {
      if (status == 0) {
        return 'START'
      }
      if (status > 0 && status < 100) {
        return 'RESUME'
      }
      if (status == 100) {
        return 'EDIT'
      }
    }

    return (
      <div className="mobmedical">
        <Navbar className="custom-mobile-header" expand="lg" fixed="top">
          <ArrowBackIcon onClick={this.goBack} style={this.navBarIconStyle} />
          <div className="mobmedical_header_text">Medical Questionnaire</div>
          <NotificationsIcon style={this.navBarIconStyle} />
        </Navbar>

        <div className="mobmedical_body_container" style={{ height: '90vh', marginTop: '7vh', border: '2px solid red' }}>
          <div className="mobmedical_text">
            Please select a family member and fill in their medical questionnaire. This information will help us serve you better, hence
            please update this regularly to reflect your current health.
          </div>

          <Row>
            {tableData.map((item, i) => {
              return (
                <Col key={i} sm={12}>
                  <Row>
                    <Col sm={12} className="mb-2">
                      <ProgressBar
                        className="mt-3"
                        style={{ height: '0.5rem' }}
                        variant={item.status == 100 ? 'success' : 'warning'}
                        now={item.status}
                      />
                    </Col>
                    <Col sm={12}>
                      <Row className="d-flex flex-row">
                        <Col className="d-flex flex-column">
                          <span style={{ fontSize: '12px' }}> Name</span>
                          <span className="font-weight-bold" style={{ fontSize: '14px' }}>
                            {' '}
                            {item.name}{' '}
                          </span>
                        </Col>
                        <Col className="text-right">
                          <button className="status-btn-mobile" onClick={() => this.onGoToMobileDetails(item)}>
                            {renderBtn(item.status)}
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12}>
                      <div className="d-flex flex-column">
                        <span style={{ fontSize: '12px' }}> Last Updated</span>
                        <span className="font-weight-bold" style={{ fontSize: '14px' }}>
                          {' '}
                          {item.lastUpdated}{' '}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    )
  }
}

const tableData = [
  {
    name: 'Gomez Adams',
    status: 100,
    button: 'EDIT',
    color: '#27ae60',
    lastUpdated: 'April 12, 2020'
  },
  {
    name: 'Morticia Adams',
    status: 75,
    button: 'REMOVE',
    color: '#533278',
    lastUpdated: 'April 12, 2020'
  },
  {
    name: 'Wednesday Adams',
    status: 50,
    button: 'REMOVE',
    color: '#533278',
    lastUpdated: 'April 12, 2020'
  },
  {
    name: 'Pugsley Adams',
    status: 0,
    button: 'REMOVE',
    color: '#533278',
    lastUpdated: 'April 12, 2020'
  }
]
