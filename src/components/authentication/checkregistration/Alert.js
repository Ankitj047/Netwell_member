import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import React from 'react'
import { views } from '../CheckRegistration'
import { UserConfirmedContent } from '../checkregistration/UserConfirmed'
import { ChangePwdContent } from '../checkregistration/UserForceChangePwd'
import { NotFoundContent } from '../checkregistration/UserNotFound'

export default function AlertDialog(props) {
  const handleClose = () => {
    props.closeAlert()
  }

  const getView = () => {
    const { currentView } = props
    console.log(currentView)
    switch (currentView) {
      case views.Confirmed:
        return <UserConfirmedContent gotoResetPassword={props.gotoResetPassword} handleClose={handleClose} />
      case views.NotFound:
        return <NotFoundContent email={props.email} handleClose={handleClose} />
      case views.ForceChangePassword:
        return <ChangePwdContent resendEmail={props.resendEmail} emailStatus={props.emailStatus} handleClose={handleClose} />
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>{getView()}</DialogContent>
      </Dialog>
    </div>
  )
}
