import React, { Component } from 'react'
//import PhoneInput from 'react-phone-number-input';
export class UserConfirmed extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  checkRegistration = () => {}
  render() {
    return (
      <form onSubmit={this.checkRegistration.bind(this)} className="main-form">
        {/* <p className="a-errorMessage" hidden={errorMessage.length <= 0}>
                {errorMessage}
              </p> */}
        <UserConfirmedContent />

        {/* link on our <span className="forgot-pawd"><Link to="/login">Sign In</Link></span> page. */}
        <div>
          <button type="submit" className="a-btn">
            Go to Sign In
          </button>
          {/* <p style={{ textAlign: 'center' }}><span>Already have an account?</span>&nbsp;
                <span className="forgot-pawd"><Link to="/login">Sign In</Link></span></p> */}
        </div>
      </form>
    )
  }
}
export default UserConfirmed

export const UserConfirmedContent = props => {
  return (
    <>
      <h4 className="label-head">You are all set! </h4>
      <h4 className="label-head">If you can’t remember your password, you can reset it by clicking the “Forgot your password?” </h4>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => props.gotoResetPassword()}
          className="b-btn"
          style={{ width: 'auto', minWidth: '70px', height: '40px', margin: '0 0px 15px 0' }}
        >
          Forgot your password
        </button>

        <button
          onClick={() => props.handleClose()}
          className="a-btn"
          style={{ width: 'auto', minWidth: '70px', height: '40px', margin: '0 0px 15px 0' }}
        >
          Close
        </button>
      </div>

      {/* <p style={{ margin: 0, textAlign: 'center' }}><span>Go to</span>&nbsp;
                <span className="forgot-pawd" onClick={() => props.gotoResetPassword()}>Reset Password</span></p> */}
    </>
  )
}
