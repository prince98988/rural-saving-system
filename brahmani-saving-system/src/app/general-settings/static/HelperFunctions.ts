import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

export function getMemberRole(cookieService: CookieService) {
  var role = decryptData(cookieService.get('memberRole'));
  if (role == null) return 'reader';
  else return role;
}
export function getMonthList() {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
}
export function getYearList() {
  return ['2021', '2022', '2023', '2024', '2025', '2026', '2027'];
}

export function getNextMonth(month: string) {
  if (month == 'Dec') return 'Jan';
  else {
    var monthList = getMonthList();
    return monthList[monthList.indexOf(month) + 1];
  }
}

export function getCryptpoKey() {
  return 'ganciskirvaapt';
}
export function encryptData(data: string) {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      getCryptpoKey()
    ).toString();
  } catch (e) {
    return '';
  }
}
export function decryptData(data: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, getCryptpoKey());
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

export function getCurrentUserName(cookieService: CookieService) {
  if (cookieService.check('userName')) return cookieService.get('userName');
  else return 'Unkown';
}
export function getCurrentUserMobileNumber(cookieService: CookieService) {
  if (cookieService.check('userMobileNumber'))
    return cookieService.get('userMobileNumber');
  else return 'Unkown';
}

export function getCurrentUserType(cookieService: CookieService) {
  if (cookieService.check('userMobileNumber'))
    return cookieService.get('userMobileNumber');
  else return 'Unkown';
}
export function makeCardAnimation(className: string) {
  var carEle = document.getElementsByClassName(className);
  for (let i = 0; i < carEle.length; i++) {
    carEle[i].classList.add('loading');
    carEle[i]
      .querySelector('.card-widget-body')
      ?.classList.add('visibility-hidden');
    carEle[i].querySelector('.main-text')?.classList.add('visibility-hidden');
    carEle[i]
      .querySelector('.welcome-text')
      ?.classList.add('visibility-hidden');
    carEle[i].querySelector('.card-body')?.classList.add('visibility-hidden');
  }
}

export function hideCardAnimation(className: string) {
  var carEle = document.getElementsByClassName(className);
  for (let i = 0; i < carEle.length; i++) {
    carEle[i].classList.remove('loading');
    carEle[i]
      .querySelector('.card-widget-body')
      ?.classList.remove('visibility-hidden');
    carEle[i]
      .querySelector('.main-text')
      ?.classList.remove('visibility-hidden');
    carEle[i]
      .querySelector('.welcome-text')
      ?.classList.remove('visibility-hidden');
    carEle[i]
      .querySelector('.card-body')
      ?.classList.remove('visibility-hidden');
  }
}

export function getUserDashboard(cookieService: CookieService) {
  var userType: string = getCurrentUserType(cookieService).toLowerCase();
  return 'dashboard-' + userType;
}
