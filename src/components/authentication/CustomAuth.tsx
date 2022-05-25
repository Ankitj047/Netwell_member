import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import CommonLoader from '../../source/CommonLoader';
//import AnnouncementNotificationCommon from '../../source/WebScreen/Notification/AnnouncementNotificationCommon'
//import NotificationCommon from '../../source/WebScreen/Notification/NotificationCommon'
import HealthTools from '../../source/WebScreen/HeathTools/HealthTools';
import PaymentWalletServiceCloud from '../../source/WebScreen/PaymentWallet/PaymentWalletServiceCloud';
import Signup from './CheckRegistration';
import Signin from './SignIn';

const CustomAuth = (props: any) => {
    const [toggle, setToggle] = useState(false);
    const [loadCommonComponent, setLoadCommonComponent] = useState(false);
    const [urlPath, setUrlPath] = useState(false);
    const history = useHistory();
    useEffect(() => {
        console.log('props from custom auth', props)
        StateParam();

    }, [])

    const StateParam =()=>{
        let urlValues = window.location.hash ? window.location.hash.split('=') : [];
        console.log("======== urlValues =======");
        console.log(urlValues);
        if(urlValues && urlValues.length > 0) {
            if(urlValues[1]){
                setLoadCommonComponent(true);
                getGateWayToken(urlValues[1]);  
            }
        }
    }
    const getGateWayToken = (params: any) => {
        let request = {
            "username": "admin",
            "password": "testpass"
            // "password": "x1TXVUtXL6PaBWam"
        }
        if (process.env.REACT_APP_BUILD == 'prod') {
            request.password = "x1TXVUtXL6PaBWam"
        }
        axios.post(process.env.REACT_APP_BASE_URL + "v1/login", request).then(data=>{
            let bearer = data['headers'].authorization
            var array = bearer.split("Bearer ")
            localStorage.setItem("bearerToken", array[1]);
            getDecodeData(params);
        })
    }

    const getDecodeData =(value : any)=>{
        console.log(value)
        axios.get(process.env.REACT_APP_CLIENT_ID_DETAILS + '/encrypt/decryptData?state=' + value )
          .then(response => {
              console.log("==== getDecodeData ====");
              console.log(response.data.response);

              if(response.data.response.screenName == "PaymentWallet"){
                localStorage.setItem('Member_EMPID', response.data.response.memberNumber)
                //localStorage.setItem('sourceid', '1604411970638')
                //localStorage.setItem('userMail', 'usttutella@testfor.33mail.com'); 
                setUrlPath(true);  
                history.push('/PaymentWalletServiceCloud');       
              }else if(response.data.response.screenName == "HealthToolCard"){   
                localStorage.setItem('SOURCE', response.data.response.clientSource == 'NEO' ? 'NEO' : '')             
                localStorage.setItem('USER_PORTAL', 'serviceCloud'); 
                localStorage.setItem('userMail', response.data.response.userMail); 
                localStorage.setItem('MEMBER_IDCARD_DATA', JSON.stringify(response.data.response.memberIdCardData)); 
                setUrlPath(true);  
                history.push('/HealthTools');       
              }else if(response.data.response.screenName == "Notifications"){                
                localStorage.setItem('userMail', response.data.response.userMail); 
                setUrlPath(true);  
                history.push('/MyNotification');       
              }else if(response.data.response.screenName == "AnnouncementAndNotification"){
                //localStorage.setItem('Member_EMPID', response.data.response.memberNumber)
                //localStorage.setItem('sourceid', '1604411970638')
                //localStorage.setItem('userMail', 'usttutella@testfor.33mail.com'); 
                setUrlPath(true);  
                history.push('/AnnouncementAndNotification');       
              }
              
          });
      }

    const handleToggle = () => {
        setToggle(!toggle);
    }

    if(loadCommonComponent) {
        return(<div>
            { urlPath ? 
                <Switch>
                    <Route exact path="/PaymentWalletServiceCloud" component={PaymentWalletServiceCloud} />
                    <Route exact path="/HealthTools" component={HealthTools} />
                    {/* <Route exact path="/AnnouncementAndNotification" component={AnnouncementNotificationCommon} />
                    <Route exact path="/MyNotification" component={NotificationCommon} /> */}
                    {/* <Redirect from="/" to="/PaymentWalletServiceCloud" /> */}
                </Switch>
                :<div><CommonLoader/></div>
            }
            
       </div>)
    }else{
        return (
            <Switch>
                <Route exact path="/login" component={Signin} />
                <Route exact path="/check-registration" component={Signup} />
                <Redirect from="/" to="/login" />
    
            </Switch>
        )
    }
    
    // return (
    //     <Switch>
    //         <Route exact path="/login" component={Signin} />
    //         <Route exact path="/check-registration" component={Signup} />
    //         <Redirect from="/" to="/login" />

    //     </Switch>
    // )

    // if (toggle) {
    //     return (
    //         <Signup handleToggle={handleToggle} />
    //     )
    // }
    // else {
    //     return (
    //         <div><Signin handleToggle={handleToggle} /></div>
    //     )
    // }

}
export default CustomAuth

