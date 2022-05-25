import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { getPaymentCardData, getSourceCode } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import TransactionDataTable from './DataTable'
import PaymentCard from './PaymentCard/PaymentCardFront'
import './PaymentWallet.css'
import customStyle from './stylesheet_UHS'

const NextButton = withStyles(customStyle.PayButton)(Button)

export default class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      tableData: [],
      open: false,

      paymentType: '',

      sourceCode: localStorage.getItem('sourceid'),
      empid: null,

      loader: true,
      notfoundmsg: '',

      providerName: '',
      purposeOfVisit: '',
      visible: false,
      paymentCardData: null,
      notfoundmsg1: '',
      notfoundmsg2: '',
      notfoundmsg3: ''
    }
    this.openPaymentCard = this.openPaymentCard.bind(this)
  }

  componentDidMount() {
    this.setState({ loader: true })

    this.getSourceCodeFun()

    this.getPaymentCardData()
  }

  postForAccessToken = () => {
    let url =
      'https://test.salesforce.com/services/oauth2/token?password=Test@123poA3y92JUomMOSHlsv4tY13u&grant_type=password&client_secret=ABD0D24D689E3BCA8ACA4D7DDFF8311152D183EEF70072C99CD647329BE47866&client_id=3MVG9PG9sFc71i9niSy3spF8Y.sZ9VHsCuRQDCCArRoxKX.vQMzNRq8zTXVyZaoLvVl3GAlolvNqzRxmAg65.&username=carynintegrationsit@ust.com.sit'

    console.log('----URL----', url)

    var headers = {
      'Access-Control-Allow-Origin': 'https://dev.member.universalhealthfellowship.org/'
    }
    axios
      .post(url, null, { headers: headers })

      .then(response => {
        console.log('Payment Token====:' + response.access_token)
        return response
      })
      .catch(error => {
        console.log('Catche error===', JSON.stringify(error))
        return error
      })
  }

  getSourceCodeFun = () => {
    getSourceCode()
      .then(res => {
        this.setState({
          sourceCode: res.data.memberIdSource,
          empid: res.data.empId,

          loader: false
        })
      })
      .catch()
  }

  getPaymentCardData = () => {
    let request

    request = {
      // dyanamic EMPID from idcard API..........
      memberNumber: localStorage.getItem('Member_EMPID')
    }

    getPaymentCardData(request)
      .then(res => {
        console.log('getPaymentCardData====', res)

        if (res && res.data.length > 0) {
          this.setState({ tableData: res.data, loader: false })
        } else {
          this.handleError()
        }
      })
      .catch(error => {
        console.error('Error during service worker registration namita:', error.message)

        this.handleError()
      })
  }

  handleError = () => {
    this.setState({
      notfoundmsg1: 'There are no payment cards approved for your account.',
      notfoundmsg2: 'Submitted payment card requests, if any, may take 2-3 days to be processed. ',
      notfoundmsg3: ' For any clarifications call Customer Service.',
      loader: false
    })
  }
  handleClose = () => {
    this.setState({ open: false, purposeOfVisit: '', providerName: '', selectedDate: null }, () => this.validateForm())
  }

  handleClickOpen = () => {
    // this.setState({open:true}) // for requset card popup

    this.setState({ requestCardModal: true })
  }

  openPaymentCard = rowData => {
    console.log('Parent data ====', rowData)
    this.setState({ visible: true, paymentCardData: rowData })
  }

  getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = new Date(date)

      return new Date(newDateTime)
    }

    return date
  }

  render() {
    const { classes } = this.props

    return (
      <div className="progInfoMainWrapper">
        {this.state.loader ? <CommonLoader /> : null}
        <div className="container progInfoContainer" style={{ zIndex: '0' }}>
          {/* <div className="commonWrap" style={{marginTop: '-27px'}}> */}

          <div className="tablebackgroundouter tablebackgroundouterPaymentWallet">
            {this.state.tableData && this.state.tableData.length > 0 ? (
              <TransactionDataTable tableData={this.state.tableData} openPaymentCard={row => this.openPaymentCard(row)} />
            ) : (
              <div className="data_not_found">
                <h5 class="noneeds_msg_display">{this.state.notfoundmsg1}</h5>
                <h5 class="noneeds_msg_display">{this.state.notfoundmsg2}</h5>
                <h5 class="noneeds_msg_display">{this.state.notfoundmsg3}</h5>
              </div>
            )}
          </div>

          {/* </div> */}
        </div>

        {/* =================================================== */}

        <Modal className="paymentCardModal" show={this.state.visible} onHide={() => this.setState({ visible: false })} centered>
          <Modal.Body style={{ padding: '0px' }}>
            <PaymentCard paymentData={this.state.paymentCardData} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
