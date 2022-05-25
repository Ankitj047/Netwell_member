//aws amplfy
import Amplify, { Auth } from 'aws-amplify';
import { ConnectedRouter } from 'connected-react-router';
// import { Store } from 'redux'
import { History } from 'history';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import awsconfig from './aws-exports';
// import { ApplicationState } from './store'
// import LayoutContainer from './containers/LayoutContainer'
// import * as themes from './styles/theme'
import CustomAuth from './components/authentication/CustomAuth';
import firebase from './firebase';
// import { ThemeProvider } from 'emotion-theming'
import Routes from './routes';
import { saveUserNotification } from './source/ApiCall';

Amplify.configure(awsconfig);


// Any additional component props go here.
interface MainProps {
  store: any
  history: History
}


// Create an intersection type of the component props and our Redux props.
const Main: any = ({ store, history }: any) => {

  // let route_history = useHistory();
  // let location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //const msg=firebase.messaging()
    sessionStorage.setItem("chatwindow", 'false');
    const msg = firebase.messaging.isSupported() ? firebase.messaging() : null;

    if(msg){
      msg.requestPermission().then(()=>{
        return msg.getToken()
      }).then(token=>{
        localStorage.setItem("TOKEN_TYPE",'web')
        localStorage.setItem("firebaseToken",token)
        console.log("Fireabse token iss===",token);
      });

      msg.onMessage(payload => {
        console.log("onMessage:+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ", payload);
      });
    }

   

    if(sessionStorage.getItem('USER_ACTIVE_SESSION') === 'true'){
      setIsLogged(true)
      setIsLoading(false)
      localStorage.setItem('isLogged', 'true');
    } else {
      Auth.currentSession().then((session: any) => {
        parseJwt(session.idToken.jwtToken)
        setIsLogged(true)
        setIsLoading(false)
        localStorage.setItem('isLogged', 'true');
        saveUserNotificationDetails()
      }).catch((error: any) => {
        setIsLogged(false)
        setIsLoading(false)
        localStorage.setItem('isLogged', 'false')
      })
    }





  }, [])

  const saveUserNotificationDetails = () => {
    let email=localStorage.getItem('userMail')
    let phone=localStorage.getItem('phone')
    let username=localStorage.getItem('subscriberName')
    let firebase=localStorage.getItem('firebaseToken')
    let type=localStorage.getItem('TOKEN_TYPE')
    let client_id=localStorage.getItem("CLIENT_ID")
    let obj={
      "email":email,
      "phone":phone,
      "username":username,
      "token":firebase,
      "type":type,
      "clientId":client_id
    }
    console.log("Main tsx saveUserObject=====",obj)
    saveUserNotification(obj)
      .then(res=>{
        console.log("seva user++++++++")
      })
  }

  const parseJwt = (token: any) => {
    // console.log('inside parse')
    // console.log('token:' + token)
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    var token = JSON.parse(jsonPayload)
    // console.table(token)
    localStorage.setItem('userMail', token.email)
    localStorage.setItem('subscriberName', token.name)
    localStorage.setItem('phone', token.phone_number)
    localStorage.setItem('cognitoUsername', token['cognito:username'])
    localStorage.setItem('isLogged', 'true');
    if(localStorage.getItem('popupShow') && localStorage.getItem('popupShow') === 'false' ){
      localStorage.setItem('popupShow', 'false')
    } else {
      localStorage.setItem('popupShow','true');
    }

    if(localStorage.getItem('healthQuestionModal') && localStorage.getItem('healthQuestionModal') === 'false' ){
      localStorage.setItem('healthQuestionModal', 'false')
    } else {
      localStorage.setItem('healthQuestionModal','true');
    }

    return token.email;
  }

  if (isLoading) {
    return (
      null
    )
  }
  else {
    if (!isLogged) {
      return (
        <Provider store={store} >
          <ConnectedRouter history={history}>
            <CustomAuth />
          </ConnectedRouter>
        </Provider >

      )
    } else {
      return (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      )
    }
  }



}

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default Main
// export default withAuthenticator(Main, true);
