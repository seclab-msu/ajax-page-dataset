// See https://github.com/vhx/crystal/pull/15136 for this file's original comments.
var VHX = VHX || {};
VHX.Class = VHX.Class || {};
VHX.Utils = VHX.Utils || {};

var getCookie = function (name) {
  var r = document.cookie.match('\\b' + name + '=([^;]*)\\b');
  return r ? r[1] : null;
};

var gdprProtected = function () {
  if (window.location.href.indexOf('no_cookies=1') != -1) {
    return true;
  } else {
    return getCookie('gcp') === '0';
  }
};

var isTrackingDisabled = function () {
  if (window._current_site) {
    return (
      gdprProtected() ||
      (window._current_site.made_for_kids && window._current_site.made_for_kids_tracking_blocked)
    );
  } else {
    return gdprProtected();
  }
};

VHX.Class.Tracker = function () {
  var self = this,
    local;

  self.local = {
    settings: {},
    request: {},
  };

  local = self.local;

  self.init = function () {
    if (isTrackingDisabled()) {
      return;
    }

    local.settings = typeof window._vhx !== 'undefined' ? window._vhx : null;

    if (self.isEnabled()) {
      self.processRequest();
    }
  };

  self.processRequest = function () {
    local.request = {
      affiliate: self.getAffiliate(),
      campaign: self.getCampaign(),
      country: self.getCountry(),
      platform: self.getPlatform(),
      referrer: self.getReferrer(),
      ref: self.getQueryParam('ref'),
      utm_source: self.getQueryParam('utm_source'),
      utm_medium: self.getQueryParam('utm_medium'),
      utm_term: self.getQueryParam('utm_term'),
      utm_adgroup: self.getQueryParam('utm_adgroup'),
      utm_content: self.getQueryParam('utm_content'),
      utm_campaign: self.getQueryParam('utm_campaign'),
    };

    if (self.isUnique()) {
      self.writeCookie();

      if (!self.isTracked()) {
        self.flushToCollector();
      }
    }
  };

  self.isEnabled = function () {
    if (window.location.pathname.match(/admin|watch/i)) {
      return false;
    }

    if (local.settings === null) {
      return false;
    }

    if (
      !('environment' in local.settings) ||
      !('site' in local.settings) ||
      !('geo' in local.settings)
    ) {
      return false;
    }

    if (
      !('id' in local.settings.site) ||
      !('domain' in local.settings.site) ||
      !('host' in local.settings.site)
    ) {
      return false;
    }

    return true;
  };

  self.isUnique = function () {
    var cookie = self.readCookie(),
      triggers = ['affiliate', 'campaign', 'referrer', 'country', 'ref'],
      i;

    if (cookie === null || cookie['site_id'] != local.settings.site.id) {
      return true;
    }

    for (i in triggers) {
      if (local.request[triggers[i]] && local.request[triggers[i]] != cookie[triggers[i]]) {
        return true;
      }
    }

    return false;
  };

  self.isTracked = function () {
    return self.getQueryParam('uid').length > 0;
  };

  self.getReferrer = function () {
    var referrer = self.getQueryParam('referrer') || document.referrer,
      domain_regex,
      host_regex;

    if (referrer.match(/vhx.tv\/admin|assets.vhx.tv|cdn.vhx.tv|crystal.local|paypal.com/i)) {
      return '';
    }

    domain_regex = new RegExp(local.settings.site.domain, 'g');
    host_regex = new RegExp(local.settings.site.host, 'g');

    if (!!document.referrer.match(domain_regex) || !!document.referrer.match(host_regex)) {
      return '';
    }

    referrer = referrer.replace(/https?:\/\/(www\.)?/, '');
    referrer = referrer.replace(/\/$/, '');
    referrer = referrer.substring(0, 255);

    if (navigator.userAgent.toLowerCase().indexOf('fbav') !== -1 && referrer.length === 0) {
      return 'm.facebook.com';
    }

    if (navigator.userAgent.toLowerCase().indexOf('twitter') !== -1 && referrer.length === 0) {
      return 'mobile.twitter.com';
    }

    return referrer;
  };

  self.getPlatform = function () {
    if (navigator.userAgent.match(/iPad|iPhone|iPod/i)) {
      return 'ios';
    }

    if (navigator.userAgent.match(/Android/i)) {
      return 'android';
    }

    if (navigator.userAgent.match(/Windows/i)) {
      return 'windows';
    }

    if (navigator.userAgent.match(/Macintosh/i)) {
      return 'macintosh';
    }

    if (navigator.userAgent.match(/Linux/i)) {
      return 'linux';
    }
  };

  self.getAffiliate = function () {
    return self.getQueryParam('affiliate');
  };

  self.getCampaign = function () {
    return self.getQueryParam('campaign') || self.getCampaignFromReferrer();
  };

  self.getCampaignFromReferrer = function () {
    var referrer = self.getCookieValue('referrer_url'),
      campaign = referrer.split('campaign=')[1];

    return campaign ? campaign : '';
  };

  self.getCountry = function () {
    return local.settings.geo.country;
  };

  self.getQueryParam = function (key) {
    var params = {},
      parts;

    if (window.location.search) {
      parts = location.search.slice(1).split('&');

      parts.forEach(function (part) {
        var pair = part.split('=');
        pair[0] = decodeURIComponent(pair[0]);
        pair[1] = decodeURIComponent(pair[1]);
        params[pair[0]] = typeof pair[1] !== 'undefined' ? pair[1] : true;
      });
    }

    return params[key] || '';
  };

  self.readCookie = function () {
    var value = '; ' + document.cookie,
      parts = value.split('; tracker='),
      cookie;

    if (parts.length === 2) {
      cookie = parts.pop().split(';').shift();
      return JSON.parse(decodeURIComponent(cookie));
    }

    return null;
  };

  self.getCookieValue = function (name) {
    var regex = new RegExp('(?:(?:^|.*; *)' + name + ' *= *([^;]*).*$)|^.*$');
    return document.cookie.replace(regex, '$1');
  };

  self.writeCookie = function () {
    local.request.uid = Math.floor(Math.random() * 10e12);
    local.request.site_id = local.settings.site.id;

    for (var key in local.request) {
      if (!local.request[key]) {
        delete local.request[key];
      }
    }

    document.cookie = 'tracker=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    var tracker = 'tracker=' + encodeURIComponent(JSON.stringify(local.request)) + ';';

    if (document.location.protocol === 'https:') {
      document.cookie = tracker + ' Secure;';
    } else {
      document.cookie = tracker;
    }

    return true;
  };

  self.flushToCollector = function (payload) {
    var image = new Image(),
      host = local.settings.environment === 'production' ? 'https://collector.vhx.tv' : null,
      params = self.parameters(payload).join('&');

    if (host && params.length > 0) {
      image.src = host + '/events.gif' + '?' + params + '&_=' + new Date().getTime();
      return image;
    }
  };

  self.parameters = function (payload) {
    var params = [],
      data = payload || self.readCookie(),
      key;

    if (data !== null) {
      for (key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
      }
    }

    return params;
  };

  self.pushMetric = function (payload) {
    try {
      self.flushToCollector(payload);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  self.init();

  return {
    init: self.init,
    params: self.parameters,
    pushMetric: self.pushMetric,
  };
};

VHX.Tracker = VHX.Class.Tracker();
