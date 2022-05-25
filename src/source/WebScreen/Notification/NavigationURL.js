import { getCardEnableData, getsharingguidlineslink, updateNotificationStatus } from '../../ApiCall'

export const NavigateURL = (id, url, type) => {
  let client_id = localStorage.getItem('CLIENT_ID')
  let obj = { notificationId: id }
  let cardName = ''
  if (type == undefined) {
    updateNotificationStatus(obj).then(res => {
      console.log('saveUserNotificationDetails=====', res)
    })
  }
  if (url == 'notices' || url == 'Notices' || url == 'NOTICES') {
    cardName = 'notices'
  }

  if (url == 'Medical') {
    cardName = 'HealthQuestionnaire'
  }
  if (url == 'Needs' || url == 'MyNeeds') {
    cardName = 'MyNeeds'
  }
  if (url == 'Transaction' || url == 'MobileTransaction') {
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
  if (url == 'HealthyLife') {
    cardName = 'HealthyLife'
  }
  if (url == 'PaymentWallet') {
    cardName = 'PaymentWallet'
  }
  console.log('saveUserNotificationDetails=====Notice')

  getCardEnableData(client_id, cardName).then(res => {
    if (cardName == 'HealthTool') {
      if (res.data.response.enable == 'true' || res.data.response.enable == true) {
        localStorage.setItem('healthTool', true)

        window.location.href = '/'

              } else {
        localStorage.setItem('openModal', true)

        window.location.href = '/'

              }
    }
    if (res.data.response.enable == 'false' || res.data.response.enable == false) {
            
      localStorage.setItem('openModal', true)

      window.location.href = '/'

      
            if (type == undefined) {
        updateNotificationStatus(obj).then(res => {
          console.log('saveUserNotificationDetails=====', res)
        })
      }
    } else {
      if (cardName == 'HealthQuestionnaire') {
        window.location.href = '/Medical'
      }
      if (cardName == 'MyNeeds') {
        window.location.href = '/MyNeeds?open=true'
      }

      if (cardName == 'ProgramInformation') {
        window.location.href = '/ProgramInformation'
      }
      if (cardName == 'MembershipId' || cardName == 'HealthyLife') {
                        localStorage.setItem('memberId', true)

        window.location.href = '/'
      }

      if (cardName == 'Documents') {
                                localStorage.setItem('document', true)

        window.location.href = '/'
              }
      if (cardName == 'MyTransaction') {
        window.location.href = '/Transaction'
      }
      if (cardName == 'PaymentWallet') {
        window.location.href = '/PaymentWallet'
      }
      if (cardName == 'notices') {
                var windowReference = window.open()

        getsharingguidlineslink().then(res => {
          console.log('Sharing Guidlines', res)
          if (res.data && res.data.length > 0) {
            console.log('Shating guidlines response')
            let providerLink = res.data[0].fieldValue
            windowReference.location = providerLink
                      } else {
            console.log('Sharing guidlines else block')
            alert('Data Not Availabel')
          }
        })
      }
    }
  })
}
