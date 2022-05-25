import axios from 'axios';
import { Dispatch } from 'redux';
import { default as apiService, default as apiservice } from '../utils/apiservice';
import { getBrowser, getDateTime, getDeviceType, getOs, getPublicIP } from './../utils/utility';


// const publicIp = require('public-ip');

export const FETCHING_HEALTH_CARD = 'FETCHING_HEALTH_CARD';
export const FETCHING_HEALTH_CARD_SUCCESS = 'FETCHING_HEALTH_CARD_SUCCESS';
export const FETCHING_HEALTH_CARD_FAILED = 'FETCHING_HEALTH_CARD_FAILED';
export const TOGGLE_HEALTH_CARD_MODAL = 'TOGGLE_HEALTH_CARD_MODAL';

export const TOGGLE_EXPENSE_LIMIT_MODAL = 'TOGGLE_EXPENSE_LIMIT_MODAL';
export const FETCHING_EXPENSE_LIMIT = 'FETCHING_EXPENSE_LIMIT'
export const FETCHING_EXPENSE_LIMIT_SUCCESS = 'FETCHING_EXPENSE_LIMIT_SUCCESS'
export const FETCHING_EXPENSE_LIMIT_FAILED = 'FETCHING_EXPENSE_LIMIT_FAILED'

export const TOGGLE_FIRST_LOGIN_MODAL = 'TOGGLE_FIRST_LOGIN_MODAL';
export const FETCHING_LOGIN_COUNT = 'FETCHING_LOGIN_COUNT';
export const FETCHING_LOGIN_COUNT_SUCCESS = 'FETCHING_LOGIN_COUNT_SUCCESS';
export const FETCHING_LOGIN_COUNT_FAILED = 'FETCHING_LOGIN_COUNT_FAILED';

export const FETCHING_GUIDELINES = 'FETCHING_GUIDELINES';
export const FETCHING_GUIDELINES_SUCCESS = 'FETCHING_GUIDELINES_SUCCESS';
export const FETCHING_GUIDELINES_FAILED = 'FETCHING_GUIDELINES_FAILED';

export const TOGGLE_GLOBAL_LOADER = 'TOGGLE_GLOBAL_LOADER'

export const SET_HEALTH_QN_MODULE_INFO = 'SET_HEALTH_QN_MODULE_INFO';
export const SET_HEALTHQN_OPENED_VALUE = 'SET_HEALTHQN_OPENED_VALUE'

export const getHealthCard = (mail: string) => {

    return (dispatch: any) => {
        dispatch({
            type: FETCHING_HEALTH_CARD,
        });

        let request = { email: mail }
        // let request = { email: 'Muhammed.Shuraif@ust-global.com' }
        apiService.post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/idcard', request)
            // axios.post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/idcard', request, config)
            .then(response => {
                    console.log("getHealthcard==",response)
                if (response.data.memberIdCardList != null) {
                    // console.table(response.data.memberIdCardList)
                    dispatch({
                        type: FETCHING_HEALTH_CARD_SUCCESS,
                        payload: response.data
                    });
                } else {
                    //closing the loading window if memberIdCardList returns null

                    dispatch({
                        type: FETCHING_HEALTH_CARD_FAILED,
                        payload: response.data
                    });
                    dispatch({
                        type: TOGGLE_HEALTH_CARD_MODAL,
                        payload: false
                    });
                    alert('Data not available.')
                }


            }).catch((error) => {

                dispatch({
                    type: TOGGLE_HEALTH_CARD_MODAL,
                    payload: false
                });
                handleError(error)
            })

    };
};

export const getExpenseLimit = (mail: string) => {

    return (dispatch: any) => {
        dispatch({
            type: FETCHING_EXPENSE_LIMIT,
        });
        let request = { email: mail, type: 'expense' }
        // let request = { email: 'test@ust-global.com', type: 'expense' }
        // 'Muhammed.Shuraif@ust-global.com'

        apiService.post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/planinfo', request)
            .then(response => {
                console.log("getExpenseLimit==",response)
                // console.table(response.data)
                if (response.data && response.data.length > 0) {
                    // console.log("expense fetch success")
                    // console.table(response.data)
                    dispatch({
                        type: FETCHING_EXPENSE_LIMIT_SUCCESS,
                        payload: response.data
                    });
                }
                else {
                    // console.log("expense fetch failed")
                    //closing the loading window if memberIdCardList returns null

                    dispatch({
                        type: FETCHING_EXPENSE_LIMIT_FAILED,
                        payload: response.data
                    });
                    dispatch({
                        type: TOGGLE_EXPENSE_LIMIT_MODAL,
                        payload: false
                    });
                    alert('Data not available.')
                }


            }).catch((error) => {
                // dispatch({
                //     type: FETCHING_HEALTH_CARD_FAILED,
                // });
                dispatch({
                    type: TOGGLE_EXPENSE_LIMIT_MODAL,
                    payload: false
                })
                handleError(error)

            })

    };
};

