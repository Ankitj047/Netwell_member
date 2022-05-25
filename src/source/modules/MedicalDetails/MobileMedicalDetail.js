import { FormControl, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React, { Component } from 'react'
import { Col, Container, Navbar, ProgressBar, Row } from 'react-bootstrap'

export default class MobileMedicalDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGender: 'Male'
    }

    this.handleChange = this.handleChange.bind(this)
    this.goBack = this.goBack.bind(this)
  }
  cardFooterBtns = ['BACK', 'NEXT', 'FINISH LATER']

  progressBar = [{ variant: 'warning' }, { status: 30 }]

  useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      width: 100
    }
  }))

  navBarIconStyle = { color: '#ffffff', height: '25px', width: '25px' }

  handleChange(event) {
    this.setState({ selectedGender: event.target.value })
  }

  goBack() {
    this.props.history.push('MobileMedical')
  }

  render() {
    return (
      <div>
        <Navbar className="custom-mobile-header" expand="lg" fixed="top">
          <ArrowBackIcon onClick={this.goBack} style={this.navBarIconStyle} />
          <div className="mobmedical_header_text">Medical Questionnaire</div>
          <NotificationsIcon style={this.navBarIconStyle} />
        </Navbar>

        <Container fluid>
          <Row className="d-flex justify-content-center" style={{ height: '90vh', marginTop: '7vh' }}>
            <Col md={10} className="bg-white rounded-top">
              <div className="mt-5">
                <span className="captiontextdiv mb-2">Gomez Adams</span>
                <ProgressBar className="mt-4" style={{ height: '0.5rem' }} variant="warning" now={30} />
              </div>
            </Col>

            <Col md={10} className="bg-white pb-4">
              <Row>
                <Col md={6} className="mt-3" style={{ lineHeight: '1.5' }}>
                  <div className="d-flex flex-column">
                    <label className="font-weight-bold">Tell us about you</label>
                    <div className="d-flex pb-4">
                      <FormControl className="p-2 w-100 d-flex flex-column">
                        <TextField
                          variant="filled"
                          style={{ width: '100%' }}
                          id="date"
                          label="Birth Gender"
                          type="date"
                          defaultValue="2020-09-21"
                          className="mb-3"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                        <Select
                          variant="filled"
                          style={{ width: '100%' }}
                          id="demo-simple-select"
                          value={this.state.selectedGender}
                          className="mb-3"
                          onChange={this.handleChange}
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                        <TextField
                          variant="filled"
                          style={{ width: '100%' }}
                          id="email"
                          label="Email"
                          type="email"
                          defaultValue="gomez.adams@gmail.com"
                          className="mb-3"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                </Col>
                <Col md={{ span: 4, offset: 2 }} className="d-flex flex-column ">
                  <label className="font-weight-bold">Why we need this</label>
                  <div>We need your email address for any personal health related communication.</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Navbar className="custom-mobile-footer d-flex justify-content-between" expand="lg" fixed="bottom">
          {/* <button className="btn floating-btn d-flex align-items-center justify-content-center shadow">
                        <NotificationsIcon style={this.navBarIconStyle} />
                    </button> */}
          {this.cardFooterBtns.map((btn, i) => {
            return (
              <span
                key={i}
                onClick={() => (btn == 'BACK' ? this.goBack() : () => false)}
                className="medical-detail-mobile-btn cursor_pointer rounded-pill text-center py-1"
              >
                {btn}
              </span>
            )
          })}
        </Navbar>
      </div>
    )
  }
}
