$(document).ready(function () {
  toggleLightTheme();
  togglePreviewNav();
  var searchParams = new URLSearchParams(window.location.search);
  param = searchParams.get('ad_sub');
  if (param != null) {
    $('#search_form').attr('data-url', $('#search_form').data('url') + `?ad_sub=${param}`);
    $('a').each(function (i, elem) {
      var href = $(this).attr('href');
      if (href != undefined) {
        if (href[0] == '/') {
          if (href.indexOf('?') != -1) {
            $(this).attr('href', `${href}&ad_sub=${param}`);
          } else {
            $(this).attr('href', `${href}?ad_sub=${param}`);
          }
        }  
      }
    });
  }

  $('.lang-select a').each(function (i, elem) {
    var charValue = $(elem).attr('href').indexOf('?');
    if (charValue !== -1) {
      var temporary = $(elem).attr('href').slice(0, charValue);
      $(elem).attr('href', temporary);
    } 
  })


  function initKVSPlayTrailerOnHover() {
    var timeout1;
    var timeout2;
    var interval;
    var count = 0;
    function trailerPlay(el) {
      var $this = el.parents('.thumb-bl').find('a');
      $('.thumb-video a video').not($this).hide();

      $this.addClass('video-playing');
      var $video = $this.find('video');
      var $image = $this.find('img');
      if ($video.length) {
        $video.show();
      } else {
        $('.js-swipe').hide();
        var $loader = $('<div class="preview-progress" style="position: absolute;z-index: 99;top: 0;right: 0;left: 0;width: 0;height: 3px;background: rgb(5,179,243);transition: width 1.2s;-webkit-backface-visibility: hidden;backface-visibility: hidden;will-change: width;"></div>');
        $this.append($loader);
        setTimeout(function () {
          $loader.css({ 'width': '100%' });
        });

        timeout1 = setTimeout(function () {
          //avoid downloading video with quick hover 
          var video_url = $this.attr('data-preview-custom');
          var video_subtitles = $this.attr('data-subtitles');
          // var $new_video = $('<video autoplay loop muted playsinline src="' + video_url + '"><track default kind="subtitles" src="' + video_subtitles + '" srclang="ru"></video>');
          var $new_video = $('<video autoplay loop muted playsinline src="' + video_url + '" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; background: rgb(0, 0, 0);z-index: 9;"></video>');

          function playVideo() {
            $this.append($new_video);
            $new_video.css({ 'position': "absolute", 'left': "0", 'top': "0", 'width': '100%', 'height': "100%", 'background': "#000000" })
            $new_video.get(0).play();
            $loader.remove();
          }
          timeout2 = setTimeout(function () {
            if ($new_video.get(0).readyState > 0) {
              //play video if already loaded in 1000 ms
              playVideo();
            } else {
              interval = setInterval(function () {
                //wait and play once loaded
                if ($new_video.get(0).readyState > 0) {
                  playVideo();
                  clearInterval(interval);
                }
              }, 100);
            }
          }, 1000);
        }, 200);
      }
    }


    // $('body').on('mouseenter', '[data-preview-custom]', function () {
    // 	trailerPlay($(this));
    // }).on('mouseleave', '[data-preview-custom]', function () {
    // 	clearTimeout(timeout1);
    // 	clearTimeout(timeout2);
    // 	clearInterval(interval);
    // 	var $this = $(this);
    // 	var $image = $this.find('img');
    // 	$image.show();
    // 	var $video = $this.find('video');
    // 	if ($video.length) {
    // 		$video.get(0).remove();
    // 	} 
    // 	$this.find('.preview-progress').remove();
    // });


    $(document).click(function (e) {
      if (!$(e.target).closest('.thumb-bl .preview').length) {
        $('.thumb-bl a video').hide();
        return;
      }

    });

    $('body').on('click', '.thumb-bl .preview', function (e) {
      var res = $(this).parents('.thumb-bl').find('a').data('preview-custom');
      if (res != undefined) {
        trailerPlay($(this));
      }

    })

  };


  initKVSPlayTrailerOnHover();
  function sizeHeader() {
    // if ($(window).width() < 966 && $(window).width() > 800) {
    // 	var l = $('.thumb-bl').width() / 323;
    // 	var t = (322 - (322 * l)) / 2;
    // 	var h = (182 - (182 * l)) / 2;
    // 	$('.head-wrapper').css({
    // 		transform: "scale(" + l + ")",
    // 		margin: "-"+ h +"px -"+ t +"px"
    // 	})
    // } else {
    // 	$('.head-wrapper').css({
    // 		transform: "scale(1)",
    // 		margin: "0px 0px"
    // 	});
    // };

    // if ($(window).width() < 1307 && $(window).width() > 781) {
    //   var l = $(window).width() / $('.wrapper').width();
    //   var t = ($('.wrapper').width() - ($('.wrapper').width() * l)) / 2;
    //   var h = ($('.wrapper').height() - ($('.wrapper').height() * l)) / 2;
    //   var num = 1.36;
    //   if (l > Number(num.toFixed(2))) {
    //     l = 1.36;
    //     h = 0;
    //     t = 0;
    //   };

    //   $('.wrapper').css({
    //     transform: "scale(" + l + ")",
    //     margin: "-" + h + "px -" + t + "px"
    //   });
    // } else {
    //   $('.wrapper').css({
    //     transform: "scale(1)",
    //     margin: "0px auto"
    //   });
    // };

    // 966px old value
    if ($(window).width() < 966 && $(window).width() > 781) {
      var l = $(window).width() / $('.wrapper').width();
      var t = ($('.wrapper').width() - ($('.wrapper').width() * l)) / 2;
      var h = ($('.wrapper').height() - ($('.wrapper').height() * l)) / 2;
      var num = 1.36;
      if (l > 1) {
        l = 1;
        h = 0;
        t = 0;
      };

      $('.wrapper').css({
        transform: "scale(" + l + ")",
        margin: "-" + h + "px -" + t + "px"
      });
    } else {
      $('.wrapper').css({
        transform: "scale(1)",
        margin: "0px auto"
      });
    };


  };
  sizeHeader();

  $(window).on("resize", function () {
    sizeHeader();
  })

  $('.search_toggle').click(function () {
    $head = $('.head-wrapper');
    if ($head.hasClass('search-active')) {
      $head.removeClass('search-active');
    } else {
      $head.addClass('search-active');
    }
  })

  $("body").click(function (e) {
    if (!$(e.target).closest('.search_toggle, .search, .head').length) {
      $('.head-wrapper').removeClass('search-active')
    }

    if (!$(e.target).closest('.mob-nav, .head-open-menu').length) {
      $('body').removeClass('open')
    }

    if ($(e.target).closest('.close-aside').length) {
      $('body').removeClass('open')
    }
  })

  $(".head-open-menu").click(function (e) {
    $('.head-wrapper').removeClass('search-active');
    $body = $('body');
    if ($body.hasClass('open')) {
      $body.removeClass('open');
    } else {
      $body.addClass('open');
    }
  })


  $('.on-player-close').click(
    function () {
      $('.on-player-wrap').hide();
    });

  //scroll to letter on TAG page
  $('.js-letter-tag [data-letter]').on('click', function () {
    var $this = $(this);
    var value = $this.attr('data-letter');

    var found = false;
    $('.tags-holder .letter').each(function () {
      var $this = $(this);
      if ($this.text() == value) {
        found = true;
        $('html').animate({
          scrollTop: $this.parent().offset().top
        }, 500);
      }
    });

    return false;
  });
  //scroll to letter on TAG page

  $('.show-title').on('click', function () {
    if ($('.video-info').hasClass('show')) {
      $('.video-info').removeClass('show');
    } else {
      $('.video-info').addClass('show');
    }
    return false;
  });

  $('.js-search-form').on('submit', function () {
    var $this = $(this);
    var url = $this.attr('action');
    var q = $this.find('[name="q"]').val();
    if (q == '') {
      return false;
    }
    window.location.href = url + q.replace(/\s/g, "-") + '/'

    return false;
  });

  $('.alphabet-open').on('click', function () {
    $parent = $(this).parents('.top-bl');
    $alphabet = $parent.find('.alphabet');

    if ($parent.hasClass('open')) {
      $(this).removeClass('open');
      $parent.removeClass('open');
    } else {
      $('.alphabet-open').removeClass('open');
      $(this).addClass('open');
      $parent.addClass('open');
    }
  });

  $(document).on("click", function (e) {
    if ((!$(e.target).closest(".alphabet, .alphabet-open").length) || ($(e.target).closest(".alphabet .cross").length)) {
      $(".top-bl-models, .top-bl-channels, .alphabet-open ").removeClass("open");
    }
  });

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  $('.vr-close').on('click', function () {
    var date = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    document.cookie = "vr_alert=hide; path=/; expires=" + date.toUTCString();
    $('.vr-wrap').css({ "display": "none" });
  });

  if (navigator.userAgent.search("VR") >= 0 || navigator.userAgent.search("MobileVR") >= 0 || navigator.userAgent.search("Oculus") >= 0 || navigator.userAgent.search("OculusBrowser") >= 0) {
    var vr_alert = getCookie('vr_alert');
    if (vr_alert == null) {
      $('.vr-wrap').css({
        "display": "block"
      })
    }
  }

  if ($('.seo_wrap').get(0) && $(window).width() < 800) {
    $container = $('.seo_wrap');
    $showMore = $container.find('.show_more');

    $seoBlock = $container.find('.mix_seo_text');
    $seoBlockHeight = $('.mix_seo_text').height()
    $fontSize = parseInt($seoBlock.css('line-height')) * 3;
    if ($seoBlockHeight > $fontSize) {
      $container.addClass('close')
      $seoBlock.css('height', $fontSize);
      $showMore.show();

      $showMore.on('click', function (e) {
        $showMoreBtn = $(this);

        if ($container.hasClass('close')) {
          $container.removeClass('close');
          $seoBlock.css('height', 'auto');
          $showMoreBtn.text('Show Less');
        } else {
          $container.addClass('close');
          $seoBlock.css('height', $fontSize);
          $showMoreBtn.text('Show More')
        }
      })
    } else {
      $('.show_more').remove()
    }
  }

  if ($('.js-filter-tags').length) {
    $('.js-filter-tags').keyup(function (e) {
      $substring = $('.js-filter-tags').val().toLowerCase();
      $tags = $('.tags-holder .item');
      $tags_holder = $('.tags-holder');
      $alphabet = $('.alphabet');
      $empty = $alphabet.attr('data-empty');
      $letters = $alphabet.find('[data-letter]');

      $tags.each(function () {
        $item = $(this);
        $itemText = $item.text().toLowerCase();

        if (!($itemText.indexOf($substring) >= 0)) {
          $item.addClass('hide');
          $item.css('display', 'none');
        } else {
          $item.removeClass('hide');
          $item.css('display', 'inline-block');
        }
      });

      $letters.each(function () {
        $letter = $(this).attr('data-letter');
        $holder = $(`[data-holder="${$letter}"]`);
        if (!$holder) $(this).remove();

        if (($holder.find('.item').length === $holder.find('.item.hide').length) || $holder.find('.item').length == 0) {
          $holder.css('display', 'none');
          $alphabet.find($(`[data-letter="${$letter}"]`)).css('display', 'none');
          $(`[data-letter="${$letter}"]`).addClass('hidden');
        } else {
          $holder.css('display', 'block');
          $alphabet.find($(`[data-letter="${$letter}"]`)).css('display', 'inline-block');
          $(`[data-letter="${$letter}"]`).removeClass('hidden');
        }
      });

      if ($alphabet.find('a').length == $alphabet.find('.hidden').length) {
        if (!$alphabet.find('.no_results').get(0)) {
          $no_result = $('<div class="no_results"></div>').text($empty)
          $alphabet.append($no_result);
        }
      } else {
        if ($alphabet.find('.no_results').get(0)) {
          $alphabet.find('.no_results').remove();
        }
      }

      sizeHeader();
    })
  }
  function setLanguage() {
    var ww = $(window).width();
    if (ww >= 800) {
      $('.head').find('.lang-select').show();
    } else {
      $('.head').find('.lang-select').hide();
    }

    $(document).on('click', '.lang_trigger', function () {
      $this = $(this);
      $parent = $this.closest('.lang-select')
      console.log($parent.hasClass('active'));

      if ($parent.hasClass('active')) {
        $parent.removeClass('active');
      } else {
        $parent.addClass('active');
      }
    })

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.lang-select').get(0)) {
        $('.lang-select').removeClass('active')
      }
    })
  }
  setLanguage()
  // $(window).on('resize', setLanguage)
});