export const setHealthQnOpenedValue = (value: any) => {
    return (dispatch: any) => {
        dispatch({
            type: SET_HEALTHQN_OPENED_VALUE,
            payload: value
        })
    }
}

export const getLoginCount = () => {


    return async (dispatch: any, getState: any) => {


        dispatch({
            type: FETCHING_LOGIN_COUNT,
        });
        dispatch({
            type: TOGGLE_GLOBAL_LOADER,
            payload: true
        });


        var os = getOs()
        var date = getDateTime();
        var publicIp = await getPublicIP();
        var browser = getBrowser();
        var deviceType = getDeviceType();

        let request1 = {
            username: localStorage.getItem('subscriberName'),
            cognitoUsername: localStorage.getItem('cognitoUsername'),
            phoneNumber: localStorage.getItem('phone'),
            email: localStorage.getItem('userMail'),
            device: "Operating system : " + os + ",Web browser : " + browser + ",Device type : " + deviceType,
            ipOrigin: publicIp,
            lastLoggedin: date,
        }
        // console.table(request1)
        // 'Muhammed.Shuraif@ust-global.com'
        // let request = { email: 'Muhammed.Shuraif@ust-global.com', type: 'expense' }
        apiService.post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/login', request1)
            .then(response => {
                // console.table(response.data)
                if (response.data) {
                    // console.log("LOGIN COUNT FETCHED")
                    // console.log(response.data.numberOfLogins)
                    if (response.data.numberOfLogins > 0) {
                        dispatch({
                            type: FETCHING_LOGIN_COUNT_SUCCESS,
                            payload: false
                        });
                        // console.log(Store)
                        const state = getState();

                        if (!state.healthQnOpened) {
                            let userMail = localStorage.userMail;
                            dispatch(getHealthqnInfo(userMail))
                        }
                        dispatch({
                            type: TOGGLE_GLOBAL_LOADER,
                            payload: false
                        });

                    }
                    else {
                        dispatch({
                            type: FETCHING_LOGIN_COUNT_SUCCESS,
                            payload: true
                        });
                        dispatch({
                            type: TOGGLE_GLOBAL_LOADER,
                            payload: false
                        });
                    }
                }
                else {
                    // console.log("login count fetch failed")
                    //closing the loading window if memberIdCardList returns null

                    dispatch({
                        type: FETCHING_LOGIN_COUNT_FAILED,
                        payload: true
                    });
                    dispatch({
                        type: TOGGLE_FIRST_LOGIN_MODAL,
                        payload: true
                    });
                    dispatch({
                        type: TOGGLE_GLOBAL_LOADER,
                        payload: false
                    });
                }
                sessionStorage['loginAPICalled'] = true;

            }).catch((error) => {
                dispatch({
                    type: TOGGLE_GLOBAL_LOADER,
                    payload: false
                });
                dispatch({
                    type: TOGGLE_FIRST_LOGIN_MODAL,
                    payload: false
                })
                handleError(error)

            })

    };
};


export const toggleHealthCardModal = (value: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: TOGGLE_HEALTH_CARD_MODAL,
            payload: value
        });
    }
}

export const getGateWayToken: any = () => {
    let request = {
        "username": "admin",
        "password": "testpass"
        // "password": "x1TXVUtXL6PaBWam"
    }
    if (process.env.REACT_APP_BUILD == 'prod') {
        request.password = "x1TXVUtXL6PaBWam"
    }
    return apiservice.post(process.env.REACT_APP_BASE_URL + "v1/login", request, true);
}


export const toggleExpenseLimitModal = (value: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: TOGGLE_EXPENSE_LIMIT_MODAL,
            payload: value
        });
    }
}
export const toggleFirstLoginModal = (value: boolean) => {
    console.log('login close called')
    return (dispatch: Dispatch) => {
        dispatch({
            type: TOGGLE_FIRST_LOGIN_MODAL,
            payload: value
        });
    }
}


