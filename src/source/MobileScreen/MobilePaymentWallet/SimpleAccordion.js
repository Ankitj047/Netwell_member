import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment'
import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
// import AccordionViewModal from './AccordionViewModal'
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
      modalData: null
    }
    console.log('Accordion pros', this.state.formatedData)

    console.log('=========props data isss==========', this.props)
  }

  handleChange = panel => (event, expanded) => {
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

  openPayCard = (rowData, i) => {
    console.log('Mobile card data======', rowData, i)
    this.props.openCard(rowData, i)
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
  getExpiryDate(date) {
    const isDateValid = moment(date)['_isValid']
    if (isDateValid) {
      return moment(date).format('MMMM D')
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
              expandIcon={<ExpandMoreIcon className="collapseIcon" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="panelSummary"
            >
              <Grid container>
                <Grid container>
                  {/* <Grid item xs={5} className="itemWrap">
                      <span className={'status_button ' + data.statusClass}>{data.status}</span>
                    </Grid> */}
                </Grid>
                <Grid item xs={7} className="itemWrap">
                  <div className="Expense-Number221">{data.cardIDNumber}</div>
                  <div className="Expense-Number211">{data.cardIDNumberVal ? data.cardIDNumberVal : 'NA'}</div>
                </Grid>

                <Grid item xs={5} className="itemWrap">
                  <span className={'status_button ' + data.statusClass}>{data.status}</span>
                </Grid>

                <Grid item xs={7} className="itemWrap">
                  <div className="Expense-Number221">{data.Scheduledfor}</div>
                  <div className="Expense-Number211">
                    {this.getDate(data.ScheduledforVal)}
                    {/* {data.DateOfServiceVal} */}
                  </div>
                </Grid>

                <Grid item xs={5} className="itemWrap">
                  <div className="Expense-Number221">{data.Expireson}</div>
                  <div className="Expense-Number211">
                    {this.getExpiryDate(data.ExpiresonVal)}
                    {/* {data.DateOfServiceVal} */}
                  </div>
                </Grid>

                <Grid item xs={7} className="itemWrap">
                  <div className="Expense-Number221">{data.Member}</div>
                  <div className="Expense-Number211">
                    {data.MemberVal !== 'NA' ? (
                      <>
                        {data.MemberVal}
                        {/* {this.numberWithCommas(this.floatconversion(data.ChargedVal))} */}
                      </>
                    ) : (
                      'NA'
                    )}
                  </div>
                </Grid>

                <Grid item xs={5} className="itemWrap">
                  <div className="Expense-Number221">{data.AmountAuthorized}</div>
                  <div className="Expense-Number211">${data.AmountAuthorizedVal}</div>
                </Grid>

                <Grid item xs={7} className="itemWrap">
                  <div className="Expense-Number221">{data.Provider}</div>
                  <div className="Expense-Number211">{data.ProviderVal}</div>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails style={{ paddingLeft: '26px' }}>
              <Grid container>
                <Grid container>
                  <Grid item xs={7} className="itemWrap">
                    <div className="Expense-Number221">{data.MoreDetail.MemberLabel}</div>
                    <div className="Expense-Number211">{data.MoreDetail.MemberVal}</div>
                  </Grid>
                  <Grid item xs={5} className="itemWrap">
                    <div className="Expense-Number221">{data.MoreDetail.RepricingDiscountLabel}</div>
                    <div className="Expense-Number211">{this.getDate(data.MoreDetail.RepricingDiscountVal)}</div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} className="itemWrap">
                    <div className="Expense-Number221">{data.MoreDetail.PaidDateLabel}</div>
                    <div className="Expense-Number211">{data.MoreDetail.PaidDateVal}</div>
                  </Grid>

                  <Grid item xs={5} className="itemWrap">
                    <Button
                      variant="contained"
                      disabled={data.status == '' || data.status == 'Pending'}
                      className="viewCardBtn_mobile"
                      onClick={() => this.openPayCard(data, index)}
                    >
                      VIEW PAYMENT CARD
                    </Button>
                  </Grid>
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
            <div className="ModalWrapper">{/* <AccordionViewModal dataObj={this.state.modalData}/> */}</div>
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
