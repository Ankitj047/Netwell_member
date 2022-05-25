import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'

const useStyles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
})

class CardModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  
  handleOpen = () => {
        this.setState({ open: true })
  }

        render() {
    const { classes } = this.props

    return (
      <div>
        <button type="button" onClick={this.handleOpen}>
          react-transition-group
        </button>
        <Modal
          style={{
            overflow: 'auto',
            height: '100%'
          }}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
                    closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
              <p id="transition-modal-description">react-transition-group animates me.</p>
              <p id="transition-modal-description">react-transition-group animates me.</p>
              <p id="transition-modal-description">react-transition-group animates me.</p>
              <p id="transition-modal-description">react-transition-group animates me.</p>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }
}

export default withStyles(useStyles)(CardModal)
