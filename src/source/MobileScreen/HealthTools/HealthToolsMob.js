import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import React, { Component } from 'react'
import ReactCardFlip from 'react-card-flip'
import HealthToolsBackRoot from './HealthToolsBackRoot'
import HealthToolsFrontRoot from './HealthToolsFrontRoot'
import './HealthToolsMobStyle.css'

const useStyles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
})

class HealthToolsMob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false,
      network: this.props.network,
      contactNumber: this.props.contactNumber
      // closebutton:this.props.closebutton?true:false,
    }
    console.log('ID CARD PROPS MOB', this.props)
    this.handleClick = this.handleClick.bind(this)
    // console.log("mclose======="+this.props.mClose)
    // console.log("lclose======="+this.props.lClose)
  }

  handleClick(e) {
    // alert("parent call")
    // e.preventDefault()
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
    console.log('======in ID card=======')
    this.props.isflippped(false)
  }

  render() {
    // console.log("STATE DATA IS===",this.state.templateData)

    const { classes } = this.props
    return (
      <div className="">
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
          <div className="cardWrapper">
            {this.props.close || this.props.lClose ? null : <div class="frontview_name_text">Front of ID Card</div>}
            {this.props.mClose ? (
              <IconButton class="close_card" onClick={this.props.handleClose}>
                <CloseIcon fontsize="inherit" style={{ fontSize: 'larger' }} />
              </IconButton>
            ) : null}
            {/* {this.props.lClose ?
      <IconButton class="close_card_rotate" onClick={this.props.handleClose}>
      <CloseIcon fontsize='20' style={{}}/>
      </IconButton>
      :null
    } */}

            {/*       {this.props.lClose?
          <img src={require('../../Images/tap_icon.svg')} class="tap_image_rotate" onClick={()=>this.handleClick()} />
          :null
          } */}

            {this.props.lClose ? (
              <img src={require('../../Images/tap_icon.svg')} class="tap_image_rotate" onClick={() => this.handleClick()} />
            ) : (
              <img src={require('../../Images/tap_icon.svg')} class="tap_image" onClick={() => this.handleClick()} />
            )}
            <HealthToolsFrontRoot
              // method={this.handleClick}
              data={this.props.data}
              {...this.props}
              onClose={this.props.handleClose}
              showEmpId={this.props.showEmpId}
              network={this.props.network}
              contactNumber={this.props.contactNumber}
              close={this.props.close}
            />
          </div>

          <div className="id-card-back-main">
            {this.props.close || this.props.lClose ? null : <div class="Backview_name_text">Back of ID Card</div>}
            {this.props.mClose ? (
              <IconButton class="close_card_back" onClick={this.props.handleClose}>
                <CloseIcon fontsize="20" style={{ fontSize: 'larger' }} />
              </IconButton>
            ) : null}
            {/* {this.props.lClose?

    <IconButton class="close_card_back_rotate" onClick={this.props.handleClose}>
      <CloseIcon fontsize='20' style={{}}/>
      </IconButton>
      :
      null
    } */}
            {this.props.lClose ? (
              <img src={require('../../Images/tap_icon.svg')} class="tap_image_back-rotate" onClick={() => this.handleClick()} />
            ) : (
              <img src={require('../../Images/tap_icon.svg')} class="tap_image_back" onClick={() => this.handleClick()} />
            )}

            <HealthToolsBackRoot
              // method={this.handleClick}
              network={this.state.network}
              onClose={this.props.handleClose}
              contactNumber={this.props.contactNumber}
              cardId={this.props.cardId}
            />
          </div>
        </ReactCardFlip>
      </div>
    )
  }
}

export default withStyles(useStyles)(HealthToolsMob)