//cookies alert
window.addEventListener("load", function () {
  var locale = window.location.origin.split('.')[0].split('//')[1];
  if ($.cookie('cookiesBanner') == null && locale.toLowerCase() != 'de' && locale.toLowerCase() != 'fr') {
    $('.cookiesBanner').removeClass('hidden')
  }


  $('.cookiesBanner .okButton').on('click', function () {
    $('.cookiesBanner').addClass('hidden')

    var domain = window.location.origin;
    var isMain = domain.indexOf('ok.xxx') >= 0 ? true : false;
    var expires = new Date();
    expires.setTime(expires.getTime() + (1200 * 60 * 60 * 1000));

    if (isMain) {
      document.cookie = 'cookiesBanner=true;expires=' + expires.toUTCString() + ';domain=.ok.xxx;path=/';
    } else {
      document.cookie = 'cookiesBanner=true;expires=' + expires.toUTCString() + ';domain=.okxxx1.com;path=/';
    }
  });

  $('.cookiesBanner .closeButton').on('click', function () {
    $('.cookiesBanner').addClass('hidden')
  });

});

function setCoutnryCookie(cookieName, cookieValue, limit) {
  if (checkDomainIsCom()) {
    $.cookie(cookieName, cookieValue, { expires: limit, domain: '.ok.xxx', path: '/' });
  } else {
    $.cookie(cookieName, cookieValue, { expires: limit, domain: '.okxxx1.com', path: '/' });
  }
}

