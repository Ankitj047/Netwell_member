import axios from 'axios'
import apiService from '../utils/apiservice'

export const saveUserNotification = obj => {
  return apiService
    .post(process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'saveUser', obj)

    .then(response => {
      return response
    })
    .catch()
}

export const getCuramLife = async obj => {
  let mail = localStorage.getItem('userMail')
  var request = { email: mail }
  var memberSSN
  const res = await apiService.post(process.env.REACT_APP_BASE_URL + 'v2/memberportal/idcard', request)
  if (res?.data?.memberIdCardList[0]?.memberSSN) {
    memberSSN = res.data.memberIdCardList[0].memberSSN
  } else {
    memberSSN = ''
  }
  let object = {
    memberSSN: memberSSN,
    type: 'family'
  }
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/csrportal/getcuramlife', object)
    .then(response => {
      return response
    })
    .catch()
}

export const updateNotificationStatus = obj => {
  return apiService
    .post(process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'updateNotificationStatus', obj)
    .then(response => {
      return response
    })
    .catch()
}
export const getNotificationDetails = page => {
  let mail = localStorage.getItem('userMail')
  if (page === undefined || page === null) {
    let URL = process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'getNotificationDetails/' + mail
    return apiService
      .get(URL)
      .then(response => {
        return response
      })
      .catch()
  } else {
    let URL = process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'getNotificationDetails/' + mail + '?page=' + page + '&size=20'
    return apiService
      .get(URL)
      .then(response => {
        return response
      })
      .catch()
  }
}

export const getAnnouncemetDetails = page => {
  let mail = localStorage.getItem('userMail')
  if (page === undefined || page === null) {
    let URL = process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'getAnnouncemetDetails'
    return apiService
      .get(URL)
      .then(response => {
        return response
      })
      .catch()
  } else {
    let URL = process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'getAnnouncemetDetails/' + '?page=' + page + '&size=20'
    return apiService
      .get(URL)
      .then(response => {
        return response
      })
      .catch()
  }
}

