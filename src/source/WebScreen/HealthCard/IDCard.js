import React, { Component } from 'react'
import ReactCardFlip from 'react-card-flip'
import HealthCardBackView from '../HealthCard/HealthCardBackView'
import HealthCardFrontView from '../HealthCard/HealthCardFrontView'
import './Healthcard.css'

class IDCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false,
      network: this.props.network,
      contactNumber: this.props.contactNumber
    }
    this.handleClick = this.handleClick.bind(this)
    console.log('IDCARD PAGE PROPS IS===', this.props)
  }

  handleClick(e) {
            this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  render() {
    console.log('STATE DATA IS===', this.state.templateData)
    return (
      <div className="">
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
          <div>
            <HealthCardFrontView
              method={this.handleClick}
              data={this.props.data}
              {...this.props}
              onClose={this.props.handleClose}
              showEmpId={this.props.showEmpId}
              network={this.props.network}
              contactNumber={this.state.contactNumber}
                          />
          </div>

          <div className="id-card-back-main">
            <HealthCardBackView
              method={this.handleClick}
              network={this.state.network}
              onClose={this.props.handleClose}
              contactNumber={this.state.contactNumber}
              cardId={this.props.cardId}
                          />
          </div>
        </ReactCardFlip>
      </div>
    )
  }
}
export default IDCard