function removeCoutnryCookie() {
  if (checkDomainIsCom()) {
    $.removeCookie('countryCode', { domain: '.ok.xxx', path: '/' });
  } else {
    $.removeCookie('countryCode', { domain: '.okxxx1.com', path: '/' });
  }
}

function checkDomainIsCom() {
  var domain = window.location.origin,
    isCom = domain.indexOf('ok.xxx') >= 0 ? true : false;
  return isCom;
}

function showLangTopAlert() {
  $topLangAlert = $('.lang-alert');
  $topLangAlertCross = $topLangAlert.find('.cross');
  $topLangAlertLink = $topLangAlert.find('a');

  $.cookie('hideLangAlert') == 'true' ? $topLangAlert.remove() : $topLangAlert.show();

  $topLangAlert.on('click', hideAlert);
  
  //handlers 
  function hideAlert(e) {
    var target = $(e.target);
    if (target.closest($topLangAlertLink).length) {
      e.preventDefault();
      var cookieName = 'countryCode',
        cookieValue = $topLangAlert.attr('data-native'),
        limit = 365 * 10;
    } else if (target.closest($topLangAlertCross).length) {
      var cookieName = 'hideLangAlert',
        cookieValue = 'true',
        limit = 30;
    } else {
      langAlertClick(target);
    }

    setCoutnryCookie(cookieName, cookieValue, limit)

    if (target.closest($topLangAlertCross).length) $topLangAlert.remove();
    if (target.closest($topLangAlertLink).length) window.location.replace($topLangAlertLink.attr('href'));
  }

  function langAlertClick(target) {
    var isMobileWrap = $(window).width() < 767 && !$(target).closest($topLangAlertCross).length;
    console.log($topLangAlertLink);
    if (isMobileWrap) $topLangAlertLink.click();
  }
}

