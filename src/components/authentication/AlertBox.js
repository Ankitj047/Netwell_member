import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import React from 'react'

const AlertDialog = props => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    props.handleClose()
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <h4 className="label-head">{props.content}</h4>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => props.handleClose()} className="a-btn" style={{ width: 'auto', minWidth: '70px', height: '35px' }}>
              Close{' '}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AlertDialog