export const getNotificationDetailsMobile = () => {
  let mail = localStorage.getItem('userMail')

  let URL = process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'getNotificationDetails/' + mail
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getCardEnableData = (clientID, cardTitle) => {
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getCard/' + clientID + '/' + cardTitle
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch(e => console.log(e.message))
}

export const getSourceID = () => {
  let mail = localStorage.getItem('userMail')
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getSourceId/' + mail
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getEnrollMemberInfoById = memberId => {
  let URL = process.env.REACT_APP_CLIENT_ID_DETAILS + '/enrollment/getEnrollMemberInfoById/' + memberId
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getNetworkName = plainid => {
  console.log('==============page no is======', plainid)
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getProviderNetwork/' + plainid
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getTransactionData = () => {
  let sourceid = localStorage.getItem('sourceid')
  let URL =
    process.env.REACT_APP_NEW_BASE_URL_TRANSACTION +
    'transaction/transactionHistory?searchKey=source&searchValue=' +
    sourceid +
    '&orderKey=createdDate&order=desc'
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getNeoTransaction = () => {
  let email = localStorage.getItem('userMail')
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getMytransactionReport/' + email //process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getMytransactionReport/' + email;
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getNeoTransactionMobile = page => {
  let email = localStorage.getItem('userMail')
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getMytransactionReport/' + email + '?page=' + page + '&size=10' //process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getMytransactionReport/' + email +'&page='+page+'&size=10';
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const MobilegetTransactionData = page => {
  console.log('==============page no is======', page)

  let sourceid = localStorage.getItem('sourceid')
  let URL =
    process.env.REACT_APP_NEW_BASE_URL_TRANSACTION +
    'transaction/transactionHistory?searchKey=source&searchValue=' +
    sourceid +
    '&orderKey=createdDate&order=desc' +
    '&page=' +
    page +
    '&size=10'
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

// -----------draft day API=================
export const getRecurringDateData = () => {
  let sourceid = localStorage.getItem('sourceid')
  let URL = process.env.REACT_APP_NEW_BASE_URL_TRANSACTION + 'adminportal/getRecurringDate/' + sourceid
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const updateDraftDayData = day => {
  let sourceid = localStorage.getItem('sourceid')
  let request = {
    source: sourceid,
    draftDay: day
  }
  let URL = process.env.REACT_APP_NEW_BASE_URL_TRANSACTION + 'transaction/updateDraftDay/'
  return apiService
    .post(URL, request)
    .then(response => {
      return response
    })
    .catch()
}

export const getMemberPlanData = subId => {
  let sourceid = localStorage.getItem('sourceid')
  let URL = process.env.REACT_APP_CLIENT_ID_DETAILS + '/plan/getMemberPlan/' + subId
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}
export const getPaymentType = empID => {
  let URL = process.env.REACT_APP_NEW_BASE_URL_TRANSACTION + 'adminportal/getMemberAmount/' + empID
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

// =====================================
export const getAgentInfo = sourceid => {
  // alert(sourceid)
  // let sourceid = localStorage.getItem('sourceid');
  let URL = process.env.REACT_APP_NEW_BASE_URL_AGENT_DETAIL + 'api/v4/enrollment/getAgentDetails/' + sourceid
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getProgramInfo = () => {
  let mail = localStorage.getItem('userMail')
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getProgramInformation/' + mail
  return apiService
    .get(URL)
    .then(response => {
      console.log(response)
      return response
    })
    .catch()
}
export const getSendNeedsToContactAddress = () => {
  var client_id_locale = localStorage.getItem('CLIENT_ID')
  var network = localStorage.getItem('NETWORK_NAME')
  switch (network) {
    case 'PHCS':
      return client_id_locale === '5541' || client_id_locale === '4377'
        ? 'PO Box 21082 Eagan, MN 55121'
        : 'P.O. Box 211223, Eagan, MN 55121'
    case 'Smartshare':
      return 'P.O. Box 211223, Eagan, MN 55121'
    case 'smartshare25':
      return '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'
    case 'smartshare50':
      return '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'
    case 'healthyLife':
      return client_id_locale === '5541' || client_id_locale === '4377'
        ? 'PO Box 21082 Eagan, MN 55121'
        : '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'

    case 'AFMC':
      return 'Arizona Foundation, PO Box 2909, Phoenix, AZ 85062-2909'
    case 'HLC':
      return '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'
    // return (client_id_locale === "5558" || client_id_locale==="4386") ?
    // 'P.O. Box 211223, Eagan, MN 55121':
    //        '4555 Mansell Road, Suite 300 Alpharetta, GA 30022'
    default:
      break
  }
}

export const getprogramPlanName = programName => {
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/findProgramInformation/' + programName
  console.log(URL)
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}
export const getEncryptData = obj => {
  return apiService
    .post(process.env.REACT_APP_NEW_BASE_URL_AGENT_DETAIL + 'api/v4/encrypt/encryptData', obj)
    .then(response => {
      return response
    })
    .catch()
}
export const getClientDetails = clientId => {
  return apiService
    .post(process.env.REACT_APP_CLIENT_ID_DETAILS + '/enrollment/getClient', clientId)
    .then(response => {
      return response
    })
    .catch()
}

export const gethealthcard = async () => {
  let mail = localStorage.getItem('userMail')
  var request = { email: mail }
  const res = await apiService.post(process.env.REACT_APP_BASE_URL + 'v2/memberportal/idcard', request)
  if (res?.data?.memberIdCardList[0]?.memberSSN) {
    localStorage.setItem('memberSSN', res.data.memberIdCardList[0].memberSSN)
  } else {
    localStorage.setItem('memberSSN', '')
  }

  return res
  /*.then(response => {
    console.log("getHealthcard== v2 responseee", response)
    return response;
  }).catch((error) => {

  })*/
}
//dev.fabric.carynhealth.com/api/v1/memberportal/caseCreation

export const createCase = () => {
  let URL = 'https://dev.fabric.carynhealth.com/api/v1/memberportal/caseCreation'
  let obj = {
    Description: 'Request to change billing date',
    Subject: localStorage.getItem('sourceid'),
    Type: 'Account Update'
  }
  return apiService.post(URL, obj).then(response => {
    return response
  })
}

export const getAccountNumber = () => {
  let sourceid = localStorage.getItem('sourceid')
  let URL = process.env.REACT_APP_NEW_BASE_URL_TRANSACTION + 'transaction/getLast4AccountNumber/' + sourceid
  return apiService.get(URL).then(response => {
    return response
  })
}

export const storeTransaction = obj => {
  console.log('==================objeect==================', obj)
  let sourceid = localStorage.getItem('sourceid')
  let URL = process.env.REACT_APP_NEW_BASE_URL_TRANSACTION + 'transaction/storeTransaction'
  return apiService
    .post(URL, obj)
    .then(response => {
      return response
    })
    .catch()
}

export const getExpensLimit = () => {
  let mail = localStorage.getItem('userMail')
  var request = {
    email: mail,
    type: 'expense'
  }
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/planinfo', request)
    .then(response => {
      console.log('expense limit ==', response)
      return response
    })
    .catch(error => {
      // dispatch({
      //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     payload: false
      // });
      // handleError(error)
    })
}

// ===========================provider link==================
// welcomekit findaprovider
// mails
// Transuser4@ahpatest.33mail.com
// avishkarp@perscitussln.com
// afatrans20@ahpatest.33mail.com

export const getproviderLink = () => {
  let mail = localStorage.getItem('userMail')
  let request = { email: mail, type: 'findaprovider' }
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/planinfo', request)
    .then(response => {
      console.log('PROVIDER LINK ISSS==', response)
      return response

      // if (response.data.memberIdCardList != null) {
      //     console.table(response.data.memberIdCardList)
      //     dispatch({
      //         type: FETCHING_HEALTH_CARD_SUCCESS,
      //         payload: response.data
      //     });
      // } else {
      //     // closing the loading window if memberIdCardList returns null

      //     // dispatch({
      //     //     type: FETCHING_HEALTH_CARD_FAILED,
      //     //     payload: response.data
      //     // });
      //     // dispatch({
      //     //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     //     payload: false
      //     // });
      //     alert('Data not available.')
      // }
    })
    .catch(error => {
      // dispatch({
      //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     payload: false
      // });
      // handleError(error)
    })
}

export const getSourceCode = () => {
  let mail = localStorage.getItem('userMail')
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getSourceId/' + mail
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

export const getWelcomeBooklet = () => {
  let mail = localStorage.getItem('userMail')
  let request = { email: mail, type: 'welcomekit' }
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/planinfo', request)
    .then(response => {
      console.log('Welcome Letter link', response)
      return response

      // if (response.data.memberIdCardList != null) {
      //     console.table(response.data.memberIdCardList)
      //     dispatch({
      //         type: FETCHING_HEALTH_CARD_SUCCESS,
      //         payload: response.data
      //     });
      // } else {
      //     // closing the loading window if memberIdCardList returns null

      //     // dispatch({
      //     //     type: FETCHING_HEALTH_CARD_FAILED,
      //     //     payload: response.data
      //     // });
      //     // dispatch({
      //     //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     //     payload: false
      //     // });
      //     alert('Data not available.')
      // }
    })
    .catch(error => {
      // dispatch({
      //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     payload: false
      // });
      // handleError(error)
    })
}

export const getsharingguidlineslink = () => {
  let mail = localStorage.getItem('userMail')
  let request = { email: mail, type: 'guidelines' }
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/planinfo', request)
    .then(response => {
      console.log('PROVIDER LINK ISSS==', response)
      return response

      // if (response.data.memberIdCardList != null) {
      //     console.table(response.data.memberIdCardList)
      //     dispatch({
      //         type: FETCHING_HEALTH_CARD_SUCCESS,
      //         payload: response.data
      //     });
      // } else {
      //     // closing the loading window if memberIdCardList returns null

      //     // dispatch({
      //     //     type: FETCHING_HEALTH_CARD_FAILED,
      //     //     payload: response.data
      //     // });
      //     // dispatch({
      //     //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     //     payload: false
      //     // });
      //     alert('Data not available.')
      // }
    })
    .catch(error => {
      // dispatch({
      //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     payload: false
      // });
      // handleError(error)
    })
}

export const getHealthqnInfo = () => {
  let mail = localStorage.getItem('userMail')
  // let request = { email: mail };
  // let request = { email: 'madhu.murugan@ust-global.com', type: 'guidelines' }
  let request = { subscriberIdSource: localStorage.getItem('sourceid') }
  return apiService
    .post(process.env.REACT_APP_BASE_URL_ENROLLMENT + '/questionbank/healthinfo', request)
    .then(response => {
      console.log('heeth module issss', response)
      return response
    })
    .catch(error => {
      // dispatch({
      //     type: TOGGLE_GLOBAL_LOADER,
      //     payload: false
      // });
      // handleError(error)
    })
}

export const getMyneeds = () => {
  let mail = localStorage.getItem('userMail')
  var request = { email: mail }
  return apiService
    .get(process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getMyneedsReport/' + mail)
    .then(response => {
      console.log('My needs api call', response)
      return response
    })
    .catch(error => {
      // dispatch({
      //     type: TOGGLE_HEALTH_CARD_MODAL,
      //     payload: false
      // });
      // handleError(error)
    })
}

export const MobilegetMyneeds = page => {
  console.log('==============page no is======', page)
  let mail = localStorage.getItem('userMail')
  let sourceid = localStorage.getItem('sourceid')
  let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getMyneedsReport/' + mail + '?&page=' + page + '&size=10'
  // let URL = process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getMyneedsReport/refundtest@pranathitest45.33mail.com?'+'&page='+page+'&size=10';
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

// export const openDocumentInNewWindow = () => {

//   return (dispatch: any) => {
//       // dispatch({
//       //     type: TOGGLE_GLOBAL_LOADER,
//       //     payload: true
//       // });

//       let request = { email: mail, type: type };
//       // let request = { email: 'madhu.murugan@ust-global.com', type: 'findaprovider' }

//       apiService.post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/planinfo', request)
//           .then(response => {
//               // dispatch({
//               //     type: TOGGLE_GLOBAL_LOADER,
//               //     payload: false
//               // });
//               if (response.data && response.data.length > 0) {

//                   // let providerLink = response.data[0].fieldValue
//                   // window.open("" + providerLink, '_blank')

//               }
//               else {
//                   // dispatch({
//                   //     type: FETCHING_GUIDELINES_FAILED,
//                   //     payload: response.data
//                   // });

//               }

//           }).catch((error) => {
//               // dispatch({
//               //     type: TOGGLE_GLOBAL_LOADER,
//               //     payload: false
//               // });
//               // handleError(error)

//           })

//   };
// };

export const healthtools = () => {
  // alert("helth tools calll")
  let mail = localStorage.getItem('userMail')
  var request = { email: mail }
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/getGroupNumber', request)
    .then(response => {
      // console.log("health tools==", response)
      // localStorage.setItem("healthtoolsshow",'true')
      return response
    })
    .catch(error => {
      // localStorage.setItem("healthtoolsshow",'false')
    })
}

export const getCardDetails = () => {
  return apiService
    .get(process.env.REACT_APP_NEW_BASE_URL + '/memberportal/getCardDetails/' + localStorage.getItem('CLIENT_ID'))
    .then(response => {
      return response
    })
    .catch()
}

export const getRxSimpleShareData = data => {
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/csrportal/getaddons', data)
    .then(response => {
      return response.data
    })
    .catch(err => {})
}

export const getPaymentCardData = request => {
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/paymentCard', request)

    .then(response => {
      return response
    })
    .catch()
}

export const encryptMemberId = async encodeString => {
  let request = {
    memberId: encodeString
  }
  let response = ''

  await apiService
    .post(process.env.REACT_APP_BASE_URL + 'v1/csrportal/idencryption', request)
    .then(resp => {
      let encriptedData = resp.data
      console.log('encriptedData====', encriptedData)
      response = encodeURIComponent(encriptedData)
      console.log('response encriptedData====', response)
    })
    .catch(err => {
      console.log('Internal server error.')
    })
  return await response
}

export const getEnrolledMemberData = () => {
  let request = { subscriberIdSource: localStorage.getItem('sourceid') }
  return apiService
    .post(process.env.REACT_APP_BASE_URL + 'v2/csrportal/getempiid', request)

    .then(response => {
      return response
    })
    .catch()
}

export const getMemberStatus = memberIdSource => {
  let mail = localStorage.getItem('userMail')
  let URL = process.env.REACT_APP_BASE_URL + 'v1/memberportal/member/status/' + memberIdSource
  return apiService
    .get(URL)
    .then(response => {
      return response
    })
    .catch()
}

// ASA------------------------

export const getEMPI = () => {
  //uses username and password to log into the API
  let request = {
    username: 'regulator',
    password: '##Infyadmin1'
  }
  return axios
    .post(process.env.REACT_APP_NEW_BASE_URL_SHAREPLUS + '/login', request, {
      headers: {
        'Content-type': 'application/json',
        'x-api-key': 'lIIwjqkmZF3V5T2Mk8qYG3aUStltuWQAaPkpq9JL'
      }
    })
    .then(response => {
      //pulls the login token from the login API to use for the shareplus APIs
      let token = response.data.data.id_token

      let mail = localStorage.getItem('userMail')

      //utlizes the getEMPI API to pull the EMPI account data associated with the email
      return axios
        .get(process.env.REACT_APP_NEW_BASE_URL_SHAREPLUS + '/member-report?report-type=getEmpi&email=' + mail, {
          headers: {
            'x-api-key': 'lIIwjqkmZF3V5T2Mk8qYG3aUStltuWQAaPkpq9JL',
            token: token
          }
        })
        .then(response => {
          let empid_value = response.data[0].empi
          localStorage.setItem('EMPID', empid_value)
          console.log('EMpID ===', empid_value)
          return response
        })
        .catch(error => {
          console.log('***********3*********' + '/&')
        })
    })
}

export const getMyneedsEOS = () => {
  //uses username and password to log into the API
  let request = {
    username: 'regulator',
    password: '##Infyadmin1'
  }
  return axios
    .post(process.env.REACT_APP_NEW_BASE_URL_SHAREPLUS + '/login', request, {
      headers: {
        'Content-type': 'application/json',
        'x-api-key': 'lIIwjqkmZF3V5T2Mk8qYG3aUStltuWQAaPkpq9JL'
      }
    })
    .then(response => {
      console.log('#######API LOGIN######', localStorage.getItem('bearerToken'))
      console.log('#######API LOGIN######', localStorage.getItem('EMPID'))

      console.log(response)
      let token = response.data.data.id_token

      let id = localStorage.getItem('EMPID')
      //returns api response from the needs API
      return axios
        .get(process.env.REACT_APP_NEW_BASE_URL_NEEDS + '/test/subcriber/needs?empi=' + localStorage.getItem('EMPID'), {
          headers: {
            'x-api-key': 'lIIwjqkmZF3V5T2Mk8qYG3aUStltuWQAaPkpq9JL',
            token: token
          }
        })
        .then(response => {
          console.log('======my needs eos =====')
          console.log(response)
          console.log(sessionStorage.getItem('EMPID'))
          return response
        })
        .catch(err => {
          console.log('============== error ==============')
          console.log(err)
        })
    })
}