function addTextToLangTopAlert() {
  $lang = (navigator.language || navigator.userLanguage).split('-'),
    $hostname = location.host.replace('www.', ''),
    $pathname = location.pathname,
    $acceptLang = ['en', 'de', 'fr', 'it', 'es', 'pt', 'hi'],
    $languageUrl = ["www.", "de.", "fr.", "it.", "es.", "pt.", "hi."],
    $languageFull = ['English', 'Deutsch', 'Français', 'Italiano', 'Español', 'Português', 'हिन्दी'],
    $isSuported = $.inArray($lang[0], $acceptLang),
    $lang_alert = {
      "www": `You are now viewing OK.XXX in English. <a href='%NATIVE_LINK%' data-langCookie='${$lang[0]}'>Switch to %NATIVE_LANG%.</a>`,
      "de": `Du siehst OK.XXX jetzt auf Englisch. <a href='%NATIVE_LINK%' data-langCookie='${$lang[0]}'>Wechsel zu %NATIVE_LANG%.</a>`,
      "fr": `Vous consultez maintenant OK.XXX en anglais. <a href='%NATIVE_LINK%' data-langCookie='${$lang[0]}'>Passer au %NATIVE_LANG%.</a>`,
      "it": `Stai visualizzando OK.XXX in inglese. <a href='%NATIVE_LINK%' data-langCookie='${$lang[0]}'>Passa all\'%NATIVE_LANG%.</a>`,
      "es": `Ahora estás viendo OK.XXX en inglés. <a href='%NATIVE_LINK%' data-langCookie='${$lang[0]}'>Cambiar a %NATIVE_LANG%.</a>`,
      "pt": `Agora você está vendo OK.XXX em inglês. <a href='%NATIVE_LINK%' data-langCookie='${$lang[0]}'>Trocar para %NATIVE_LANG%.</a>`,
      "hi": `अब आप OK.XXX को अंग्रेजी में देख रहे हैं। <a href='%NATIVE_LINK%' data-langCookie='${$lang[0]}'>%NATIVE_LANG% कोबदलें।</a>`,
    }

  if ($isSuported >= 0) {
    $precastLink = `//${$languageUrl[$isSuported]}${$hostname}${$pathname}`;
    if ($lang_alert[$lang[0]]) {
      $text = $lang_alert[$lang[0]]
        .replace('%NATIVE_LINK%', $precastLink)
        .replace('%NATIVE_LANG%', $languageFull[$isSuported])

      $('.lang-alert').prepend($text);
    } else {
      $('.lang-alert').remove();
    }
  } else {
    $('.lang-alert').remove();
  }
}

