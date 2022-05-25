import React, { Component } from 'react'
import { getCuramLife, gethealthcard } from '../ApiCall'
import './WebScreens.css'
export default class CuramLifeCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribed: false,
      memberDetails: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('memberSSN') !== '') {
      // this.getCuramLifeCard({
      //   memberSSN: localStorage.getItem('memberSSN'),
      //   type: 'self'
      // })
      this.getCuramLifeCard({
        memberSSN: localStorage.getItem('memberSSN'),
        type: 'family'
      })
    } else {
      gethealthcard().then(res => {
        if (res) {
          // this.getCuramLifeCard({
          //   memberSSN: localStorage.getItem('memberSSN'),
          //   type: 'self'
          // })
          this.getCuramLifeCard({
            memberSSN: localStorage.getItem('memberSSN'),
            type: 'family'
          })
        }
      })
    }
  }

  getCuramLifeCard = obj => {
    getCuramLife(obj).then(res => {
      this.setState({ memberDetails: [...this.state.memberDetails, ...res?.data], subscribed: res.data?.length > 0 ? true : false })
    })
  }

  render() {
    return (
      <div class="contactinfocard">
        <div class="myneeds_top_container">
          <img src={require('../Images/CuramLife.webp')} class="CuramLife" />
          <div class="myneeds_header_text" style={{ margin: 0 }}>
            UHF / Curam Wellness Center™
          </div>
        </div>

        <div class="">
          <div class="contact_infomiddiv text-left" style={{ paddingLeft: 13, paddingRight: 24, paddingBottom: 6 }}>
            {!this.state.subscribed && (
              <div>
                <div class="The-UHF-Curam-Wellness-Center-1" style={{ paddingTop: 16, paddingBottom: 6 }}>
                  The UHF / Curam Wellness Center can support UHF members and their families with easy access to nutritional and dietary
                  programs, financial assistance application support, and an online app making it easy for you to customize the best
                  caregiver support for you and your family – all at no additional cost to your UHF membership.
                  <div class="text-style-1" style={{ marginTop: 15 }}>
                    Can we hook you up with the Wellness Center?
                  </div>
                  <ul style={{ paddingBottom: 6 }}>
                    <li style={{ marginLeft: -15, marginTop: 10 }}>
                      Call a CuramLife rep at&nbsp;
                      <span class="text-style-2">
                        <a href="tel:888-282-8726">
                          888-AT-CURAM <span style={{ display: 'inline-block' }}>(888-282-8726)</span>
                        </a>
                      </span>
                    </li>
                    <li style={{ marginLeft: -15, marginTop: 5 }}>
                      Email&nbsp;
                      <span class="text-style-2">
                        <a href="mailto:UHFmembers@curamlife.com">UHFmembers@curamlife.com</a>
                      </span>
                    </li>
                    <li style={{ marginLeft: -15, marginTop: 5 }}>
                      or Select a convenient time where we can call you&nbsp;
                      <span class="text-style-2">
                        <a
                          href={`https://www.universalhealthfellowship.org/enroll-curam-wellness-center/?mname=${encodeURI(
                            localStorage.getItem('subscriberName')
                          )}&memail=${localStorage.getItem('userMail')}`}
                          target="_blank"
                        >
                          here
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {this.state.subscribed && (
              <div>
                <div style={{ paddingTop: 16 }}>
                  <span class="Subscribed-Program">Subscribed Program</span>{' '}
                </div>
                <div>
                  <span class="Value">{`Kelly's Choice Wellness and Nutrition Program`}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18 }}>
                  <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                    <div style={{ width: '50%' }}>
                      <span class="Title">Subscribers</span>
                    </div>
                    <div>
                      <span class="Title">Effective Date</span>
                    </div>
                  </div>
                  {this.state.memberDetails.map(item => (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                          <div style={{ width: '50%' }}>
                            <span class="number1">{item.firstName + ' ' + item.lastName}</span>
                          </div>
                          {/* </div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}> */}
                          <div>
                            <span class="number1">{item.addOnEffectiveDate}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
