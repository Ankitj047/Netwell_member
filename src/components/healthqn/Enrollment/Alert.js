import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import React from 'react'

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false)

  const handleContinue = () => {
    props.handleContinue()
  }

  const handleCancel = () => {
    props.handleCancel()
  }

  return (
    <Dialog open={props.open} onClose={handleCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText id="alert-dialog-description" style={{ color: 'black' }}>
          <p style={{ fontWeight: 'bold' }}>Are you sure?</p>
          You are exiting the medical questionnaire. To save the information you entered before you exit, click Cancel and then click the
          Finish Later button at the bottom of the questionnaire. If you do not want to save this information click Continue.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleContinue} color="primary">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}