if ($('.lang-alert').length) {
  addTextToLangTopAlert();
  showLangTopAlert();
} 

$(document).on('click', '[data-langCookie]', function (e) {
  // e.preventDefault();
  var target = $(e.target).closest('a'),
    targetHref = target.attr('href'),
    cookieValue = target.attr('data-langCookie'),
    limit = 365 * 10;

  cookieValue == 'none' ? removeCoutnryCookie() : setCoutnryCookie('countryCode', cookieValue, limit);

  window.location.replace(targetHref);
});

function togglePreviewNav() {
  var body = $('body');
  var date = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);
  $('.js-preview-nav').on('click', function () {
      if (body.hasClass('preview-right')) {
          body.removeClass('preview-right');
          document.cookie = "kt_rt_preview_nav=left; path=/; expires=" + date.toUTCString() + "; domain=.ok.xxx";
      } else {
          body.addClass('preview-right');
          document.cookie = "kt_rt_preview_nav=right; path=/; expires=" + date.toUTCString() + "; domain=.ok.xxx";
      }
      return false;
  });
}

function toggleLightTheme() {
  var body = $('body');
  var $logo_light = $('.js-logo').attr('data-light');
  var $logo_dark = $('.js-logo').attr('data-dark');
  var date = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);
  $('.js-themes').on('click', function () {
      if (!body.hasClass('dark')) {
          body.addClass('dark');
          body.removeClass('light');
          $('.js-themes').addClass('active');
          $('.js-logo').attr('src',$logo_dark);
          document.cookie = "kt_rt_theme=dark; path=/; expires=" + date.toUTCString() + "; domain=.ok.xxx";
      } else {
          body.addClass('light');
          body.removeClass('dark');
          $('.js-themes').removeClass('active');
          $('.js-logo').attr('src',$logo_light);
          document.cookie = "kt_rt_theme=light; path=/; expires=" + date.toUTCString() + "; domain=.ok.xxx";
      }
      if ($('body').width()>799) {
          $('html, body').scrollTop($(document).height());
      }

      return false;
  });

  var kt_rt_theme = readCookieDelit('kt_rt_theme');
  if (kt_rt_theme === 'dark') {
      body.addClass('dark');
      body.removeClass('light');
      $('.js-themes').addClass('active');
  }
}