const publicIp = require('public-ip');
export const getOs = () => {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return (os);

}

export const getDateTime = () => {
  var tempDate = new Date();
  var year = tempDate.getFullYear();
  var month = "" + (tempDate.getMonth() + 1);
  var day = "" + tempDate.getDate();
  var hour = "" + tempDate.getHours();
  var minute = "" + tempDate.getMinutes();
  var seconds = "" + tempDate.getSeconds();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hour.length < 2)
    hour = '0' + hour;
  if (minute.length < 2)
    minute = '0' + minute;
  if (seconds.length < 2)
    seconds = '0' + seconds;
  var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
  return (dateTime);
}

export const getPublicIP = async () => {
  var ipv4 = await publicIp.v4();
  return (ipv4);
}

export const getBrowser = () => {
  //const currDate = "Current Date= "+date;
  var browser;
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    browser = "Google Chrome";
  }
  // FIREFOX
  else if (navigator.userAgent.indexOf("Firefox") != -1) {
    browser = "Mozilla Firefox";
  }
  // INTERNET EXPLORER
  else if (navigator.userAgent.indexOf("MSIE") != -1) {
    browser = "Internet Exploder";
  }
  // EDGE
  else if (navigator.userAgent.indexOf("Edge") != -1) {
    browser = "Internet Exploder";
  }
  // SAFARI
  else if (navigator.userAgent.indexOf("Safari") != -1) {
    browser = "Safari";
  }
  // OPERA
  else if (navigator.userAgent.indexOf("Opera") != -1) {
    browser = "Opera";
  }
  // YANDEX BROWSER
  else if (navigator.userAgent.indexOf("Opera") != -1) {
    browser = "YaBrowser";
  }
  // OTHERS
  else {
    browser = "Others";
  }
  return browser
}
export const getDeviceType = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // some code..
    return "mobile";
  }
  else {
    return "computer";
  }
}