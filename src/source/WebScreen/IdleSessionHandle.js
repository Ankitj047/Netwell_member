import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import React, { useEffect } from 'react'
import IdleTimer from 'react-idle-timer'
import CommonLoader from '../CommonLoader'
export const IdleSessionHandle = () => {
  const timeoutInMinutes = 15
  const timeInMilliseconds = 1000 * 60 * timeoutInMinutes
  const [open, setOpen] = React.useState(false)
  const [loader, setLoader] = React.useState(false)

  useEffect(() => {
    let checkForSessionIntervalTime = 1000 * 60 * 2
    let checkForSessionInterval = setInterval(() => {
      if (sessionStorage.getItem('USER_ACTIVE_SESSION') === 'true') {
        axios
          .get(
            process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION +
              'getSessionDetails/' +
              localStorage.getItem('userMail') +
              '/' +
              sessionStorage.getItem('TYPE')
          )
          .then(response => {
            console.log(response)
            if (response.data.code === 200) {
              if (!response.data.response.activeflag) {
                appLogout()
              }
            } else {
              appLogout()
            }
          })
      } else if (sessionStorage.getItem('USER_ACTIVE_SESSION') === 'false') {
        appLogout()
      } else {
        Auth.currentAuthenticatedUser()
          .then(user => {
            console.log('user available', user)
          })
          .catch(err => {
            console.log('no session available', err)
            appLogout()
          })
      }
    }, checkForSessionIntervalTime)
    return () => clearInterval(checkForSessionInterval)   }, [])

  const handleClose = () => {
    sessionStorage.clear()
    window.location.href = '/login'
    setOpen(false)
    setLoader(true)
  }

  const handleOnIdle = event => {
    appLogout()
    console.log('app is idle now')
  }

  const appLogout = () => {
    setOpen(true)
    if (sessionStorage.getItem('USER_ACTIVE_SESSION') === 'true') {
      let obj = {
        email: localStorage.getItem('userMail'),
        type: sessionStorage.getItem('TYPE'),
        activeflag: false
      }
      axios
        .post(process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'updateSession', obj)
        .then(response => {
          localStorage.clear()
          sessionStorage.clear()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      Auth.signOut()
      localStorage.clear()
      sessionStorage.clear()
    }
              }
    return (
    <div>
      {loader ? <CommonLoader /> : null}
      <IdleTimer
        ref={ref => {
                  }}
        timeout={timeInMilliseconds}
        onActive={event => {
                  }}
        onIdle={handleOnIdle}
        onAction={event => {
                  }}
        debounce={250}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="alert-dialog-title">{'Session Expired'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Your session has been expired. Please try logging again!</DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
              Disagree
          </Button> */}
          <Button onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default IdleSessionHandle
