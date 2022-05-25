import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import React from 'react'
import customStyle from '../CSS/stylesheet_UHS'
import Loader from '../loader'
import EnrollFamily from './EnrollFamily/EnrollFamily'
import './healthqn.css'
// import i18n from '../../../i18next';

const styles = theme => customStyle.defaultStyle
const theme = createMuiTheme({
  spacing: 4
})

const styles1 = {
  typography: {
    padding: theme.spacing(2)
  }
}

class Enrollment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      setActiveStep: 0,
      completed: {},
      modalOpen: false,
      optReason: '',
      otherReason: '',
      currentUser: '',
      instructions: [],
      info: [],
      formValid: true,
      optReasonList: [],
      loaderShow: false,
      errorText: '',
      isValid: false,
      isReasonsReq: true,
      optFlag: false,
      count: 1,
      progress: 0,
      disOtReason: true,
      userLoggedIn: false,
      anchorEl: null,
      open: false,
      openedPopoverId: null,
      enrollFlag: false
    }
  }

  componentDidMount() {
    this.setState({
      loaderShow: false
    })
  }

  render() {
    return (
      <div>
        {this.state.loaderShow ? <Loader></Loader> : ''}

        {
          <div
            ic="enrollDiv"
            style={{
              //minHeight: 'calc(100vh - 165px)',
              padding: '20px',
              overflowY: 'auto',
              paddingBottom: 0
            }}
          >
            <div
              style={{
                height: '100%',
                position: 'relative'
                // marginTop: '30px',
                // width: '95.2%', marginLeft: '2.4%', marginRight: '2.4%'
                // margin:'20px'
              }}
            >
              <div style={customStyle.mainArea}>
                <EnrollFamily history={this.props.props.history}></EnrollFamily>
              </div>
            </div>
            {/* <div style={mainClasses.optOut}>
                            </div> */}
          </div>
        }
      </div>
    )
  }
}

export default withStyles(styles)(Enrollment)
