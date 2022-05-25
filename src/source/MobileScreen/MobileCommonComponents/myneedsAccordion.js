import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment'
import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AccordionViewModal from './AccordionViewModal'
import './SimpleAccordion.css'
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    padding: '0px',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 120,
    paddingLeft: '5px',
    paddingRight: '5px',
    '&$expanded': {
      minHeight: 125
    }
  },

  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiAccordionDetails)
export default class SimpleAccordion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: '',
      formatedData: props.data,
      showModal: false,
      modalData: null,
      expansionPanelOpen: false
    }
    console.log('Accordion pros', this.state.formatedData)

    console.log('=========props data isss==========', this.props)
  }

  handleChange = panel => (event, expanded) => {
    console.log('expanded====', panel, expanded)
    this.setState({ expanded: expanded ? panel : false })
  }

  openModalInfo(dataIndex) {
    this.setState({
      showModal: true,
      modalData: this.state.formatedData[dataIndex]
    })
  }

  closeModalInfo() {
    this.setState({
      showModal: false
    })
  }

  //--- To get updated props on loadMore Btn click
  componentWillReceiveProps(nextProps) {
    this.setState({ formatedData: nextProps.data })
  }

  getDate(date) {
    const isDateValid = moment(date)['_isValid']
    if (isDateValid) {
      return moment(date).format('MMMM D, YYYY')
    }
    return date
  }

  numberWithCommas(x) {
    if (x) {
      if (x.toString().startsWith('$')) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    } else {
      return 'NA'
    }
  }

  floatconversion = x => {
    if (x) {
      if (x.toString().startsWith('$')) {
        let substr = x.substr(1, x.length)
        return (
          '$' +
          parseFloat(substr)
            .toFixed(2)
            .toString()
        )
      } else {
        return x.toFixed(2)
      }
    } else {
      return undefined
    }
  }

  render() {
    return (
      <div>
        {this.state.formatedData.map((data, index) => (
          <Accordion expanded={this.state.expanded === 'panel' + index} onChange={this.handleChange('panel' + index)}>
            <AccordionSummary
              //expandIcon={<KeyboardArrowRightIcon  style={{marginLeft:'-25px'}}/>}
              expandIcon={
                <ExpandMoreIcon
                  className="collapseIcon"
                  onClick={() => {
                    this.setState({
                      expansionPanelOpen: !this.state.expansionPanelOpen
                    })
                  }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="panelSummary"
            >
              <Grid container>
                <Grid item xs={8} className="itemWrap">
                  <div className="Expense-Number221">{data.ExpenseNumberLabel}</div>
                  <div className="Expense-Number211">{data.ExpenseNumberVal}</div>
                </Grid>

                <Grid item xs={4} className="itemWrap">
                  {data.status == 'Paid' || data.status == 'Denied' ? (
                    <span className={'status_button Audit'}>Complete</span>
                  ) : (
                    <span className={'status_button Logged'}>Processing</span>
                  )}
                </Grid>

                <Grid item xs={12} className="itemWrap">
                  <div className="Expense-Number221">{data.ProviderLabel}</div>
                  <div className="Expense-Number211">{data.ProviderVal}</div>
                </Grid>

                <Grid item xs={12} className="itemWrap">
                  <div className="Expense-Number221">{data.row7}</div>
                  <div className="Expense-Number211">{data.rowval7}</div>
                </Grid>

                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.DateOfServiceLabel}</div>
                  <div className="Expense-Number211">
                    {this.getDate(data.DateOfServiceVal)}
                    {/* {data.DateOfServiceVal} */}
                  </div>
                </Grid>

                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.ChargedLabel}</div>
                  <div className="Expense-Number211">
                    {/* {data.ChargedVal} */}
                    {/* ${this.floatconversion(data.ChargedVal)} */}${this.numberWithCommas(this.floatconversion(data.ChargedVal))}
                  </div>
                </Grid>

                {/* <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.row8}</div>
                  <div className="Expense-Number211">
                  {this.getDate(data.rowval8)}
                     
                      </div>

                </Grid> */}

                {/* <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.PaidLabel}</div>
                  <div className="Expense-Number211">
                  
                    ${this.numberWithCommas(this.floatconversion(data.PaidVal))}
               
                    </div>

                </Grid> */}
              </Grid>
            </AccordionSummary>
            <AccordionDetails style={{ paddingLeft: '26px' }}>
              <Grid container>
                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.DateofServiceLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.DateofServiceVal}</div>
                </Grid>
                <Grid item xs={5} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.ProviderNameLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.ProviderNameVal}</div>
                </Grid>
                {/* {
                  data.MoreDetail.EOSLabel == "" || data.MoreDetail.EOSLabel == " "
                  ?null
                  : */}
                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.BillChargeLabel}</div>
                  <div className="Expense-Number211 view_number">{data.MoreDetail.BillChargeVal}</div>

                  {/* <div className="Expense-Number211 view_number" onClick={()=>this.openModalInfo(index)}>VIEW</div> */}
                </Grid>
                {/* } */}

                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.IneligibleforSharingLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.IneligibleforSharingVal}</div>
                </Grid>
                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.DiscountToBilledChargesLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.DiscountToBilledChargesVal}</div>
                </Grid>

                <Grid item xs={5} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.EligibleforSharingLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.EligibleforSharingVal}</div>
                </Grid>

                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.NonShareableAmountLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.NonShareableAmountVal}</div>
                </Grid>
                <Grid item xs={5} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.ConsultationFeeLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.ConsultationFeeVal}</div>
                </Grid>

                <Grid item xs={6} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.MemberResponsibilityLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.MemberResponsibilityVal}</div>
                </Grid>

                <Grid item xs={5} className="itemWrap">
                  <div className="Expense-Number221">{data.MoreDetail.SharedByUHFLabel}</div>
                  <div className="Expense-Number211">{data.MoreDetail.SharedByUHFVal}</div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}

        <Modal show={this.state.showModal} onHide={() => this.closeModalInfo()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ModalWrapper">
              <AccordionViewModal dataObj={this.state.modalData} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.closeModalInfo()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.closeModalInfo()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const sampleData2 = [
  { id: 733, planId: '7006', idcardField: 'Telemedicine', fieldValue: '$0' },
  { id: 735, planId: '7006', idcardField: 'PCP Office Visit', fieldValue: '$35' },
  { id: 736, planId: '7006', idcardField: 'Urgent Care', fieldValue: '$100' },
  { id: 737, planId: '7006', idcardField: 'ER Visit', fieldValue: '$400' }
]
