const findIfAgentIsPresent = () => {
  const agentDetails = localStorage.getItem('AgentDetails')
  if (agentDetails !== '{}') {
    return true
  }
  return false
}

const isHealthTool = JSON.parse(localStorage.getItem('HealthTool'))
const ChatInput = [
  {
    query: 'memberPortal',
    options: [{ message: 'Member Portal', intent: 'memberPortal' }]
  },
  {
    query: 'greet',
    options: [
      { message: 'Show me my ID Card', intent: 'Membership ID' },
      { message: 'View Program Information', intent: 'program information' },
      { message: 'Show my Notifications', intent: 'notifications' },
      { message: 'Search KnowledgeBase', intent: 'Search KnowledgeBase' }
    ]
  },
  {
    query: 'idcard',
    options: [
      { message: 'Show me my Membership ID', intent: 'Membership ID' },
      { message: 'Show me my Health Tool Card', intent: 'Health Tool' }
    ].filter(item => {
      if (item.intent === 'Health Tool' && isHealthTool) {
        return item
      }
      if (item.intent === 'Membership ID') {
        return item
      }
    })
  },
  {
    query: 'agent',
    options: [{ message: 'Email Health Rep', intent: 'Email_Agent' }],
    subSection: [
      {
        subquery: 'agent/contact_agent',
        subOption: [{ message: 'Email Health Rep', intent: 'Email_Agent' }].filter(i => {
          if (findIfAgentIsPresent()) {
            return i
          }
        })
      }
    ]
  },
  {
    query: 'payment',
    options: [
      { message: 'Show My Transactions', intent: 'Transactions' },
      { message: 'Change Payment Method', intent: 'PaymentMethod' },
      { message: 'Change Billing Date', intent: 'BillingDate' }
    ],
    subSection: [
      {
        subquery: 'payment/billingoptions',
        subOption: [
          { message: 'Show My Transactions', intent: 'Transactions' },
          { message: 'Change Payment Method', intent: 'PaymentMethod' },
          { message: 'Change Billing Date', intent: 'BillingDate' }
        ]
      },
      {
        subquery: 'payment/current',
        subOption: [
          { message: 'Show My Transactions', intent: 'Transactions' },
          { message: 'Change Payment Method', intent: 'PaymentMethod' },
          { message: 'Change Billing Date', intent: 'BillingDate' }
        ]
      },
      {
        subquery: 'payment/change',
        subOption: [
          { message: 'Show My Transactions', intent: 'Transactions' },
          { message: 'Change Payment Method', intent: 'PaymentMethod' },
          { message: 'Change Billing Date', intent: 'BillingDate' }
        ]
      },
      {
        subquery: 'payment/problems',
        subOption: [{ message: 'Email Member Services', intent: 'Email' }]
      },
      {
        subquery: 'payment/dues',
        subOption: [
          { message: 'Show My Transactions', intent: 'Transactions' },
          { message: 'Change Billing Date', intent: 'BillingDate' }
        ]
      }
    ]
  },
  {
    query: 'rxsimpleshare',
    options: [
      {
        message: 'View RxSimpleShareFormuary',
        intent: 'RxSimpleShareFormuary',
        link: 'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf'
      },
      { message: 'Download Pharma Apps', intent: 'pharma' },
      {
        message: 'View RxSimpleShare Program',
        intent: 'RxSimpleShareFormuary',
        link: 'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-RxSimpleShare-Flyer.pdf',
        pharmaCheck: true
      },
      { message: 'Change Add-ons', intent: 'program information', pharmaCheck: true }
    ],
    subSection: [
      {
        subquery: 'rxsimpleshare/signup',
        subOption: [
          { message: 'Change Add-ons', intent: 'program information' },
          {
            message: 'View RxSimpleShareFormuary',
            intent: 'RxSimpleShareFormuary',

            link:
              'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf'
          },
          { message: 'Download Pharma Apps', intent: 'pharma', link: 'https://fliptrx.com/' }
        ]
      },
      {
        subquery: 'rxsimpleshare/cancel',
        subOption: [
          { message: 'Email Member Services', intent: 'Email' },
          { message: 'Change Add-ons', intent: 'program information' }
        ]
      }
    ]
  },
  {
    query: 'program',
    options: [
      { message: 'Show Program Information', intent: 'program information' },
      { message: 'Search Sharing Guidelines', intent: 'Search Sharing Guidelines' }
    ],
    subSection: [
      {
        subquery: 'program/information',
        subOption: [
          { message: 'Show Program Information', intent: 'program information' },
          { message: 'Search Sharing Guidelines', intent: 'Search Sharing Guidelines' }
        ]
      },
      {
        subquery: 'program/NSA_ACSM',
        subOption: [
          { message: 'Show Program Information', intent: 'program information' },
          { message: 'Search Sharing Guidelines', intent: 'Search Sharing Guidelines' }
        ]
      },
      {
        subquery: 'program/limits',
        subOption: [
          { message: 'Show Program Information', intent: 'program information' },
          // { message: 'Show Sharing Guidelines', intent: 'sharingGuideline' },
          { message: 'Search Sharing Guidelines', intent: 'Search Sharing Guidelines' }
        ]
      },
      {
        subquery: 'program/cancel',
        subOption: [{ message: 'Email Member Services', intent: 'Email' }]
      },
      {
        subquery: 'program/change_addons',
        subOption: [
          { message: 'Show Program Information', intent: 'program information' },
          { message: 'Change Add-ons', intent: 'program information' }
        ]
      },
      {
        subquery: 'program/change_dependents',
        subOption: [
          { message: 'Show Program Information', intent: 'program information' },
          { message: 'Change Dependents', intent: 'changeDependants' }
        ]
      }
    ]
  },
  {
    query: 'customer_service',
    options: [{ message: 'Email Member Services', intent: 'Email' }]
  },
  {
    query: 'provider_find_telemed',
    options: [
      { message: 'Find a Provider', intent: 'find_provider' },
      { message: 'Open Telemed', intent: 'telemed' }
    ]
  },
  {
    query: 'healthtool',
    options: [
      { message: 'Show me my Health Tool Card', intent: 'Health Tool', healthtoolCheck: true },
      { message: 'Change Add-ons', intent: 'program information', signupHealthTool: true }
    ],
    subSection: [
      {
        subquery: 'healthtool/signup',
        subOption: [
          { message: 'Change Add-ons', intent: 'program information' },
          { message: 'Show me my Health Tool Card', intent: 'Health Tool' }
        ]
      },
      {
        subquery: 'healthtool/cancel',
        subOption: [
          { message: 'Email Member Services', intent: 'Email' },
          { message: 'Change Add-ons', intent: 'program information' }
        ]
      }
    ]
  },
  {
    query: 'health_questionnaire',
    options: [
      { message: 'Show me my Health Questionary', intent: 'health questionary' },
      { message: 'Search KnowledgeBase', intent: 'Search KnowledgeBase' }
    ]
  },
  {
    query: 'pharma',
    options: [
      {
        message: 'View RxSimpleShareFormuary',
        intent: 'RxSimpleShareFormuary',
        pharmaCheck: true,
        link: 'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf'
      },
      { message: 'Download Pharma Apps', intent: 'pharma', link: 'https://fliptrx.com/', pharmaCheck: true },
      {
        message: 'View RxSimpleShare Program',
        intent: 'RxSimpleShareProgram',
        link: 'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-RxSimpleShare-Flyer.pdf',
        pharmaCheck: true
      },
      { message: 'Change Add-ons', intent: 'program information', pharmaCheck: true }
    ],
    subSection: [
      {
        subquery: 'pharma/signup',
        subOption: [
          { message: 'Change Add-ons', intent: 'program information', pharmaCheck: true },
          {
            message: 'View RxSimpleShareFormuary',
            intent: 'RxSimpleShareFormuary',
            pharmaCheck: true,
            link:
              'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf'
          },
          { message: 'Download Pharma Apps', intent: 'pharma', link: 'https://fliptrx.com/', pharmaCheck: true }
        ]
      },
      {
        subquery: 'pharma/cancel',
        subOption: [
          { message: 'Email Member Services', intent: 'Email' },
          { message: 'Change Add-ons', intent: 'program information', pharmaCheck: true },
          {
            message: 'View RxSimpleShareFormuary',
            intent: 'RxSimpleShareFormuary',
            pharmaCheck: true,
            link:
              'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf'
          },
          {
            message: 'View RxSimpleShare Program',
            intent: 'RxSimpleShareProgram',
            link: 'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-RxSimpleShare-Flyer.pdf',
            pharmaCheck: true
          },
          { message: 'Download Pharma Apps', intent: 'pharma', link: 'https://fliptrx.com/', pharmaCheck: true }
        ]
      },
      {
        subquery: 'pharma/medicines',
        subOption: [
          {
            message: 'View RxSimpleShareFormuary',
            intent: 'RxSimpleShareFormuary',
            pharmaCheck: true,
            link:
              'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-RxSimpleShareFormuary.pdf'
          },
          { message: 'Download Pharma Apps', intent: 'pharma', link: 'https://fliptrx.com/', pharmaCheck: true },
          {
            message: 'View RxSimpleShare Program',
            intent: 'RxSimpleShareProgram',
            link: 'https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-RxSimpleShare-Flyer.pdf',
            pharmaCheck: true
          },
          { message: 'Change Add-ons', intent: 'program information', pharmaCheck: true }
        ]
      }
    ]
  },
  {
    query: 'guidelines_document',
    options: [
      { message: 'Show me my Documents', intent: 'documents' },
      { message: 'Search Sharing Guidelines', intent: 'Search Sharing Guidelines' }
    ]
  },
  {
    query: 'notifications',
    options: [
      { message: 'Show me my Notifications', intent: 'notifications' },
      { message: 'Show Announcements & Notices', intent: 'Announcements' }
    ]
  },
  {
    query: 'telemed',
    options: [{ message: 'Open Telemed', intent: 'telemed' }]
  },
  {
    query: 'eligibility',
    options: [
      { message: 'Show Program Information', intent: 'program information' },
      { message: 'Search Sharing Guidelines', intent: 'Search Sharing Guidelines' }
    ]
  },
  {
    query: 'nlu_fallback',
    options: [{ message: 'Search KnowledgeBase', intent: 'Search KnowledgeBase' }]
  },
  {
    query: 'contact_information',
    options: [
      { message: 'Contact information', intent: 'ContactInformation' },
      { message: 'Email Member Services', intent: 'Email' }
    ],
    subSection: [
      {
        subquery: 'contact_information/change',
        subOption: [{ message: 'Email Member Services', intent: 'Email' }]
      },
      {
        subquery: 'contact_information/current',
        subOption: []
      }
    ]
  },
  {
    query: 'my_needs',
    options: [
      { message: 'Show my needs', intent: 'needs' },
      { message: 'Search Sharing Guidelines', intent: 'Search Sharing Guidelines' }
    ]
  },
  {
    query: 'out_of_scope',
    options: []
  }
]

export const splitMulti = (str, tokens) => {
  var tempChar = tokens[0] // We can use the first token as a temporary join character
  for (var i = 1; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(tempChar)
  }
  str = str.split(tempChar)
  return str
}
export const splitMessage = message => {
  let list = splitMulti(message, ['AIKB - ', ',url - ', 'typeofintent - ', ',query - '])

  return list
}

export default ChatInput
