import { getCardEnableData, getsharingguidlineslink, updateNotificationStatus } from '../../ApiCall'

export const NavigateURL = (id, url, type) => {
  let cardName = ''
  let client_id = localStorage.getItem('CLIENT_ID')
  let obj = { notificationId: id }

  if (type == undefined) updateNotificationStatus(obj).then(res => {})
  if (url == 'Medical') {
    cardName = 'HealthQuestionnaire'
  }
  if (url == 'Needs' || url == 'MyNeeds') {
    cardName = 'MyNeeds'
  }
  if (url == 'Transaction') {
    cardName = 'MyTransaction'
  }
  if (url == 'ProgramInformation') {
    cardName = 'ProgramInformation'
  }
  if (url == 'MemberIdcard' || url == 'DigitalHealthCardNew') {
    cardName = 'MembershipId'
  }
  if (url == 'HealthToolCard' || url == 'HealthToolsCard') {
    cardName = 'HealthTool'
  }
  if (url == 'DocumentsScreen') {
    cardName = 'Documents'
  }
  if (url == 'MobileTransaction') {
    cardName = 'ChangePayment'
  }
  if (url == 'HealthyLife') {
    cardName = 'HealthyLife'
  }
  if (url == 'PaymentWallet') {
    cardName = 'PaymentWallet'
  }
  if (url == 'notices') {
    cardName = 'notices'
  }

  getCardEnableData(client_id, cardName).then(res => {
    if (cardName == 'HealthTool') {
      if (res.data.response.enable == 'true' || res.data.response.enable == true) {
        window.location.href = '/HealthToolsCard'
      } else {
        localStorage.setItem('openModal', true)
        window.location.href = '/'
        // window.location.href ="/?openModal=true"
      }
    }

    if ((res && res.data.response.enable == 'false') || res.data.response.enable == false) {
      localStorage.setItem('openModal', true)
      window.location.href = '/'
    } else {
      if (cardName == 'HealthQuestionnaire') {
        window.location.href = '/MobileMedical'
      }
      if (cardName == 'MyNeeds') {
        window.location.href = '/MyNeedsMobile'
      }

      if (cardName == 'ProgramInformation') {
        window.location.href = '/ProgramInformation'
      }
      if (cardName == 'MembershipId') {
        window.location.href = '/DigitalHealthCardNew'
      }
      if (cardName == 'HealthyLife') {
        window.location.href = '/HealthyShareCard'
      }

      if (cardName == 'Documents') {
        window.location.href = '/DocumentsScreen'
      }
      if (cardName == 'MyTransaction') {
        window.location.href = '/MyTransactionMobile'
      }
      if (cardName == 'ChangePayment') {
        window.location.href = '/MobileTransaction'
      }
      if (cardName == 'PaymentWallet') {
        window.location.href = '/MyPaymentWalletMobile'
      }

      if (cardName == 'notices') {
        var windowReference = window.open()
        getsharingguidlineslink().then(res => {
          console.log('Sharing Guidlines', res)
          if (res.data && res.data.length > 0) {
            console.log('Shating guidlines response')
            let providerLink = res.data[0].fieldValue
            windowReference.location = providerLink
            // window.open('' + providerLink, '_blank')
          } else {
            console.log('Sharing guidlines else block')
            alert('Data Not Availabel')
          }
        })
      }
    }
  })
}
