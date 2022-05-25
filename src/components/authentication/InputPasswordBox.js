import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import React, { useState } from 'react'
import { deviceType, isMobile, isTablet } from 'react-device-detect'
function InputPassword(props) {
  const [hidePassword, setHidePassword] = useState(true)

  const toggleShow = e => {
    setHidePassword(!hidePassword)
  }

  return (
    <>
      {deviceType == 'browser' && (isMobile == false || isMobile == 'false') && (isTablet == false || isTablet == 'false') ? (
        <div class="firsttime_input_box_container">
          <input
            class="inputpasswordbox_input_div"
            type={hidePassword ? 'password' : 'text'}
            name={props.name}
            required
            onChange={props.handleChange}
            placeholder={props.placeholder}
          />
          <span hidden={props.hideEyeIcon} onClick={toggleShow.bind(this)} className="a-pwd-visibility">
            {hidePassword ? <VisibilityOffIcon style={{ height: '2.5vw' }} /> : <VisibilityIcon style={{ height: '2.5vw' }} />}
          </span>
        </div>
      ) : (
        <div class="mobile_firsttime_input_box_container">
          <input
            class="loginmobile_input_username_password_box"
            type={hidePassword ? 'password' : 'text'}
            name={props.name}
            required
            onChange={props.handleChange}
            placeholder={props.placeholder}
          />
          <span hidden={props.hideEyeIcon} onClick={toggleShow.bind(this)} className="a-pwd-visibility">
            {hidePassword ? <VisibilityOffIcon style={{ height: '20px' }} /> : <VisibilityIcon style={{ height: '20px' }} />}
          </span>
        </div>
      )}
    </>
  )
}

export default InputPassword
