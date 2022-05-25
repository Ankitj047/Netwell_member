import React, { Component } from 'react'
import ReactCardFlip from 'react-card-flip'
import HealthtoolsBackRoot from './HealthToolsBackRoot'
import HealthtoolsFrontRoot from './HealthToolsFrontRoot'
import './HealthToolsStyle.css'

class HealthTools extends Component {
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
        {localStorage.getItem('USER_PORTAL') == 'serviceCloud' ? (
          <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
            <div>
              <HealthtoolsFrontRoot
                method={this.handleClick}
                data={JSON.parse(localStorage.getItem('MEMBER_IDCARD_DATA'))}
                {...this.props}
                onClose={this.props.handleClose}
                showEmpId={this.props.showEmpId}
                network={this.props.network}
                contactNumber={this.state.contactNumber}
                              />
            </div>

            <div className="id-card-back-main">
              <HealthtoolsBackRoot
                method={this.handleClick}
                network={this.state.network}
                onClose={this.props.handleClose}
                contactNumber={this.state.contactNumber}
                cardId={this.props.cardId}
                              />
            </div>
          </ReactCardFlip>
        ) : (
          <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
            <div>
              <HealthtoolsFrontRoot
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
              <HealthtoolsBackRoot
                method={this.handleClick}
                network={this.state.network}
                onClose={this.props.handleClose}
                contactNumber={this.state.contactNumber}
                cardId={this.props.cardId}
                              />
            </div>
          </ReactCardFlip>
        )}
      </div>
    )
  }
}
export default HealthTools













