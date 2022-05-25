import { Fab } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import SendIcon from '@material-ui/icons/Send'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import ReadMoreReact from 'read-more-react'
import './ChatBox.css'

class ChatSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: [],
      message: this.props.location.state.message ? this.props.location.state.message : '',
      chats: [],
      fullScreen: [],
      searched: ''
    }
  }
  componentDidMount() {
    if (this.props.location.state.message !== '') {
      this.sendMessage(true)
    }
  }

  render() {
    console.log()
    return (
      <div>
        <div class="h_new">
          <div class="h_left_icon_div">
            <h1 style={{ color: '#fff' }}>AskCaryn</h1>
          </div>
          <div>
            <h1 className="askCarynHeader">YOUR AI-POWERED ASSISTANT</h1>
          </div>
          <div>
            <CloseIcon onClick={() => this.props.history.push('/')} style={{ color: '#fff', cursor: 'pointer' }} />
          </div>
        </div>
        <div className="askCarynSearchTab">
          <Form.Control
            placeholder="Type your request ..."
            value={this.state.message}
            style={stylesheet.searchInputBox}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <div className="search-icon-caryn">
            <Fab style={{ backgroundColor: '#543379', width: 40, height: 40 }}>
              <SendIcon style={{ color: '#fff', fontSize: 20 }} onClick={() => this.sendMessage(true)} />
            </Fab>
          </div>
        </div>
        <div class="web_Chat_container" style={{ paddingTop: 100, backgroundColor: '#fff', height: this.state.searched ? '' : '100vh' }}>
          {this.state.searched.answers &&
            this.state.searched.answers.map((response, i) => (
              <div style={stylesheet.searchResponse}>
                <div>
                  <p className="searchfont">
                    {this.state.fullScreen[i] ? (
                      response.context
                    ) : (
                      <ReadMoreReact text={response.context} ideal={200} readMoreText={'...'} />
                    )}
                  </p>
                  {this.state.fullScreen[i] && (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#543379', color: '#fff' }}
                      onClick={() => window.open(response.meta.url)}
                    >
                      Read More
                      <ChevronRightIcon style={{ fontSize: 25 }} />
                    </Button>
                  )}
                </div>
                <div>
                  {this.state.fullScreen[i] ? (
                    <KeyboardArrowUpIcon onClick={() => this.fullScreen(i)} style={{ cursor: 'pointer' }} />
                  ) : (
                    <KeyboardArrowDownIcon onClick={() => this.fullScreen(i)} style={{ cursor: 'pointer' }} />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
  fullScreen = i => {
    if (this.state.fullScreen[i]) {
      var fullScreen = this.state.fullScreen
      fullScreen[i] = false
      this.setState({ fullScreen: fullScreen })
    } else {
      var fullScreen = this.state.fullScreen
      fullScreen[i] = true
      this.setState({ fullScreen: fullScreen })
    }
  }
  navigate = intent => {
    this.props.navigate(intent)
  }
  sendMessage = e => {
    if (e !== true) e.preventDefault()
    if (this.state.message !== '') {
      this.apiResponse(this.state.message)
    }
  }
  apiResponse = message => {
    ChatInput.map(res => {
      if (res.query === message) {
        this.returnRespone(res)
      }
    })
  }
  returnRespone = response => {
    this.setState({ searched: response })
  }
}
export default ChatSearch

const stylesheet = {
  searchInputBox: {
    borderRadius: 40,
    paddingRight: 40,
    paddingLeft: 20,
    borderColor: '#420045',
    borderWidth: 'revert'
  },
  searchResponse: {
    backgroundColor: '#EEEEEE',
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    fontWeight: 20
  }
}

const ChatInput = [
  {
    query: 'What is UHS ?',
    no_ans_gap: 0.08761119842529297,
    answers: [
      {
        answer: 'Universal HealthShare',
        score: 7.390358924865723,
        probability: 0.20374229550361633,
        context:
          'Unsharable Expenses means expenses that either are of a type that are generally ineligible for sharing, or that arise from or in connection with a condition that is not eligible for sharing. Usual and Customary means eligible expenses identified by the Medical Expense Auditor or Universal HealthShare to be usual and customary for the service or supply in question, taking into consideration the fee(s) which the Provider most frequently charges and/or accepts as payment for the service or supply from the majority of its patients, the cost to the Provider for providing the services, the prevailing range of fees charged and/or accepted for the service or supply by Providers of similar training and experience in the same geographic locale or area, and the Medicare reimbursement rates for the service or supply.',
        intent: '',
        offset_start: 280,
        offset_end: 301,
        offset_start_in_doc: 280,
        offset_end_in_doc: 301,
        document_id: '3565f19e07b9a844569751e8e707b246',
        meta: {
          name: 'UHS Sharing Program Guidelines - UHFR040721E040121.pdf',
          pageno: '50',
          _split_id: '5',
          vector_id: '1589',
          url:
            'https://digital-concierge-storage.s3.amazonaws.com/UHS%20Sharing%20Program%20Guidelines%20-%20UHFR040721E040121.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAW5MZIU5AZ7JBHOFH&Signature=mU1tAbv%2BNcSKvQHYzEnFZ3WczMM%3D&Expires=1627196411#page=50'
        }
      },
      {
        answer: 'Universal HealthShare',
        score: 7.390358924865723,
        probability: 0.20374229550361633,
        context:
          'Unsharable Expenses means expenses that either are of a type that are generally ineligible for sharing, or that arise from or in connection with a condition that is not eligible for sharing. Usual and Customary means eligible expenses identified by the Medical Expense Auditor or Universal HealthShare to be usual and customary for the service or supply in question, taking into consideration the fee(s) which the Provider most frequently charges and/or accepts as payment for the service or supply from the majority of its patients, the cost to the Provider for providing the services, the prevailing range of fees charged and/or accepted for the service or supply by Providers of similar training and experience in the same geographic locale or area, and the Medicare reimbursement rates for the service or supply.',
        intent: '',
        offset_start: 280,
        offset_end: 301,
        offset_start_in_doc: 280,
        offset_end_in_doc: 301,
        document_id: '3565f19e07b9a844569751e8e707b246',
        meta: {
          name: 'UHS Sharing Program Guidelines - UHFR040721E040121.pdf',
          pageno: '50',
          _split_id: '5',
          vector_id: '1589',
          url:
            'https://digital-concierge-storage.s3.amazonaws.com/UHS%20Sharing%20Program%20Guidelines%20-%20UHFR040721E040121.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAW5MZIU5AZ7JBHOFH&Signature=mU1tAbv%2BNcSKvQHYzEnFZ3WczMM%3D&Expires=1627196411#page=50'
        }
      }
    ],
    node_id: 'Reader'
  },
  {
    query: 'Show me my ID Card ?',
    no_ans_gap: 0.08761119842529297,
    answers: [
      {
        answer: 'Which Id card are you looking for?',
        score: 7.390358924865723,
        probability: 0.20374229550361633,
        context: 'Which Id card are you looking for?',
        options: [
          { message: 'Show me my Membership ID', intent: 'Membership ID' },
          { message: 'Request a HealthTool Card', intent: 'Payment Card' }
        ],
        offset_start: 280,
        offset_end: 301,
        intent: '',
        offset_start_in_doc: 280,
        offset_end_in_doc: 301,
        document_id: '3565f19e07b9a844569751e8e707b246',
        meta: {
          name: 'UHS Sharing Program Guidelines - UHFR040721E040121.pdf',
          pageno: '50',
          _split_id: '5',
          vector_id: '1589',
          url:
            'https://digital-concierge-storage.s3.amazonaws.com/UHS%20Sharing%20Program%20Guidelines%20-%20UHFR040721E040121.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAW5MZIU5AZ7JBHOFH&Signature=mU1tAbv%2BNcSKvQHYzEnFZ3WczMM%3D&Expires=1627196411#page=50'
        }
      }
    ],
    node_id: 'Reader'
  },
  {
    query: 'Show me My Needs?',
    no_ans_gap: 0.08761119842529297,
    answers: [
      {
        answer: 'Which Id card are you looking for?',
        score: 7.390358924865723,
        probability: 0.20374229550361633,
        context: 'Tap below to know about your Needs',
        options: [{ message: 'Show me my Needs', intent: 'MyNeeds' }],
        offset_start: 280,
        offset_end: 301,
        intent: '',
        offset_start_in_doc: 280,
        offset_end_in_doc: 301,
        document_id: '3565f19e07b9a844569751e8e707b246',
        meta: {
          name: 'UHS Sharing Program Guidelines - UHFR040721E040121.pdf',
          pageno: '50',
          _split_id: '5',
          vector_id: '1589',
          url:
            'https://digital-concierge-storage.s3.amazonaws.com/UHS%20Sharing%20Program%20Guidelines%20-%20UHFR040721E040121.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAW5MZIU5AZ7JBHOFH&Signature=mU1tAbv%2BNcSKvQHYzEnFZ3WczMM%3D&Expires=1627196411#page=50'
        }
      }
    ],
    node_id: 'Reader'
  },
  {
    query: 'Show me My Program Information?',
    no_ans_gap: 0.08761119842529297,
    answers: [
      {
        answer: 'Which Id card are you looking for?',
        score: 7.390358924865723,
        probability: 0.20374229550361633,
        context: 'Tap below to know about your Program Information',
        options: [{ message: 'Show me my Program Information', intent: 'ProgramInformation' }],
        offset_start: 280,
        offset_end: 301,
        intent: '',
        offset_start_in_doc: 280,
        offset_end_in_doc: 301,
        document_id: '3565f19e07b9a844569751e8e707b246',
        meta: {
          name: 'UHS Sharing Program Guidelines - UHFR040721E040121.pdf',
          pageno: '50',
          _split_id: '5',
          vector_id: '1589',
          url:
            'https://digital-concierge-storage.s3.amazonaws.com/UHS%20Sharing%20Program%20Guidelines%20-%20UHFR040721E040121.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAW5MZIU5AZ7JBHOFH&Signature=mU1tAbv%2BNcSKvQHYzEnFZ3WczMM%3D&Expires=1627196411#page=50'
        }
      }
    ],
    node_id: 'Reader'
  },
  {
    query: 'Show me My Transaction?',
    no_ans_gap: 0.08761119842529297,
    answers: [
      {
        answer: 'Which Id card are you looking for?',
        score: 7.390358924865723,
        probability: 0.20374229550361633,
        context: 'Tap below to know about your Transaction',
        options: [{ message: 'Show me my Transaction', intent: 'Transaction' }],
        offset_start: 280,
        offset_end: 301,
        intent: '',
        offset_start_in_doc: 280,
        offset_end_in_doc: 301,
        document_id: '3565f19e07b9a844569751e8e707b246',
        meta: {
          name: 'UHS Sharing Program Guidelines - UHFR040721E040121.pdf',
          pageno: '50',
          _split_id: '5',
          vector_id: '1589',
          url:
            'https://digital-concierge-storage.s3.amazonaws.com/UHS%20Sharing%20Program%20Guidelines%20-%20UHFR040721E040121.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAW5MZIU5AZ7JBHOFH&Signature=mU1tAbv%2BNcSKvQHYzEnFZ3WczMM%3D&Expires=1627196411#page=50'
        }
      }
    ],
    node_id: 'Reader'
  },
  {
    query: 'Show me My health questionnaire?',
    no_ans_gap: 0.08761119842529297,
    answers: [
      {
        answer: 'Which Id card are you looking for?',
        score: 7.390358924865723,
        probability: 0.20374229550361633,
        context: 'Tap below to know about your health questionnaire',
        options: [{ message: 'Show me my health questionnaire', intent: 'Medical' }],
        offset_start: 280,
        offset_end: 301,
        intent: '',
        offset_start_in_doc: 280,
        offset_end_in_doc: 301,
        document_id: '3565f19e07b9a844569751e8e707b246',
        meta: {
          name: 'UHS Sharing Program Guidelines - UHFR040721E040121.pdf',
          pageno: '50',
          _split_id: '5',
          vector_id: '1589',
          url:
            'https://digital-concierge-storage.s3.amazonaws.com/UHS%20Sharing%20Program%20Guidelines%20-%20UHFR040721E040121.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&AWSAccessKeyId=AKIAW5MZIU5AZ7JBHOFH&Signature=mU1tAbv%2BNcSKvQHYzEnFZ3WczMM%3D&Expires=1627196411#page=50'
        }
      }
    ],
    node_id: 'Reader'
  }
]
