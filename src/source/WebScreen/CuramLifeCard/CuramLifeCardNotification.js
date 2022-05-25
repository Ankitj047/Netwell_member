import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import CuramLifeCard from '../CuramLifeCard'

class CuramLifeCardNotification extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClose = () => {
    this.props.closeCuramLifeCard()
  }

  render() {
    return (
      <div>
        <span
          style={{
            position: 'absolute',
            top: -15,
            right: -10,
            cursor: 'pointer',
            color: '#6c6c6c',
            fontSize: '20px',
            fontWeight: 'bold',
            padding: '10px'
          }}
          onClick={this.handleClose}
        >
          <CloseIcon class="modal_close_cursor" />{' '}
        </span>
        <CuramLifeCard />
      </div>
    )
  }
}

export default CuramLifeCardNotification
