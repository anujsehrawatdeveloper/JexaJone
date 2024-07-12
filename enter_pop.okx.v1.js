$(document).ready(function () {
  var language = window.location.origin.split('.')[0].split('//')[1];
  if (language.toLowerCase() == 'de' || language.toLowerCase() == 'fr') {
    open_disclaimer();
  }
})

function open_disclaimer() {
  if (!checkACookieExists()) {
    var domain = window.location.origin;
    var isMain = domain.indexOf('ok.xxx') >= 0 ? true : false;
    $('html').addClass('age-popup-open');
    $('.js-approve-btn').on('click', function () {
      $('.age-popup-open').removeClass('age-popup-open');
      // document.cookie = "age-popup=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      if (isMain) {
        $.cookie('cookiesBanner', true, { domain: '.ok.xxx', expires: 20 * 365, path: '/' });
      } else {
        $.cookie('cookiesBanner', true, { domain: '.okxxx1.com', expires: 20 * 365, path: '/' });
      }
    })
  } else {
    return
  }
}

function checkACookieExists() {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('cookiesBanner='))) {
    return true;
  } else {
    return false;
  }
}