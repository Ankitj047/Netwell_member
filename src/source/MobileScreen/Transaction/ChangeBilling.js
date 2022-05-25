import { Grid, Radio } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import moment from 'moment'
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {
  createCase,
  getEnrollMemberInfoById,
  getMemberPlanData,
  getPaymentType,
  getRecurringDateData,
  getSourceCode,
  updateDraftDayData
} from '../../ApiCall'
import MobileFooter from '../MobileFooter'
import customStyle from './stylesheet_UHS'
import './transaction.css'

const PurpleRadio = withStyles(customStyle.radioBtn)(props => <Radio color="default" {...props} />)

const NextButton = withStyles(customStyle.ChangePayButton)(Button)

const ChangeBilling = () => {
  const [radioValue, setRadioValue] = React.useState(null)
  const [memberPlanData, setMemberPlanData] = React.useState(null)
  const [paymentData, setPaymentData] = React.useState(null)
  const [paymentType, setPaymentType] = React.useState(null)
  const [refresh, setRefresh] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [loader, setLoader] = React.useState(false)
  const [errorModal, setErrorModal] = React.useState(false)
  const [modalMessage, setModalMessage] = React.useState('')
  const history = useHistory()

  useEffect(() => {
    getSourceCode()
      .then(res => {
        return res
      })
      .then(res => {
        getEnrollMemberInfoById(res.data.memberIdSource).then(res => {
          getMemberPlanData(res?.data?.response?.subId).then(res => {
            setMemberPlanData(res?.data?.response || 0)
          })
        })
        getPaymentType(res.data.memberIdSource).then(res => {
          setPaymentType(res.data.response)
        })
      })
      .catch(err => {})
    getRecurringPayment()
  }, [])

  const handleCancel = () => {
    history.goBack()
  }

  const handleDone = () => {
    toggleModal(false)
    updateDraftDayData(radioValue).then(res => {
      setRadioValue(null)
      refreshRadio()
    })
    goBack()
  }

  const handleChange = event => {
    setRadioValue(event.target.value)
  }

  const goBack = () => {
    // history.goBack()
    history.push('/MyTransactionMobile')
  }

  const getRecurringDate = () => {
    if (paymentData?.recurringDate) {
      return `Your next billing date: <b>${moment(paymentData.recurringDate).format('dddd, MMMM Do, YYYY')}<b>`
    } else {
      return ''
    }
  }

  const getFirstPaymentDate = () => {
    if (memberPlanData && memberPlanData.targetDate) {
      return moment(memberPlanData.targetDate).format('dddd, MMMM Do, YYYY')
    }
    return moment(new Date()).format('dddd, MMMM Do, YYYY')
  }

  const getEffectivePaymentDate = () => {
    if (memberPlanData && memberPlanData.targetDate) {
      return moment(memberPlanData.targetDate)
        .subtract(radioValue, 'days')
        .format('dddd, MMMM Do, YYYY')
    }
    return moment(new Date())
      .subtract(radioValue, 'days')
      .format('dddd, MMMM Do, YYYY')
  }

  const getRecurringPayment = () => {
    getRecurringDateData().then(res => {
      setPaymentData(res.data.response)
    })
  }

  const refreshRadio = async () => {
    await setRefresh(true)
    await setRefresh(false)
  }

  const toggleModal = val => {
    setModalOpen(val)
  }

  const handleProceed = () => {
    updateDraftDay()
  }

  const updateDraftDay = () => {
    setLoader(true)

    createCase().then(res => {
      setModalOpen(true)
      if (res && res?.data?.success) {
        setModalMessage('Your request has been submitted.')
      } else {
        setModalMessage(
          `We could not process your request. Please contact our Member Services team at 1 (888) 366 6243, Monday through Friday 7:00 am to 6:00 pm CST or email at customerservice@universalhealthfellowship.org.`
        )
      }
    })
  }

  return (
    <div>
      <div className="mobileHeaderWrapper">
        <ArrowBackIcon style={{ width: '24px', height: '24px', color: '#ffffff' }} onClick={goBack} />
        <div className="mobileHeaderTitle" style={{ margin: '0px 9px', fontSize: '4vw' }}>
          Choose When You Want to be Charged
        </div>
      </div>

      <div style={{ padding: 15, paddingRight: 0, paddingTop: 80, overflowY: 'scroll', height: window.innerHeight - 150 }}>
        <div>{/* <p dangerouslySetInnerHTML={{ __html: getRecurringDate() }}>{}</p> */}</div>
        <div style={{ marginBottom: 10 }}>
          <p>
          You can submit a request to change your billing date. Our Member Services team will get in touch with you at the earliest and guide you through the process.
          </p>
        </div>
        <div></div>
        {/* <ChatIcon showAIChatIcon={true} shiftup={true} /> */}

        <Grid container className="Bottom-Blue">
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <NextButton variant="contained" color="primary" style={{ boxShadow: 'none' }} onClick={() => handleProceed()}>
              PROCEED
            </NextButton>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <Button variant="secondary" onClick={handleCancel} class="ButtonBGMobile">
              CANCEL
            </Button>
          </Grid>
        </Grid>

        <Modal size="lg" show={modalOpen} onHide={toggleModal} centered>
          <Modal.Header>Message</Modal.Header>
          <Modal.Body>
            {paymentData?.paymentAmount ? <span>Update recurring date and draft date successfully!</span> : <span>Member not found!</span>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDone} class="ButtonBG">
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <div class="fixed-bottom">
          <MobileFooter />
        </div>
      </div>
    </div>
  )
}

export default ChangeBilling
