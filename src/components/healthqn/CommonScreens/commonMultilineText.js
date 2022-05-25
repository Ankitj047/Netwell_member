import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { Component } from 'react'
import customStyle from '../CSS/stylesheet_UHS'

const CustomTextField = withStyles(customStyle.multiLineTextField)(TextField)

class CommonMultilineText extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '', errorText: this.props.helperMsg, isValid: false }
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.state.value = ''
  }

  handlerCopy(e) {
    e.preventDefault()
  }
  onChange = event => {
    event.preventDefault()
    let txtVal = event.target.value
    txtVal = event.target.value.trimLeft()
    if (txtVal !== '') {
      if (this.props.fieldType == 'any') {
        this.setState({ errorText: '', isValid: false, value: txtVal })
        this.props.setChild(txtVal, true, this.props.parentDetails)
      } else if (txtVal.match(/^[0-9a-zA-Z \n\-,]+$/)) {
        this.setState({ errorText: '', isValid: false, value: txtVal })
        this.props.setChild(txtVal, true, this.props.parentDetails)
      } else {
        this.setState({ errorText: this.props.errMsg, isValid: true, value: txtVal })
        this.props.setChild(txtVal, false, this.props.parentDetails)
      }
    } else {
      if (this.props.parentDetails.type === 'otherPhysician') {
        this.setState({ errorText: '', isValid: false, value: txtVal })
        this.props.setChild(txtVal, true, this.props.parentDetails)
      } else {
        this.setState({ errorText: this.props.helperMsg, isValid: true, value: txtVal })
        this.props.setChild(txtVal, false, this.props.parentDetails)
      }
    }
  }

  render() {
    const color = '#76FA15'
    return (
      <CustomTextField
        className="w-100"
        error={this.state.isValid}
        label={this.props.label}
        name={this.props.name}
        variant="filled"
        autoComplete="off"
        value={this.props.value === '' && this.state.isValid ? this.state.value : this.props.value}
        style={this.props.style}
        helperText={this.props.value == '' && this.state.errorText}
        /*onCopy={this.handlerCopy}
                onPaste={this.handlerCopy}*/
        onChange={this.onChange.bind(this)}
        disabled={this.props.disable}
        required={this.props.req}
        InputLabelProps={{
          style: { color: this.state.isValid ? '#FA1515' : '' }
        }}
        inputProps={{
          maxLength: this.props.length
        }}
        InputProps={this.x}
        multiline
        rows="4"
      />
    )
  }
}

export default CommonMultilineText
