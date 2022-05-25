import Fab from '@material-ui/core/Fab'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ForumIcon from '@material-ui/icons/Forum'
import { withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import { getEMPI, getMyneedsEOS } from '../ApiCall'
import CommonLoader from '../CommonLoader'
import CommonFooter from './CommonFooter'
import DataTable from './DataTable'
import Header from './Header'
import './MyNeeds.css'
import customStyle from './programInfo/CSS/stylesheet_UHS.js'

const CrudButton = withStyles(customStyle.crudBtn)(Fab)
export default class MyNeeds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      loader: true,
      notfoundmsg1: '',
      notfoundmsg2: '',
      notfoundmsg3: '', 
      open: false,
    }
  }

  componentDidMount() {
    this.getEMPID()
    let urlValues  = new URLSearchParams(window.location.search);
    let a =urlValues.get('open');
    if(a==true || a=="true")
    this.setState({open: true}, ()=>{
      this.props.history.push('/MyNeeds')
    })
  }

  getEMPID() {
    getEMPI().then(res => {
      this.myneedsEOS()
    })
    // this.setState({tableData: arrayNeeds, loader: false})
  }

  myneedsEOS = () => {
    getMyneedsEOS().then(res => {
      if (res.data && res.data.length > 0) {
        this.setState({ tableData: res.data, loader: false })
      } else {
        this.setState({
          notfoundmsg1: 'No needs have been entered into the system.',
          notfoundmsg2: 'Submitted needs may take 2-3 days to be displayed here.',
          notfoundmsg3: 'For any clarifications call Customer Service.',
          loader: false
        })
      }
    })
  }

  goBack = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="progInfoMainWrapper">
        <Header name={'MyNeeds'} />
        {this.state.loader ? <CommonLoader /> : null}
        <div className="container progInfoContainer" style={{ zIndex: '0' }}>
          <sapn className="Back_page" onClick={this.goBack}>
            <ArrowBackIcon style={{ width: '24px', height: '24px', color: ' #543379', marginRight: '5px' }} onClick={this.goBack} />
            BACK
          </sapn>

          <div className="commonWrap_MyNeeds" style={{ marginTop: '15px' }}>
            <div className="progInfoSection" style={{ marginBottom: '-20px' }}>
              <h2 className="progInfoTitle">MY NEEDS</h2>
            </div>
            <div>
              <div className="tablebackgroundouter">
                {this.state.tableData && this.state.tableData.length > 0 ? (
                  <DataTable open={this.state.open} tableData={this.state.tableData} />
                ) : (
                  <>
                    <div className="data_not_found">
                      <h5 class="noneeds_msg_display">{this.state.notfoundmsg1}</h5>
                      <h5 class="noneeds_msg_display">{this.state.notfoundmsg2}</h5>
                      <h5 class="noneeds_msg_display">{this.state.notfoundmsg3}</h5>
                    </div>
                  </>
                )}
              </div>

              <div className="progInfoFooter">
                <div className="row">
                  <div className="col-md-8"></div>
                  <div className="col-md-4 dpFlex">
                    <div className="footerText" style={{ display: 'flex', flexDirection: 'row' }}>
                      <div>
                        <p>Need help?</p>
                        <p>Chat with our Health Share Representative</p>
                        <p>or call 1 (888) 366 6243.</p>
                      </div>
                      <div style={{ marginLeft: 12 }}>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 45 }}>
          <CommonFooter />
        </div>
      </div>
    )
  }

  openChat = () => {
    sessionStorage.setItem('chatwindow', true)
    this.props.history.push('/')
  }
}
const arrayNeeds =[
  {"member_id": "CNEO10421340", 
  "empi": "1015", 
  "bill_key": "20766", 
  "first_name": "Elaine", 
  "last_name": "Williams", 
  "date_paid": "2020-12-03", 
  "date_received": "2020-07-02", 
  "status": "Paid", 
  "charged_amount": 527.00, 
  "paid_amount": 451.37, 
  "paid_provider_name": "HealthWay Clinic.", 
  "start_of_service_date": "2020-03-10", 
  "end_date_of_service": "2020-03-10", 
  "nsa": 0.00, 
  "sharing_percentage": 0.0, 
  "consultation_fee": 25.0, 
  "ineligible_amount": 15.70, 
  "repricing_amount": 34.93, 
  "eligible_for_sharing": 451.37, 
  "member_responsibility": 40.70
},


]