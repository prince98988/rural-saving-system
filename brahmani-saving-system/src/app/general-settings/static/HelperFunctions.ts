import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

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
