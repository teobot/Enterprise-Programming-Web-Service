import Cookies from "js-cookie";

export default class cookieHelper {
  static getCookie(cname) {
    return Cookies.get(cname);
  }

  static setCookie(cname, cvalue) {
    Cookies.set(cname, cvalue);
  }

  static checkCookieExists(cname) {
    if (Cookies.get(cname) !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  static delete_cookie(cname) {
    Cookies.remove(cname);
  }
}
