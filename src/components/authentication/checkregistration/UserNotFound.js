import React, { Component } from 'react'
//import PhoneInput from 'react-phone-number-input';
export class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  checkRegistration = e => {
    e.preventDefault()
    this.props.checkAgain()
  }
  render() {
    return (
      <form onSubmit={this.checkRegistration.bind(this)} className="main-form">
        {/* <p className="a-errorMessage" hidden={errorMessage.length <= 0}>
                {errorMessage}
              </p> */}
        <NotFoundContent email={this.props.email} />

        <div>
          <button type="submit" className="a-btn">
            Go to Sign In
          </button>
          {/* <p style={{ textAlign: 'center' }}><span>Go back to </span>&nbsp;
                <span className="forgot-pawd"><Link to="/login">Sign In</Link></span></p> */}
        </div>
      </form>
    )
  }
}
export default SignUpForm

export const NotFoundContent = props => {
  return (
    <>
      <h4 className="label-head">Sorry! We could not find an active registration for {props.email}.</h4>
      <h4 className="label-head">
        If it’s been more than one business day since you signed up, please contact our Account Activation line: (888) 308 0024
      </h4>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => props.handleClose()}
          className="a-btn"
          style={{ width: 'auto', minWidth: '70px', height: '40px', margin: '0 0px 15px 0' }}
        >
          Close
        </button>
      </div>
    </>
  )
}
