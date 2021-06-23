import $ from "jquery";

export default class urlHelper {
  static base_url() {
    return "https://enterpriseproject18055445.appspot.com";
  }

  static route_helper(route) {
    return this.base_url() + route;
  }

  static async requestFactory(
    route,
    requestType,
    requestData,
    requestHeaders
  ) {
    return new Promise((resolve, reject) => {
      var settings = {
        url: this.route_helper(route),
        method: requestType,
        timeout: 0,
        headers: requestHeaders,
        data: requestData,
      };

      // console.log(settings);

      $.ajax(settings).done(function (response, success) {
        resolve({success: success, response: response});
      }).fail(function (jqXHR, exception) {
        resolve({success: exception, response: jqXHR})
      });


    });
  }
}
