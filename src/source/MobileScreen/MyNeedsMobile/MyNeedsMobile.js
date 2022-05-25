import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import { getCardEnableData, getEMPI, getMyneedsEOS } from '../../ApiCall'
import CommonLoader from '../../CommonLoader'
import ChatIcon from '../../WebScreen/ChatBox/ChatIcon'
import MobCopyright from '../MobCopyright'
import MyNeedsSimpleAccordion from '../MobileCommonComponents/myneedsAccordion'
import MobileHeader from '../MobileHeader'
import MobileFooter from './../MobileFooter'

export default class MyNeedsMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      sampleData: sampleData,
      response: [],
      formatedjsonData: null,
      page: 0,
      loader: true,
      loadMoreBtnshow: false,
      notfoundmsg1: '',
      notfoundmsg2: '',
      notfoundmsg3: ''
    }
  }

  componentDidMount() {
    this.getCardEnable()
    this.getEMPID()
    this.callapi()
  }

  getEMPID() {
    getEMPI().then(res => {
      console.log('=============getEMPI===========', res)
    })
  }

  callapi() {
    getMyneedsEOS(this.state.page).then(res => {
      console.log('==============MY needs data mobile===========', res.data)
      if (res.data.length > 0) {
        this.setState({ response: res.data, loader: false })
      } else {
        this.setState({
          notfoundmsg1:
            'No needs have been entered into the system. Submitted needs may take 2-3 days to be displayed here. For any clarifications call Customer Service.',
          loader: false
        })
      }

      if (res.data.length > 10) {
        this.setState({ loadMoreBtnshow: true })
      }
      this.setState({ response: res.data, page: this.state.page + 1, loader: false })
      this.createjson()
    })
  }

  callapiLoadmore() {
    this.setState({ loader: true })
    getMyneedsEOS(this.state.page).then(res => {
      console.log('==============TRansaction data mobile===========', res.data)
      console.log('my loade more res===', res)
      var resnew = res.data
      var data = this.state.response
      var newdata = data.concat(resnew)

      console.log('new data loade more is==', newdata)

      if (res.data.totalrecords === newdata.length) {
        this.setState({ loadMoreBtnshow: false })
      }
      this.setState({ response: newdata, loader: false, page: this.state.page + 1 })
      this.createjson()
    })
  }

  getCardEnable = () => {
    let client_id = localStorage.getItem('CLIENT_ID')

    getCardEnableData(client_id, 'MyNeeds').then(res => {
      console.log('getCardEnableData=====', res.data.response.enable)

      if (res.data.response.enable == 'false' || res.data.response.enable == false) {
        window.location.href = '/'
      }
    })
  }
  combineDate = (x, y) => {
    if (x == y) {
      return x
    }

    const z = x + '-' + y
    return z
  }
  createjson() {
    var formatredjson = []

    this.state.response.map((item, i) => {
      var newobject = {}
      newobject.ExpenseNumberLabel = 'Expense Number'
      newobject.ExpenseNumberVal = item.bill_key

      newobject.DateOfServiceLabel = 'Date of Service'
      newobject.DateOfServiceVal = item.service_date

      newobject.statusClass = item.status
      newobject.status = item.status

      newobject.ProviderLabel = 'Provider'
      newobject.ProviderVal = item.paid_provider_name

      newobject.ChargedLabel = 'Charged'
      newobject.ChargedVal = item.charged_amount

      newobject.PaidLabel = 'Paid'
      newobject.PaidVal = item.paid_amount

      newobject.row7 = 'Member'
      newobject.rowval7 = item.first_name + ' ' + item.last_name

      newobject.row8 = 'Paid Date'
      newobject.rowval8 = item.date_received

      var innerobject = {
        DateofServiceLabel: 'Date(s) of Service',
        DateofServiceVal: this.combineDate(item.start_of_service_date, item.end_date_of_service),

        ProviderNameLabel: 'Provider',
        ProviderNameVal: item.paid_provider_name,

        BillChargeLabel: 'Billed Charges',
        BillChargeVal: '$' + item.charged_amount,

        IneligibleforSharingLabel: 'Ineligible for Sharing',
        IneligibleforSharingVal: '$' + item.ineligible_amount,

        DiscountToBilledChargesLabel: 'Discount to Billed Charges',
        DiscountToBilledChargesVal: '$' + item.repricing_amount,

        EligibleforSharingLabel: 'Eligible for Sharing',
        EligibleforSharingVal: '$' + item.eligible_for_sharing,

        NonShareableAmountLabel: 'Non-Shareable Amount',
        NonShareableAmountVal: '$' + item.nsa,

        ConsultationFeeLabel: 'Consultation Fee',
        ConsultationFeeVal: '$' + item.consultation_fee,

        MemberResponsibilityLabel: 'Member Responsibility',
        MemberResponsibilityVal: '$' + item.member_responsibility,

        SharedByUHFLabel: 'Shared By UHF',
        SharedByUHFVal: '$' + item.paid_amount
      }

      newobject.MoreDetail = innerobject

      formatredjson = formatredjson.concat(newobject)
    })

    this.setState({ formatedjsonData: formatredjson })
  }

  render() {
    const { formatedjsonData } = this.state
    return (
      <div className="">
        {this.state.loader ? <CommonLoader /> : null}
        <MobileHeader name="My Needs" />

        {/* ------------------------------------------------ */}
        {this.state.formatedjsonData ? (
          <div className="mobileCommonBody">
            <div>
              <MyNeedsSimpleAccordion data={formatedjsonData} />

              {this.state.loadMoreBtnshow ? (
                <div className="loadMoreWrapper">
                  <button className="loadMoreBtn" onClick={() => this.callapiLoadmore()}>
                    Load More
                  </button>
                </div>
              ) : null}

              {this.state.notfoundmsg1 == '' ? (
                <Grid container style={{ padding: '10px', backgroundColor: 'white' }}>
                  <span style={{ fontStyle: 'Roboto', fontWeight: '500' }}>
                    **For complete status, please refer to the Explanation of Sharing (EOS) mailed to your address on file
                  </span>
                </Grid>
              ) : null}
            </div>

            {this.state.notfoundmsg1 == '' ? null : (
              <div style={{ padding: '180px 0px', textAlign: 'center' }} className="mobile_data_not_found">
                {this.state.notfoundmsg1}
              </div>
            )}
          </div>
        ) : null}

        {/* {this.state.loader ? null : (
          <div style={{ bottom: '9vh', position: 'fixed', display: 'flex', flexDirection: 'column' }}>
            <ChatIcon showAIChatIcon={true} />
            <div >
              <ChatIcon />
            </div>
            <div style={{ bottom: '9vh', position: 'fixed' }}>
              <MobCopyright />
            </div>
          </div>
        )} */}
        {/* <MobileFooter /> */}
        {/* <div class="fixed-bottom">
          <MobileFooter name="My Needs" />
        </div> */}
        {this.state.loader ? null : (
          <div>
            <div style={{ bottom: '6vh', position: 'relative' }}>
            <ChatIcon showAIChatIcon={true} />
            <ChatIcon />
            <MobCopyright />
          </div>
        
          <div class="fixed-bottom">
            <MobileFooter name="My Needs"/>
          </div>
      
        </div>)}
      </div>
    )
  }
}