export const openDocumentInNewWindow = (mail: string, type: string) => {

    return (dispatch: any) => {
        dispatch({
            type: TOGGLE_GLOBAL_LOADER,
            payload: true
        });


        let request = { email: mail, type: type };
        // let request = { email: 'madhu.murugan@ust-global.com', type: 'findaprovider' }

        apiService.post(process.env.REACT_APP_BASE_URL + 'v1/memberportal/planinfo', request)
            .then(response => {
                dispatch({
                    type: TOGGLE_GLOBAL_LOADER,
                    payload: false
                });
                if (response.data && response.data.length > 0) {

                    let providerLink = response.data[0].fieldValue
                    window.open("" + providerLink, '_blank')


                    // if (type == "findaprovider") {
                    //     let providerLink = response.data[0].fieldValue
                    //     window.open("" + providerLink, '_blank')
                    // }
                    // else {
                    //     let pdf = require('../assets/files/' + response.data[0].fieldValue)
                    //     window.open(pdf, '_blank')

                    // }
                }
                else {
                    dispatch({
                        type: FETCHING_GUIDELINES_FAILED,
                        payload: response.data
                    });

                    // alert('Data not available.')
                }


            }).catch((error) => {
                dispatch({
                    type: TOGGLE_GLOBAL_LOADER,
                    payload: false
                });
                handleError(error)

            })

    };
};


export const getHealthqnInfo = (mail: string) => {

    return (dispatch: any) => {
        dispatch({
            type: TOGGLE_GLOBAL_LOADER,
            payload: true
        });


        // let request = { email: mail };
        // let request = { email: 'madhu.murugan@ust-global.com', type: 'guidelines' }
        let request = {"subscriberIdSource": localStorage.getItem('sourceid')}

        apiService.post(process.env.REACT_APP_BASE_URL_ENROLLMENT + '/questionbank/healthinfo', request)
            .then(response => {
                console.log("getHealthqnInfo==",response)
                // console.log(response)
                dispatch({
                    type: SET_HEALTH_QN_MODULE_INFO,
                    payload: response.data.response
                });

                dispatch({
                    type: TOGGLE_GLOBAL_LOADER,
                    payload: false
                });

            }).catch((error) => {
                dispatch({
                    type: TOGGLE_GLOBAL_LOADER,
                    payload: false
                });
                handleError(error)

            })

    };
};


export const handleError = (error: any) => {

    if (error && error.response && error.response.request && error.response.request.status == 401) {
        startSession();
        alert('Internal server error. Please try again.')

        // if (process.env.REACT_APP_BUILD == 'prod') {
        //     //sessio expired - restart the server session
        //     startSession.then((resp: any) => {
        //         console.log('session restored')
        //     })
        // }
    } else {
        // console.log(error.response.request.status)
        console.log('internal server error')
        startSession();
        alert('Internal server error. Please try again later.')
        // dispatch(dispatchObj);
    }

}




export const dummyapi: any = () => {
    let request = {
        "username": "admin",
        "password": "x1TXVUtXL6PaBWam"
    }
    return apiservice.get("https://reqres.in/api/users?page=2", true);
}

export const startSession: any = () => {
    return getGateWayToken().then((data: any) => {

        if (data.message) {
            console.log("failed to get token")
            // Here you should have logic to handle invalid login credentials
            // 'message' if there is an error
            alert(data.message)
        }
        else {
            // console.log(data['headers'].authorization)
            let bearer = data['headers'].authorization
            var array = bearer.split("Bearer ")
            localStorage.setItem("bearerToken", array[1]);

        }
        return data
    });
}

export const getEmailIdFromCognito = async (request: any) => {
    return apiService.get(process.env.REACT_APP_BASE_URL + 'v1/memberportal/verifyemail/' + request);
}

export const getProperEmailId = async (username: any) => {
    const session = await startSession();
    let email = username.trim()
    await getEmailIdFromCognito(email).then((resp) => {
        email = resp.data;
    }).catch((err) => {
        console.log(err)
    })

    return email;
}

export const getUser = async (request : any) => {
  return apiService.post(process.env.REACT_APP_BASE_URL + 'v2/memberportal/idcard' , request);
}

export const getUserDetails = async (email : any) => {
  const session = await startSession();
  let response = null;
  var request = { email:email }
  await getUser(request).then((res) => {
    response =  res;
  }).catch((err) =>{
    console.log(err);
  })

  return response;
}

export const getUserSession = async (email : any, type : any) => {
  axios.get(process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'getSessionDetails/' + email + '/' + type)
    .then(response => {
      return response;
    }).catch(err =>{
    console.log(err);
  })
}



// import { action } from 'typesafe-actions'
// import { HeroesActionTypes, Hero } from './types'

// // Here we use the `action` helper function provided by `typesafe-actions`.
// // This library provides really useful helpers for writing Redux actions in a type-safe manner.
// // For more info: https://github.com/piotrwitek/typesafe-actions
// export const fetchRequest = () => action(HeroesActionTypes.FETCH_REQUEST)

// // Remember, you can also pass parameters into an action creator. Make sure to
// // type them properly as well.
// export const fetchSuccess = (data: Hero[]) => action(HeroesActionTypes.FETCH_SUCCESS, data)
// export const fetchError = (message: string) => action(HeroesActionTypes.FETCH_ERROR, message)
