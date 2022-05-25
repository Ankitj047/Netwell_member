export const passwordCheck = {
  chechForNumbers: string => {
    var matches = string.match(/\d+/g)
    let value = matches != null ? true : false
    return value
  },

  checkForUpperCase: string => {
    var matches = string.match(/[A-Z]/)
    let value = matches != null ? true : false
    return value
  },

  checkForLowerCase: string => {
    var matches = string.match(/[a-z]/)
    let value = matches != null ? true : false
    return value
  },

  checkForSymbols: string => {
    var symbols = new RegExp(/[^A-Za-z0-9]/)
    let value = symbols.test(string) ? true : false
    return value
  },

  checkPwdLength: string => {
    let value = string.length > 7 ? true : false
    return value
  }
}

export const getQueryParams = () => {
  let url = window.location.href
  let queryObj = {}
  if (url.split('login?').length > 1) {
    let queryString = url.split('login?')[1]
    let queryParams = new URLSearchParams(queryString)
    if (queryParams.has('u') && queryParams.has('p')) {
      let userName = decodeURI(queryParams.get('u'))
      let password = decodeURI(queryParams.get('p'))
      queryObj = { u: userName, p: password }
    }
  }
  return queryObj
}
