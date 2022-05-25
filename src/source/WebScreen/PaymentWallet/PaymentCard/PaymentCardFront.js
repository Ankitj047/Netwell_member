import moment from 'moment'
import React, { Component } from 'react'
import logo from '../Images/Frame.png'
import MasterLogo from '../Images/mastercard_2019_logo.png'
import DownloadPaymentCard from './DownloadPaymentCard'
export default class PaymentCardFront extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paymentData: this.props.paymentData
    }
    const ref = React.createRef()
  }
  componentDidMount() {
    console.log('paymentData=====', this.state.paymentData)
  }

  spacify = (str, after, c) => {
    if (!str) {
      return false
    }
    after = after || 4
    c = c || ' '
    var v = str.replace(/[^\dA-Z]/g, ''),
      reg = new RegExp('.{' + after + '}', 'g')
    return v
      .replace(reg, function(a) {
        return a + c
      })
      .replace(/[^0-9]+$/, '')
  }

  getDateInUTC = (date, getInMillisecs) => {
    if (date) {
      let newDateTime = date + new Date(date).getTimezoneOffset() * 60 * 1000

      if (getInMillisecs) {
        return newDateTime
      }

      return new Date(newDateTime)
    }

    return date
  }

  dateformat() {
    let enrollmentDate = this.getDateInUTC(this.props.data.memberIdCardList[0].enrollmentDate, true)

    var day = moment(enrollmentDate).format('DD')

    var mon = moment(enrollmentDate).format('MM')

    var year = moment(enrollmentDate).format('YYYY')

    var date = mon + '/' + day + '/' + year

    this.setState({ membersince: date })
  }
  downloadCard = () => {
    var canvas = document.getElementById('my-canvas')

    canvas.toBlob(function(blob) {
      var newImg = document.createElement('img'),
        url = URL.createObjectURL(blob)

      newImg.onload = function() {
                URL.revokeObjectURL(url)
      }

      newImg.src = url
      document.body.appendChild(newImg)
    })
  }
  render() {
    return (
      <div className="main_card_wrap" id="my-canvas">
        <div className="cardDetailContainer">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              {' '}
              {/* logo div */}
              <img src={logo} className="UHS_Logo_payment_card" />
            </div>
          </div>
          {this.state.paymentData && (
            <>
              <div>
                <div className="row">
                  {' '}
                  {/* middle main div */}
                  <div className="col-xs-12 col-md-12">
                    {' '}
                    {/* card no. div */}
                    <div className="Payment_card_number">
                      {/* {data.panNumber} */}
                      {this.state.paymentData.panNumber ? this.spacify(this.state.paymentData.panNumber, 4, ' ') : 'NA'}
                    </div>
                  </div>
                </div>

                <div className="row cvvDiv">
                  <div className=" col-md-3">
                    {' '}
                    {/* cvv no. div */}
                    <div className="CVV_ExpiryDate_Amount">
                      CVV &nbsp;
                      <span className="cvv_date-amount_value">{this.state.paymentData.cvv ? this.state.paymentData.cvv : 'NA'}</span>
                    </div>
                  </div>

                  <div className=" col-md-5">
                    {' '}
                    {/* cvv no. div */}
                    <div className="CVV_ExpiryDate_Amount">
                      EXPIRY &nbsp;
                      <span className="cvv_date-amount_value">
                        {this.state.paymentData.expirationDate ? moment(this.state.paymentData.expirationDate).format('MMM D, YYYY')  : 'NA'}
                      </span>
                    </div>
                  </div>

                  <div className=" col-md-4">
                    {' '}
                    {/* cvv no. div */}
                    <div className="CVV_ExpiryDate_Amount">
                      AMOUNT &nbsp;
                      <span className="cvv_date-amount_value">
                        ${this.state.paymentData.amountAuthorized ? this.state.paymentData.amountAuthorized : 'NA'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="row">
                  <div className=" col-md-6">
                    {' '}
                    {/* member name div */}
                    <div className="card_member_name">
                      {this.state.paymentData.memberFirstName ? this.state.paymentData.memberFirstName : ' '}{' '}
                      {this.state.paymentData.memberLastName ? this.state.paymentData.memberLastName : ' '}
                    </div>
                  </div>
                  <div className=" col-md-6 text-right">
                    {' '}
                    {/* member name div */}
                    <img src={MasterLogo} className="mastercard_logo" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="cardBottomContainer">
          <div className="cardBottomDetails">
            {this.state.paymentData && (
              <>
                <div className="row ">
                  <div className="col-2">
                    <h6>Member</h6>
                    <h4>
                      {this.state.paymentData.memberFirstName} {this.state.paymentData.memberLastName}
                    </h4>
                  </div>

                  <div className="col-4">
                    <h6>Provider</h6>
                    <h4>{this.state.paymentData.providerName}</h4>
                  </div>

                  <div className="col-6">
                    <h6>Procedure Information</h6>
                    <h4>{this.state.paymentData.procedureInformation}</h4>
                  </div>
                </div>
              </>
            )}
          </div>
          <DownloadPaymentCard cardData={this.state.paymentData} />
          {/* <div className='actionBtnBottom'>
            <div style={{display:'flex',flexDirection:'row-reverse'}}>
            <div className="Download_text">
                  DOWNLOAD
              </div>              
              
              <div>
                <GetAppIcon className="share_download_icon" onClick={this.downloadCard}/>
              </div>             

            </div>
            
          </div> */}
        </div>
      </div>
    )
  }
}
