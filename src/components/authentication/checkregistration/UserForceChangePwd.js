import React, { Component } from 'react'
//import PhoneInput from 'react-phone-number-input';
export class UserForceChangePwd extends Component {
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
        <ChangePwdContent />

        <div>
          <button type="submit" className="a-btn">
            Go to Sign In
          </button>
          {/* <p style={{ textAlign: 'center' }}><span></span>&nbsp;
                <span className="forgot-pawd"><Link to="/login">Sign In</Link></span></p> */}
        </div>
      </form>
    )
  }
}
export default UserForceChangePwd

export const ChangePwdContent = props => {
  return (
    <>
      <h4 className="label-head">
        Great news! We found your registration! We have sent a next step email with your temporary password to your email address.
        <br />
      </h4>
      <p style={{ margin: 0, color: '#28a745' }}>{props.emailStatus}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => props.resendEmail()}
          className="b-btn"
          style={{ width: 'auto', minWidth: '70px', height: '40px', margin: '0 0px 15px 0' }}
        >
          Resend Email
        </button>

        <button
          onClick={() => props.handleClose()}
          className="a-btn"
          style={{ width: 'auto', minWidth: '70px', height: '40px', margin: '0 0px 15px 0' }}
        >
          Close
        </button>
      </div>

      {/* <p style={{ margin: 0, textAlign: 'center' }}><span>Didnt recieve ?</span>&nbsp;
                <span className="forgot-pawd" onClick={() => props.resendEmail()}>Resend email</span></p> */}
    </>
  )
}
