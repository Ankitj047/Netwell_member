import { Global } from '@emotion/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import DemoReset from '../src/components/authentication/DemoReset'
import DigitalHealthCardNew from '../src/source/MobileScreen/DigitalHealthCardNew'
import HealthyShareCard from '../src/source/MobileScreen/HealthyShareCard'
import MyNeedsMobile from '../src/source/MobileScreen/MyNeedsMobile/MyNeedsMobile'
import ProgramInformation from '../src/source/WebScreen/programInfo/ProgramInformation'
import { toggleExitHealthqnAlert } from './actions/healthQnActions'
import { getLoginCount, startSession } from './actions/homeActions'
import HealthQnModule from './components/healthqn/HealthQnModule'
import Loader from './components/layout/Loader'
import Root from './components/layout/Root'
import ChatMobile from './source/MobileScreen/ChatMobileBox/ChatMobile'
import ContactScreen from './source/MobileScreen/ContactScreen'
import DocumentsScreen from './source/MobileScreen/DocumentsScreen'
import HealthToolsCard from './source/MobileScreen/HealthToolsCard'
import MobileCuramLifeCardNotification from './source/MobileScreen/MobileCuramLifeCard/MobileCuramLifeCardNotification'
import AnnouncementMobile from './source/MobileScreen/MobileNotification/AnnouncementMobile'
import MobileNotification from './source/MobileScreen/MobileNotification/MobileNotification'
import MyPaymentWalletMobile from './source/MobileScreen/MobilePaymentWallet/MyPaymentWallet'
import SendCardRequest from './source/MobileScreen/MobilePaymentWallet/SendCardRequest'
import MyTransactionMobile from './source/MobileScreen/MyTransactionMobile/MyTransactionMobile'
import ChangeBilling from './source/MobileScreen/Transaction/ChangeBilling.js'
import MobileTransaction from './source/MobileScreen/Transaction/PaymentMode.js'
import NewMedical from './source/modules/Medical/NewMedical'
import NewMobileMedical from './source/modules/Medical/NewMobileMedical'
import MedicalDetails from './source/modules/MedicalDetails/MedicalDetails'
import MobileMedicalDetails from './source/modules/MedicalDetails/MobileMedicalDetail'
import WebMobileRoot from './source/WebMobileRoot'
import ChatSearch from './source/WebScreen/ChatBox/ChatSearch'
import CuramLifeCardNotification from './source/WebScreen/CuramLifeCard/CuramLifeCardNotification'
import IdleSessionHandle from './source/WebScreen/IdleSessionHandle'
import Transaction from './source/WebScreen/My Transaction/Transaction'
import MyNeeds from './source/WebScreen/MyNeeds'
import AnnouncementNotification from './source/WebScreen/Notification/AnnouncementNotification'
import Notification from './source/WebScreen/Notification/Notification'
import PaymentWallet from './source/WebScreen/PaymentWallet/PaymentWallet'
import PaymentWalletServiceCloud from './source/WebScreen/PaymentWallet/PaymentWalletServiceCloud'
import PaymentMode from './source/WebScreen/Transaction/PaymentMode.js'
import globals from './styles/globals'
import normalize from './styles/normalize'

const Routes: React.SFC = (props: any) => {
  React.useEffect(() => {
    startSession().then((data: any) => {
      if (!sessionStorage.loginAPICalled) {
        props.getLoginCount()
      }
    })
  }, [])

  return (
    <Root>
      <Global styles={normalize} />
      <Global styles={globals} />
      <IdleSessionHandle />
      <Switch>
        <Route exact path="/" component={WebMobileRoot} />
        <Route exact path="/askCaryn" component={ChatSearch} />
        <Route path="/Medical" component={NewMedical} />
        <Route path="/DigitalHealthCardNew" component={DigitalHealthCardNew} />
        <Route path="/HealthyShareCard" component={HealthyShareCard} />
        <Route path="/ChatMobile" component={ChatMobile} />
        <Route path="/DocumentsScreen" component={DocumentsScreen} />
        <Route path="/ContactScreen" component={ContactScreen} />
        <Route path="/MedicalDetail" component={MedicalDetails} />
        <Route path="/DemoReset" component={DemoReset} />
        <Route path="/MyNeedsMobile" component={MyNeedsMobile} />
        <Route path="/MobileMedicalDetail" component={MobileMedicalDetails} />
        <Route path="/MobileMedical" component={NewMobileMedical} />
        <Route path="/HealthToolsCard" component={HealthToolsCard} />
        <Route exact path="/MyNeeds" component={MyNeeds} />
        <Route exact path="/Transaction/payment" component={Transaction} />
        <Route exact path="/Transaction/billing" component={Transaction} />
        <Route exact path="/Transaction" component={Transaction} />
        <Route path="/PaymentWallet" component={PaymentWallet} />
        <Route path="/PaymentWalletServiceCloud" component={PaymentWalletServiceCloud} />
        <Route path="/ProgramInformation" component={ProgramInformation} />
        <Route path="/ProgramInformation/changeDependants" component={ProgramInformation} />
        <Route path="/PaymentMode" component={PaymentMode} />
        <Route path="/MobileTransaction" component={MobileTransaction} />
        <Route path="/ChangeBilling" component={ChangeBilling} />
        <Route path="/MyTransactionMobile" component={MyTransactionMobile} />
        <Route path="/MyPaymentWalletMobile" component={MyPaymentWalletMobile} />
        <Route path="/SendCardRequest" component={SendCardRequest} />
        <Route path="/Notification" component={Notification} />
        <Route path="/AnnouncementNotification" component={AnnouncementNotification} />
        <Route path="/CuramLifeCardNotification" component={CuramLifeCardNotification} />
        <Route path="/MobileNotification" component={MobileNotification} />
        <Route path="/AnnouncementMobile" component={AnnouncementMobile} />
        <Route path="/MobileCuramLifeCardNotification" component={MobileCuramLifeCardNotification} />
        <Redirect from="*" to="/" />
        <Route exact path="/healthqns" component={HealthQnModule} />
      </Switch>
      <Loader showLoader={props.showLoader} />
    </Root>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    showLoader: state.home.showGlobalLoader,
    healthqnInEditMode: state.healthQn.healthqnInEditMode
  }
}
export default connect(mapStateToProps, { getLoginCount, toggleExitHealthqnAlert })(Routes)
