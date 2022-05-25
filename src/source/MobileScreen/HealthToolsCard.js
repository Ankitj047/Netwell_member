import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ForumIcon from '@material-ui/icons/Forum'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import React, { Component } from 'react'
import Modal1 from 'react-awesome-modal'
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import customStyle from '../../components/healthqn/CSS/stylesheet_UHS'
import { getCardEnableData, gethealthcard, getNetworkName } from '../ApiCall'
import CommonLoader from '../CommonLoader'
import HealthToolsMob from './HealthTools/HealthToolsMob'
import MobileFooter from './MobileFooter'
import './MobileScreens.css'

const CrudButton = withStyles(customStyle.crudBtn)(Fab)

const NextButton = withStyles(customStyle.viewBtn)(Button)
const useStyles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },

  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
})

const MyDoc = () => {
  return (
    <Document>
      <Page>
        <View>
          <Text>Download Test</Text>
        </View>
      </Page>
    </Document>
  )
}

class HealthToolsCard extends Component {
  constructor() {
    super()
    this.state = {
      isFlipped: false,
      digitalheathcard: null,
      datanotavalabel: false,
      plainId: null,
      loader: true,
      clickToDownload: false,
      network: null,
      channel: null,
      planIds: null,
      contactNumber: null,
      cardId: null,
      showEmpId: false,
      flag: false,
      visible: false,
      visiblelandsacpe: true,
      tempNotAvailableModal: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.goBack = this.goBack.bind(this)
    this.isflippped = this.isflippped.bind(this)
    this.triggerChildAlert = this.triggerChildAlert.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  componentDidMount() {
    gethealthcard().then(res => {
      console.log('SERVER RESPONSE Health Card MOBILE=', res.data)
      if (res.data.memberIdCardList !== null) {
        this.setState({ digitalheathcard: res.data, plainId: res.data.memberIdCardList[0].planId })
        this.sethealthcarddata()
        this.getNetworkData(res.data.memberIdCardList[0].planId)
        this.setContactandCardID(res.data)
      } else {
        this.setState({ datanotavalabel: true, loader: false })
      }
    })
  }

  getCardEnable = () => {
    let client_id = localStorage.getItem('CLIENT_ID')

    getCardEnableData(client_id, 'HealthTool').then(res => {
      console.log('getCardEnableData=====', res.data.response.enable)

      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        this.setState({ tempNotAvailableModal: true }, () => console.log('tempNotAvailableModal====', this.state.tempNotAvailableModal))
      }
    })
  }
  onCloseTempModal = () => {
    this.setState({ tempNotAvailableModal: false })
    window.location.href = '/'
  }
  getNetworkData(plainid) {
    getNetworkName(plainid).then(res => {
      console.log('netowrok name againt plain id=======', res.data)
      this.setState({ network: res.data.provider_network })
      this.setState({
        loader: false
      })
    })
  }

  sethealthcarddata() {
    if (
      this.state.plainId == '1001' ||
      this.state.plainId == '1002' ||
      this.state.plainId == '1003' ||
      this.state.plainId == '1004' ||
      this.state.plainId == '1005' ||
      this.state.plainId == '1006' ||
      this.state.plainId == '1017' ||
      this.state.plainId == '1018' ||
      this.state.plainId == '1019' ||
      this.state.plainId == '1020' ||
      this.state.plainId == '1021' ||
      this.state.plainId == '1022'
    ) {
      this.setState({
        showEmpId: false
      })
    }

    if (
      this.state.plainId == '7001' ||
      this.state.plainId == '7002' ||
      this.state.plainId == '7003' ||
      this.state.plainId == '7004' ||
      this.state.plainId == '7005' ||
      this.state.plainId == '7006' ||
      this.state.plainId == '7017' ||
      this.state.plainId == '7018' ||
      this.state.plainId == '7019' ||
      this.state.plainId == '7020' ||
      this.state.plainId == '7021' ||
      this.state.plainId == '7022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '8001' ||
      this.state.plainId == '8002' ||
      this.state.plainId == '8003' ||
      this.state.plainId == '8004' ||
      this.state.plainId == '8005' ||
      this.state.plainId == '8006' ||
      this.state.plainId == '8017' ||
      this.state.plainId == '8018' ||
      this.state.plainId == '8019' ||
      this.state.plainId == '8020' ||
      this.state.plainId == '8021' ||
      this.state.plainId == '8022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '9001' ||
      this.state.plainId == '9002' ||
      this.state.plainId == '9003' ||
      this.state.plainId == '9004' ||
      this.state.plainId == '9005' ||
      this.state.plainId == '9006' ||
      this.state.plainId == '9017' ||
      this.state.plainId == '9018' ||
      this.state.plainId == '9019' ||
      this.state.plainId == '9020' ||
      this.state.plainId == '9021' ||
      this.state.plainId == '9022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '10001' ||
      this.state.plainId == '10002' ||
      this.state.plainId == '10003' ||
      this.state.plainId == '10004' ||
      this.state.plainId == '10005' ||
      this.state.plainId == '10006' ||
      this.state.plainId == '10017' ||
      this.state.plainId == '10018' ||
      this.state.plainId == '10019' ||
      this.state.plainId == '10020' ||
      this.state.plainId == '10021' ||
      this.state.plainId == '10022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '11001' ||
      this.state.plainId == '11002' ||
      this.state.plainId == '11003' ||
      this.state.plainId == '11004' ||
      this.state.plainId == '11005' ||
      this.state.plainId == '11006' ||
      this.state.plainId == '11017' ||
      this.state.plainId == '11018' ||
      this.state.plainId == '11019' ||
      this.state.plainId == '11020' ||
      this.state.plainId == '11021' ||
      this.state.plainId == '11022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '12001' ||
      this.state.plainId == '12002' ||
      this.state.plainId == '12003' ||
      this.state.plainId == '12004' ||
      this.state.plainId == '12005' ||
      this.state.plainId == '12006' ||
      this.state.plainId == '12017' ||
      this.state.plainId == '12018' ||
      this.state.plainId == '12019' ||
      this.state.plainId == '12020' ||
      this.state.plainId == '12021' ||
      this.state.plainId == '12022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '6001' ||
      this.state.plainId == '6002' ||
      this.state.plainId == '6003' ||
      this.state.plainId == '6004' ||
      this.state.plainId == '6005' ||
      this.state.plainId == '6006' ||
      this.state.plainId == '6017' ||
      this.state.plainId == '6018' ||
      this.state.plainId == '6019' ||
      this.state.plainId == '6020' ||
      this.state.plainId == '6021' ||
      this.state.plainId == '6022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '1011') {
      this.setState({
        showEmpId: false
      })
    }

    if (this.state.plainId == '6011') {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '13001' ||
      this.state.plainId == '13002' ||
      this.state.plainId == '13003' ||
      this.state.plainId == '13004' ||
      this.state.plainId == '13005' ||
      this.state.plainId == '13006' ||
      this.state.plainId == '13017' ||
      this.state.plainId == '13018' ||
      this.state.plainId == '13019' ||
      this.state.plainId == '13020' ||
      this.state.plainId == '13021' ||
      this.state.plainId == '13022'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '14001' ||
      this.state.plainId == '14002' ||
      this.state.plainId == '14003' ||
      this.state.plainId == '14004' ||
      this.state.plainId == '14005' ||
      this.state.plainId == '14006' ||
      this.state.plainId == '14017' ||
      this.state.plainId == '14018' ||
      this.state.plainId == '14019' ||
      this.state.plainId == '14020' ||
      this.state.plainId == '14021' ||
      this.state.plainId == '14022' ||
      this.state.plainId == '14011'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '15001' ||
      this.state.plainId == '15002' ||
      this.state.plainId == '15003' ||
      this.state.plainId == '15004' ||
      this.state.plainId == '15005' ||
      this.state.plainId == '15006' ||
      this.state.plainId == '15017' ||
      this.state.plainId == '15018' ||
      this.state.plainId == '15019' ||
      this.state.plainId == '15020' ||
      this.state.plainId == '15021' ||
      this.state.plainId == '15022' ||
      this.state.plainId == '15011'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId === '7011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '8011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '9011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '10011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '11011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '12011') {
      this.setState({
        showEmpId: true
      })
    }

    if (this.state.plainId == '13011') {
      this.setState({
        showEmpId: true
      })
    }

    this.setState({ loader: false })
  }

  setContactandCardID(data) {
    data.memberIdCardList[0].planInfo.map((data, index) => {
      if (data.idcardField == 'contact number') {
        this.setState({ contactNumber: data.fieldValue })
      }
      if (data.idcardField == 'card id') {
        this.setState({ cardId: data.fieldValue })
      }
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  onCardClick = () => {
    this.setState({
      visible: true
    })
  }

  handleClose = () => {
    this.setState({
      visible: false
    })
  }
  handleCloseLandscape = () => {
    this.setState({
      visiblelandsacpe: false
    })
  }
  printCardView() {
    window.print()
  }

  isflippped() {
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  triggerChildAlert() {
    this.refs.child.handleClick()
  }

  render() {
    const { classes } = this.props

    console.log('DIGITAL CARD DATA state is====================', this.state.digitalheathcard)
    return (
      <div class="digitalcard">
        {this.state.loader ? <CommonLoader /> : null}

        <div class="digitalcard_header">
          <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} onClick={() => this.goBack()} />
          <div class="digitalcard_headerdiv">Health Tools</div>
        </div>

        <div>
          {this.state.digitalheathcard && this.state.network ? (
            <DeviceOrientation lockOrientation={'landscape'}>
              <Orientation orientation="landscape" alwaysRender={false}>
                <Modal
                  style={{
                    overflow: 'auto',
                    height: '100%'
                  }}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={this.state.visiblelandsacpe}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500
                  }}
                >
                  <Fade in={this.state.visiblelandsacpe}>
                    <div class="landscape-mode-for_digital_card_new_add" style={{ position: 'relative' }}>
                      <HealthToolsMob
                        data={this.state.digitalheathcard}
                        cardId={this.state.cardId}
                        network={this.state.network}
                        contactNumber={this.state.contactNumber}
                        showEmpId={this.state.showEmpId}
                        mClose={false}
                        close={false}
                        lClose={true}
                        handleClose={this.handleCloseLandscape}
                        isflippped={() => this.isflippped()}
                      />
                    </div>
                  </Fade>
                </Modal>
              </Orientation>

              <Orientation orientation="portrait">
                <div>
                  <div class="cardZindex">
                    <div className="zoomBtnWrap" onClick={() => this.onCardClick()}>
                      <CrudButton
                        className={'purechat-button-expand'}
                        color="primary"
                        onClick={() => window.pureChat()}
                        aria-label="add"
                        style={customStyle.CommonChatBtn}
                      >
                        <ForumIcon />
                      </CrudButton>
                    </div>

                    <div id="test">
                      <HealthToolsMob
                        data={this.state.digitalheathcard}
                        cardId={this.state.cardId}
                        network={this.state.network}
                        contactNumber={this.state.contactNumber}
                        showEmpId={this.state.showEmpId}
                        isflippped={() => this.isflippped()}
                        ref="child"
                        mClose={false}
                        lClose={false}
                      />
                    </div>

                    {this.state.isFlipped ? (
                      <div class="digitalcard_bullet">
                        <FiberManualRecordIcon style={{ color: 'rgba(84, 51, 121, 0.4)' }} onClick={() => this.triggerChildAlert()} />
                        <FiberManualRecordIcon style={{ color: '#543379' }} />
                      </div>
                    ) : (
                      <div class="digitalcard_bullet">
                        <FiberManualRecordIcon style={{ color: '#543379' }} />
                        <FiberManualRecordIcon style={{ color: 'rgba(84, 51, 121, 0.4)' }} onClick={() => this.triggerChildAlert()} />
                      </div>
                    )}
                  </div>
                </div>
              </Orientation>
            </DeviceOrientation>
          ) : null}

          {this.state.datanotavalabel ? <div>Data not available.</div> : null}
        </div>

        <Modal
          style={{
            overflow: 'auto',
            height: '100%'
          }}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.visible}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.visible}>
            <div class="landscape-mode-for_digital_card" style={{ position: 'relative' }}>
              <HealthToolsMob
                data={this.state.digitalheathcard}
                cardId={this.state.cardId}
                network={this.state.network}
                contactNumber={this.state.contactNumber}
                showEmpId={this.state.showEmpId}
                isflippped={() => this.isflippped()}
                closebutton={true}
                lClose={false}
                close={true}
                mClose={true}
                handleClose={this.handleClose}
              />
            </div>
          </Fade>
        </Modal>
        <Modal1 visible={this.state.tempNotAvailableModal} effect="fadeInUp">
          <div style={{ width: '80vw', height: '38vw' }}>
            <div className="tempModalTxt">
              We’re facing some technical difficulties, due to which this feature is currently unavailable. For support, call Member
              Services at {localStorage.getItem('CONTACT_NUMBER')}, Monday through Friday, 8.00am to 8.00pm CST.
            </div>

            <div className="mqalert_button_div">
              <NextButton
                variant="contained"
                class="yellow_popup_caption_button"
                onClick={this.onCloseTempModal}
                style={{
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  height: '37px',
                  backgroundColor: '#eb5757',
                  borderRadius: '20px',
                  color: '#fff',
                  fontWeight: 500
                }}
              >
                CLOSE
              </NextButton>
            </div>
          </div>
        </Modal1>

        <div class="fixed-bottom">
          <MobileFooter />
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(HealthToolsCard)
