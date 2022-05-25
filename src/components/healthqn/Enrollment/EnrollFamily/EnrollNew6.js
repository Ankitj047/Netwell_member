import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import Sample from '../../CommonScreens/sampleTextField'
import customStyle from '../../CSS/stylesheet_UHS'
import i18n from '../i18next'

const CustomeButton = withStyles(customStyle.viewBtn)(Button)

class EnrollNew6 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false,
      authModalShow: false,
      privacyPolicy: this.props.privacyPolicy,
      authorize: this.props.authorize,
      fullName: this.props.viewMode ? this.props.fullName : ''
    }
  }

  componentDidMount() {
    this.handleAgreement()
  }

  authorizeHideModal = event => {
    this.setState(
      {
        authModalShow: false,
        authorize: this.props.viewMode ? true : false
      },
      () => this.handleAgreement
    )
  }

  acceptAuth = () => {
    this.setState(
      {
        authModalShow: false,
        authorize: true
      },
      () => this.handleAgreement()
    )
  }

  showAuthorizeModalPopup = event => {
    this.setState(
      {
        authModalShow: true
        // authorize: this.props.viewMode ? false : true,
        // authorize: this.props.viewMode ? true : false,
      },
      () => this.handleAgreement
    )
  }

  handleAgreement = () => {
    /**/
    if (this.state.privacyPolicy && this.state.authorize && this.state.fullName !== '') {
      this.props.onClick(false, this.state.authorize, this.state.privacyPolicy, this.state.fullName)
    } else {
      this.props.onClick(true, this.state.authorize, this.state.privacyPolicy, this.state.fullName)
    }
  }

  showPlansModalPrivacy = () => {
    this.setState(
      {
        modalShowPrivacy: true
        // privacyPolicy: this.props.viewMode ? true : false,
        // privacyPolicy: this.props.viewMode ? false : true,
        // loaderShow: true
      },
      () => {
        this.handleAgreement()
      }
    )
  }

  hideAllModal = () => {
    this.setState({
      modalShowPrivacy: false,
      authModalShow: false
    })
  }

  hideModalPrivacy = event => {
    // hide and cancel acception
    this.setState(
      {
        modalShowPrivacy: false,
        // privacyPolicy: this.props.viewMode ? true : false,
        privacyPolicy: false
      },
      () => {
        this.handleAgreement()
      }
    )
  }

  acceptPrivacyPolicy = () => {
    this.setState(
      {
        modalShowPrivacy: false,
        privacyPolicy: true
      },
      () => {
        this.handleAgreement()
      }
    )
  }

  nameChangeHandler = (val, isValid, parentObj) => {
    if (isValid) {
      this.setState(
        {
          fullName: val
        },
        () => {
          this.handleAgreement()
        }
      )
    } else {
      this.setState(
        {
          fullName: ''
        },
        () => {
          this.handleAgreement()
        }
      )
    }
  }

  render() {
    return (
      <Row className="d-flex mt-2 card-content">
        <Col md={7} className="px-0 px-md-3">
          <Col md={12} className="px-2 px-md-2">
            <div className="custom-subtitle">Review & accept terms</div>
          </Col>
          {/* <span style={customeClasses.subTitle}>Review & accept terms</span> */}
          <div>
            <Checkbox
              checked={this.state.privacyPolicy}
              inputProps={{
                'aria-label': 'secondary checkbox'
              }}
              disabled={this.props.viewMode}
              style={{ color: '#533278' }}
              onClick={this.showPlansModalPrivacy}
            />
            <span style={{ cursor: 'pointer', fontWeight: '400' }} onClick={this.showPlansModalPrivacy}>
              {i18n.t('SUBMIT_APPLICATION.AGREE')}{' '}
              <span
                style={{ color: '#533278', cursor: 'pointer', fontWeight: 'bold', borderBottom: '1px solid #533278' }}
                onClick={this.showPlansModalPrivacy}
              >
                {i18n.t('SUBMIT_APPLICATION.PRIVACY')}
              </span>
            </span>

            <Modal size="lg" show={this.state.modalShowPrivacy} onHide={event => this.hideAllModal(event)} backdrop="static">
              <Modal.Header style={customStyle.modal_header} closeButton>
                <Modal.Title style={{ fontSize: '1rem' }}> {i18n.t('SUBMIT_APPLICATION.PRIVACY_TITLE')}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', textAlign: 'justify', wordSpacing: '-2px' }}>
                {/* {
                                this.state.loaderShow ? <Loader></Loader> : ''
                            } */}
                {/* <iframe style={{ height: 'calc(100vh - 230px)', width: '100%', textAlign: 'justify' }} onLoad={() => this.setState({ loaderShow: false })} src="https://www.universalhealthfellowship.org/view-privacy-statement/"></iframe> */}

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.TITLE')}</div>

                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.CONTENT1')}</div>

                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.CONTENT2')}</div>

                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.CONTENT3')}</div>

                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.CONTENT4')}</div>
                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUTESTION1')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER1')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER12')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER13')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER14')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER15')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER16')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER17')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER18')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER19')}</div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION2')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER2')}</div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION3')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER3')}</div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION4')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER4')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER41')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER42')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER43')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER44')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER45')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER46')}</div>
                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION5')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER5')}</div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION6')}</div>
                <div style={{ paddingTop: '8px' }}>
                  {i18n.t('MODAL_POPUP1.ANSWER6')}
                  <a style={{ color: '#533278', fontWeight: 'bold' }} href="mailto:info@UniversalHealthFellowship.org.">
                    {i18n.t('MODAL_POPUP1.ANSWER66')}
                  </a>
                  .
                </div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER61')}</div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION7')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER7')}</div>
                <div style={{ paddingTop: '8px' }}>
                  {i18n.t('MODAL_POPUP1.ANSWER71')}
                  <a style={{ color: '#533278', fontWeight: 'bold' }} href="mailto:info@UniversalHealthFellowship.org.">
                    {i18n.t('MODAL_POPUP1.ANSWER72')}
                  </a>
                  .
                </div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION8')}</div>
                <div style={{ paddingTop: '8px' }}>
                  {i18n.t('MODAL_POPUP1.ANSWER8')}
                  <span>
                    <a style={{ color: '#533278', fontWeight: 'bold' }} href="mailto:info@UniversalHealthFellowship.org.">
                      {i18n.t('MODAL_POPUP1.ANSWER81')}
                    </a>
                  </span>
                  <span> {i18n.t('MODAL_POPUP1.ANSWER82')}</span>
                </div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION9')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER9')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER91')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER92')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER93')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER94')}</div>
                <div style={{ paddingTop: '8px' }}>
                  <a style={{ color: '#533278', fontWeight: 'bold' }} target="_blank" href="http://www.UniversalHealthFellowship.org">
                    {i18n.t('MODAL_POPUP1.ANSWER95')}
                  </a>
                </div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION10')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER10')}</div>

                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION11')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER11')}</div>
                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>{i18n.t('MODAL_POPUP1.QUESTION12')}</div>
                <div style={{ paddingTop: '8px' }}>{i18n.t('MODAL_POPUP1.ANSWER122')}</div>
              </Modal.Body>
              <Modal.Footer style={{ padding: '0px', height: '50px' }}>
                <CustomeButton
                  disabled={this.props.viewMode}
                  variant="contained"
                  onClick={event => this.hideModalPrivacy(event)}
                  style={{ marginBottom: '12px', marginTop: '5px', marginRight: '15px' }}
                >
                  {i18n.t('BUTTON.CANCEL')}
                </CustomeButton>
                <CustomeButton
                  disabled={this.props.viewMode}
                  variant="contained"
                  onClick={() => this.acceptPrivacyPolicy()}
                  style={{ marginBottom: '12px', marginTop: '5px', marginRight: '15px' }}
                >
                  {i18n.t('BUTTON.ACCEPT')}
                </CustomeButton>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="d-flex flex-nowrap align-items-start">
            <Checkbox
              checked={this.state.authorize}
              inputProps={{
                'aria-label': 'secondary checkbox'
              }}
              disabled={this.props.viewMode}
              style={{ color: '#533278' }}
              onClick={this.showAuthorizeModalPopup}
            />
            <div className="mt-2">
              <span onClick={this.showAuthorizeModalPopup} style={{ cursor: 'pointer', fontWeight: '400' }}>
                {i18n.t('SUBMIT_APPLICATION.AUTHORIZE')}
              </span>
              <span
                style={{ color: '#533278', cursor: 'pointer', fontWeight: 'bold', borderBottom: '1px solid #533278' }}
                onClick={this.showAuthorizeModalPopup}
              >
                {i18n.t('SUBMIT_APPLICATION.AUTHORIZE11')}
              </span>
            </div>
          </div>

          <Modal size="lg" show={this.state.authModalShow} onHide={event => this.hideAllModal(event)} backdrop="static">
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title style={{ fontSize: '1rem' }}>{i18n.t('SUBMIT_APPLICATION.IMP_NOTICE')}</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                // 'maxHeight': '450px',
                // maxHeight: 'calc(100vh - 230px)',
                maxHeight: '60vh',
                overflowY: 'auto',
                textAlign: 'justify',
                wordSpacing: '1px'
              }}
            >
              <div>
                <div style={{ paddingTop: '8px', fontWeight: 'bold' }}>
                  Authorization for Universal Health Fellowship & CarynHealth to Contact Medical Provider
                </div>

                {/* <h2 style={{ wordSpacing: '1px', textAlign: 'left' }}>Authorization for Universal Health Fellowship & CarynHealth to Contact Medical Provider</h2> */}

                <p style={{ marginTop: '20px' }}>To Whom It May Concern:</p>
                <span>
                  I, a covered individual (or the parent or legal guardian for my minor) under{' '}
                  <span style={{ fontWeight: 'bold' }}>Universal HealthShare </span>(the “Program”), hereby request, authorize and grant
                  authority to Universal Health Fellowship (“UHF”), or its appointed health plan manager CarynHealth Solutions, LLC
                  (“CarynHealth”), to contact and act on my behalf in dealing with my physician and medical providers (the “Facility”) and
                  any other interested party in reference to charges for treatment, care and services provided in connection with the
                  medical need and medical billing (the “Medical Bill”), including without limitation charges that the Program has
                  determined exceed the Allowable Claim Limits under the terms of the Program Document.
                </span>
                <br />
                <br />
                <p>
                  Additionally, by my acceptance, I acknowledge that I have authorized the Facility to release any records and information
                  related to the Medical Bill, including Protected Health Information (PHI), to UHF and CarynHealth. I am requesting that
                  such Protected Health Information be disclosed under this authorization, as permitted by 164.508(1)(iv) of the privacy
                  regulations issued pursuant to the Health Insurance Portability and Accountability Act (“HIPAA Privacy Rule”). I have
                  retained a copy of this authorization for my records. I understand that I have the right to revoke this authorization in
                  writing, at any time, by sending a written statement of the revocation to UHF and CarynHealth. Unless revoked, this
                  release will remain in effect and valid for one year from the date of this authorization.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ padding: '0px' }}>
              <CustomeButton
                disabled={this.props.viewMode}
                variant="contained"
                onClick={event => this.authorizeHideModal(event)}
                style={{ marginBottom: '12px', marginTop: '5px', marginRight: '15px' }}
              >
                {i18n.t('BUTTON.CANCEL')}
              </CustomeButton>
              <CustomeButton
                disabled={this.props.viewMode}
                variant="contained"
                onClick={this.acceptAuth.bind(this)}
                style={{ marginBottom: '12px', marginTop: '5px', marginRight: '15px' }}
              >
                {i18n.t('BUTTON.ACCEPT')}
              </CustomeButton>
            </Modal.Footer>
          </Modal>
          {/* <div className="my-4 w-100">
                        <Sample setChild={this.nameChangeHandler.bind(this)} name={'FirstName'} reqFlag={true} label={'Approve  submission by typing in your full name'} value={this.state.fullName} disable={this.props.viewMode} style={customStyle.textFieldWrp} length={120} fieldType={'city'} errMsg={'Enter valid full name'} helperMsg={'Full name required'} parentDetails={{}}></Sample>
                    </div> */}
          <Row>
            <Col md={11} className="my-4">
              <Sample
                setChild={this.nameChangeHandler.bind(this)}
                name={'FirstName'}
                reqFlag={true}
                label={'Approve submission by typing in your full name'}
                value={this.state.fullName}
                disable={this.props.viewMode}
                style={customStyle.textFieldWrp}
                length={120}
                fieldType={'city'}
                errMsg={'Enter valid full name'}
                helperMsg={'Full name required'}
                parentDetails={{}}
              ></Sample>
            </Col>
          </Row>
        </Col>

        <Col md={5}>
          <Row className="d-flex flex-column px-1">
            <Col md={10} className="px-0 px-md-3">
              <div className="custom-subtitle"></div>
              <div className="description pt-0 pt-md-3" style={{ fontSize: '16px' }}>
                Your medical questionnaire is now ready to be submitted. Review the terms and indicate your acceptance of the same.
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default EnrollNew6
