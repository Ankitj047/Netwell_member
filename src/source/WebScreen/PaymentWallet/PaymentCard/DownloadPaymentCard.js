import GetAppIcon from '@material-ui/icons/GetApp'
import { Document, Font, Image, Page, pdf, Text, View } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import moment from 'moment'
import React, { Component } from 'react'
import { getPaymentCardData } from '../../../ApiCall'
import BgImage from '../Images/bgImage04.png'
import logo from '../Images/Frame.png'
import masterCardLogo from '../Images/mastercard_2019_logo.png'

Font.register({
  family: 'Roboto',
  fonts: [{ fontStyle: 'italic' }, { fontStyle: 'italic', fontWeight: 700 }]
})
var topM = 0
const PrintDoc = ({ data }) => (
  <Document>
    <Page size="A5">
      <View
        style={{
          display: 'block',
          height: '250px',
          width: '328px',
          position: 'relative',
          padding: '20',
          margin: 'auto'
        }}
      >
        <Image
          source={BgImage}
          style={{
            position: 'absolute',
            display: 'block',
            height: '250px',
            width: '328px'
          }}
        ></Image>

        <Image
          source={logo}
          style={{
            position: 'absolute',
            minWidth: '108px',
            minHeight: '34px',
            display: 'block',
            height: '34px',
            width: '108px',
            top: '12px',
            left: '18px'
          }}
        ></Image>

        {data && (
          <>
            {
              <>
                <Text style={{ position: 'absolute', top: '80px', left: '18px', fontSize: '26', color: '#98335b' }}>
                  {data.panNumber ? spacify(data.panNumber, 4, ' ') : 'NA'}
                </Text>
                <Text style={{ position: 'absolute', top: '130px', left: '18px', fontSize: '9', color: '#000000' }}>
                  CVV{' '}
                  <Text style={{ position: 'absolute', top: '130px', left: '18px', fontSize: '9', color: '#98335b' }}>
                    {data.cvv ? data.cvv : 'NA'}
                  </Text>
                </Text>

                <Text style={{ position: 'absolute', top: '130px', left: '96px', fontSize: '9', color: '#000000' }}>
                  EXPIRY
                  <Text style={{ position: 'absolute', top: '130px', left: '96px', fontSize: '9', color: '#98335b' }}>
                    {' '}
                    {data.expirationDate ? data.expirationDate : 'NA'}
                  </Text>
                </Text>

                <Text style={{ position: 'absolute', top: '130px', left: '186px', fontSize: '9', color: '#000000' }}>
                  AMOUNT
                  <Text style={{ position: 'absolute', top: '130px', left: '186px', fontSize: '9', color: '#98335b' }}>
                    {' '}
                    ${data.amountAuthorized ? data.amountAuthorized : 'NA'}
                  </Text>
                </Text>

                <Text style={{ position: 'absolute', top: '162px', left: '18px', fontSize: '20', color: '#000000' }}>
                  {data.memberFirstName ? data.memberFirstName : ' '} {data.memberLastName ? data.memberLastName : ' '}
                </Text>
                <Image
                  source={masterCardLogo}
                  style={{
                    position: 'absolute',
                    display: 'block',
                    width: '42px',
                    top: '162px',
                    left: '260px'
                  }}
                ></Image>

                <Text style={{ position: 'absolute', top: '210px', left: '18px', fontSize: '8', color: '#ffffff' }}>Member</Text>
                <Text style={{ position: 'absolute', top: '225px', left: '18px', fontSize: '9', color: '#ffffff' }}>
                  {data.memberFirstName ? data.memberFirstName : ' '} {data.memberLastName ? data.memberLastName : ' '}
                </Text>

                {/* <Text style={{position: "absolute", top:"210px", left:"146px", fontSize:'8', color:'#ffffff',}}>Provider </Text>
                        <Text style={{position: "absolute", top:"225px", left:"146px", fontSize:'9', color:'#ffffff',}}>{data.providerName}</Text>
                         */}
                <Text style={{ position: 'absolute', top: '210px', left: '96px', fontSize: '8', color: '#ffffff' }}>Provider </Text>
                <Text style={{ position: 'absolute', top: '225px', left: '96px', fontSize: '7', color: '#ffffff', width: '80px' }}>
                  {data.providerName ? data.providerName : 'NA'}
                </Text>

                <Text style={{ position: 'absolute', top: '210px', left: '190px', fontSize: '8', color: '#ffffff' }}>
                  Procedure Information{' '}
                </Text>
                <Text style={{ position: 'absolute', top: '225px', left: '190px', fontSize: '9', color: '#ffffff' }}>
                  {data.procedureInformation ? data.procedureInformation : 'NA'}
                </Text>
              </>
            }
          </>
        )}
      </View>
    </Page>
  </Document>
)

const spacify = (str, after, c) => {
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

class DownloadPaymentCard extends Component {
  constructor() {
    super()
    this.state = {
      clickToDownload: false,
      tableData: []
    }
    console.log('=================Props is for downlaod pdf=====================', this.props)
  }
  componentDidMount() {
    this.getPaymentCardData()
  }

  getPaymentCardData = () => {
    let request = {
      memberNumber: '12345'
    }
    getPaymentCardData(request).then(res => {
      console.log('getPaymentCardData====', res)
      if (res) {
        this.setState({ tableData: res.data })
      }
    })
  }

  dateformat() {
    var day = moment(this.state.digitalheathcard.memberIdCardList[0].enrollmentDate).format('DD')
    var mon = moment(this.state.digitalheathcard.memberIdCardList[0].enrollmentDate).format('MM')
    var year = moment(this.state.digitalheathcard.memberIdCardList[0].enrollmentDate).format('YYYY')
    var date = mon + '/' + day + '/' + year
    this.setState({ membersince: date })
  }

  downloadCard = async event => {
    console.log('========Namita==========', event)
    let filename = this.props.cardData.memberFirstName + this.props.cardData.memberLastName + '_membercard.pdf'

    this.setState({ clickToDownload: true })
    event.preventDefault()
    const blob = await pdf(<PrintDoc data={this.props.cardData} />).toBlob()
    var blob1 = new Blob([blob], { type: 'application/octet-stream' })
    saveAs(blob, filename)
  }

  render() {
    return (
      <div>
        <div id="pdf"></div>

        <div className="actionBtnBottom">
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div className="Download_text" onClick={this.downloadCard}>
              DOWNLOAD
            </div>

            <div>
              <GetAppIcon className="share_download_icon" onClick={this.downloadCard} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DownloadPaymentCard