const sampleData2 = [
  { id: 733, planId: '7006', idcardField: 'Telemedicine', fieldValue: '$0' },
  { id: 735, planId: '7006', idcardField: 'PCP Office Visit', fieldValue: '$35' },
  { id: 736, planId: '7006', idcardField: 'Urgent Care', fieldValue: '$100' },
  { id: 737, planId: '7006', idcardField: 'ER Visit', fieldValue: '$400' },
  { id: 737, planId: '7006', idcardField: 'ER Visit', fieldValue: '$400' },
  { id: 737, planId: '7006', idcardField: 'ER Visit', fieldValue: '$400' }
]
const sampleData = [
  {
    ExpenseNumberLabel: 'Expense Number',
    ExpenseNumberVal: '1248',
    DateOfServiceLabel: 'Date of Service',
    DateOfServiceVal: 'July 22, 2020',
    statusClass: 'InReview',
    status: 'In Review',
    ProviderLabel: 'Provider',
    ProviderVal: 'Healthway Clinic',
    ChargedLabel: 'Charged',
    ChargedVal: '$505.00',
    PaidLabel: 'Paid',
    PaidVal: 'NA',
    MoreDetail: {
      MemberLabel: 'Member',
      MemberVal: 'Jane Doe',
      PaidDateLabel: 'Paid Date',
      PaidDateVal: 'May 27, 2020',
      EOSLabel: 'EOS',
      RepricingDiscountLabel: 'Repricing Discount',
      RepricingDiscountVal: '$4800.00',
      IneligibleAmountLabel: 'Ineligible Amount',
      IneligibleAmountVal: '$0.00',
      NonSharableAmountLabel: 'Non-Sharable Amount',
      NonSharableAmountVal: '$1000.00',
      ConsultationFeeLabel: 'Consultation Fee',
      ConsultationFeeVal: '$300.00',
      SharingPercentageLabel: 'Sharing Percentage',
      SharingPercentageVal: '$320.00'
    }
  },
  {
    ExpenseNumberLabel: 'Expense Number',
    ExpenseNumberVal: '1259',
    DateOfServiceLabel: 'Date of Service',
    DateOfServiceVal: 'July 20, 2020',
    statusClass: 'Final',
    status: 'Final',
    ProviderLabel: 'Provider',
    ProviderVal: 'Apollo Hospital',
    ChargedLabel: 'Charged',
    ChargedVal: '$350.00',
    PaidLabel: 'Paid',
    PaidVal: '$1800.00',
    MoreDetail: {
      MemberLabel: 'Member',
      MemberVal: 'Marry Jim',
      PaidDateLabel: 'Paid Date',
      PaidDateVal: 'Feb 27, 2020',
      EOSLabel: 'EOS',
      RepricingDiscountLabel: 'Repricing Discount',
      RepricingDiscountVal: '$2500.00',
      IneligibleAmountLabel: 'Ineligible Amount',
      IneligibleAmountVal: '$20.00',
      NonSharableAmountLabel: 'Non-Sharable Amount',
      NonSharableAmountVal: '$1500.00',
      ConsultationFeeLabel: 'Consultation Fee',
      ConsultationFeeVal: '$350.00',
      SharingPercentageLabel: 'Sharing Percentage',
      SharingPercentageVal: '$420.00'
    }
  },
  {
    ExpenseNumberLabel: 'Expense Number',
    ExpenseNumberVal: '1248',
    DateOfServiceLabel: 'Date of Service',
    DateOfServiceVal: 'July 22, 2020',
    statusClass: 'InReview',
    status: 'In Review',
    ProviderLabel: 'Provider',
    ProviderVal: 'Healthway Clinic',
    ChargedLabel: 'Charged',
    ChargedVal: '$505.00',
    PaidLabel: 'Paid',
    PaidVal: 'NA',
    MoreDetail: {
      MemberLabel: 'Member',
      MemberVal: 'Jane Doe',
      PaidDateLabel: 'Paid Date',
      PaidDateVal: 'May 27, 2020',
      EOSLabel: 'EOS',
      RepricingDiscountLabel: 'Repricing Discount',
      RepricingDiscountVal: '$4800.00',
      IneligibleAmountLabel: 'Ineligible Amount',
      IneligibleAmountVal: '$0.00',
      NonSharableAmountLabel: 'Non-Sharable Amount',
      NonSharableAmountVal: '$1000.00',
      ConsultationFeeLabel: 'Consultation Fee',
      ConsultationFeeVal: '$300.00',
      SharingPercentageLabel: 'Sharing Percentage',
      SharingPercentageVal: '$320.00'
    }
  },
  {
    ExpenseNumberLabel: 'Expense Number',
    ExpenseNumberVal: '1259',
    DateOfServiceLabel: 'Date of Service',
    DateOfServiceVal: 'July 20, 2020',
    statusClass: 'Final',
    status: 'Final',
    ProviderLabel: 'Provider',
    ProviderVal: 'Apollo Hospital',
    ChargedLabel: 'Charged',
    ChargedVal: '$350.00',
    PaidLabel: 'Paid',
    PaidVal: '$1800.00',
    MoreDetail: {
      MemberLabel: 'Member',
      MemberVal: 'Marry Jim',
      PaidDateLabel: 'Paid Date',
      PaidDateVal: 'Feb 27, 2020',
      EOSLabel: 'EOS',
      RepricingDiscountLabel: 'Repricing Discount',
      RepricingDiscountVal: '$2500.00',
      IneligibleAmountLabel: 'Ineligible Amount',
      IneligibleAmountVal: '$20.00',
      NonSharableAmountLabel: 'Non-Sharable Amount',
      NonSharableAmountVal: '$1500.00',
      ConsultationFeeLabel: 'Consultation Fee',
      ConsultationFeeVal: '$350.00',
      SharingPercentageLabel: 'Sharing Percentage',
      SharingPercentageVal: '$420.00'
    }
  },
  {
    ExpenseNumberLabel: 'Expense Number',
    ExpenseNumberVal: '1248',
    DateOfServiceLabel: 'Date of Service',
    DateOfServiceVal: 'July 22, 2020',
    statusClass: 'InReview',
    status: 'In Review',
    ProviderLabel: 'Provider',
    ProviderVal: 'Healthway Clinic',
    ChargedLabel: 'Charged',
    ChargedVal: '$505.00',
    PaidLabel: 'Paid',
    PaidVal: 'NA',
    MoreDetail: {
      MemberLabel: 'Member',
      MemberVal: 'Jane Doe',
      PaidDateLabel: 'Paid Date',
      PaidDateVal: 'May 27, 2020',
      EOSLabel: 'EOS',
      RepricingDiscountLabel: 'Repricing Discount',
      RepricingDiscountVal: '$4800.00',
      IneligibleAmountLabel: 'Ineligible Amount',
      IneligibleAmountVal: '$0.00',
      NonSharableAmountLabel: 'Non-Sharable Amount',
      NonSharableAmountVal: '$1000.00',
      ConsultationFeeLabel: 'Consultation Fee',
      ConsultationFeeVal: '$300.00',
      SharingPercentageLabel: 'Sharing Percentage',
      SharingPercentageVal: '$320.00'
    }
  },
  {
    ExpenseNumberLabel: 'Expense Number',
    ExpenseNumberVal: '1259',
    DateOfServiceLabel: 'Date of Service',
    DateOfServiceVal: 'July 20, 2020',
    statusClass: 'Final',
    status: 'Final',
    ProviderLabel: 'Provider',
    ProviderVal: 'Apollo Hospital',
    ChargedLabel: 'Charged',
    ChargedVal: '$350.00',
    PaidLabel: 'Paid',
    PaidVal: '$1800.00',
    MoreDetail: {
      MemberLabel: 'Member',
      MemberVal: 'Marry Jim',
      PaidDateLabel: 'Paid Date',
      PaidDateVal: 'Feb 27, 2020',
      EOSLabel: 'EOS',
      RepricingDiscountLabel: 'Repricing Discount',
      RepricingDiscountVal: '$2500.00',
      IneligibleAmountLabel: 'Ineligible Amount',
      IneligibleAmountVal: '$20.00',
      NonSharableAmountLabel: 'Non-Sharable Amount',
      NonSharableAmountVal: '$1500.00',
      ConsultationFeeLabel: 'Consultation Fee',
      ConsultationFeeVal: '$350.00',
      SharingPercentageLabel: 'Sharing Percentage',
      SharingPercentageVal: '$420.00'
    }
  }
]
