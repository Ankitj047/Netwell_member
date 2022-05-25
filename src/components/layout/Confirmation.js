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
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          No
        </Button>
        <Button onClick={handleContinue} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
