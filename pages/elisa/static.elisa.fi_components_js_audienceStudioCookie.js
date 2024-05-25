(function () {
  "use strict";

  checkCookieAndUpdateOrCreate()

  function checkCookieAndUpdateOrCreate() {
    var kppIdCookie = getCookie("kppid");
    var kppIdCreationTimeCookie = getCookie("kppidCreationTime")
    if(kppIdCookie && kppIdCreationTimeCookie) {
      if(checkDateGreaterThanOneMonth(kppIdCreationTimeCookie)) {
        setTimeout(checkCookieAndUpdateOrCreate, 10 * 60 * 1000);
        setCookie();
      }
    }else {
      setTimeout(checkCookieAndUpdateOrCreate, 10 * 60 * 1000);
      setCookie();
    }
  }

  function setCookie() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Cookie is set from the response header 'Set-Cookie' no need to do extra stuff
        console.log(xhttp.responseText);
      }
    };
    xhttp.open("GET", "//esco.elisa.fi/consent-management/verifyAudienceStudioCookie", true);
    xhttp.withCredentials = true;
    xhttp.send();
  }

  function checkDateGreaterThanOneMonth(date) {
    try {
      var cookieCreationDate = new Date(date)
      var today = new Date()
      var targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
      return targetDate > cookieCreationDate
    } catch (e) {
      console.log("Error during parsing creation date timestamp of KPP cookie with error" + e)
      return false
    }
  }

  function getCookie(cookieName) {
    var cookieId = cookieName + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieId) === 0) {
        return cookie.substring(cookieId.length, cookie.length);
      }
    }
    return null;
  }

})();
