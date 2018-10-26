import '../css/reset.css'
import '../css/index.styl'
import '../font/iconfont.css'

import { Common } from './common'
const common = new Common();
const $ = common.$;

$(function () {

  fadeBanner();
  fadeHeaderLogin();
  fixedHeader();
  fadeFocusBanner();


  function fadeHeaderLogin() {

    // 开通
    common.fade_popup_box($('.header-vip-list'), $('.header-vip-list .header-popup-box'));
    // 上传
    common.fade_popup_box($('.header-upload-list'), $('.header-upload-list .header-popup-box'));
    // 客户端
    common.fade_popup_box($('.header-download-list'), $('.header-download-list .header-popup-box'));
    // 看过
    common.fade_popup_box($('.header-look-list'), $('.header-look-list .header-popup-box'));


    info();

    // 消息
    function info() {
      let infoNavLi = $('.header-info-list .popup-box-nav-list li');
      let infoNavLiBorder = infoNavLi.find('em');
      let infoNavLiAColor = infoNavLi.find('a');
      let infoNavMainItem = $('.header-info-list .popup-box-nav-main > div');

      common.init(infoNavMainItem, {'display': 'none'}, {'display': 'block'}, 0);
      common.init(infoNavLiBorder, {'display': 'none'}, {'display': 'block'}, 0);
      infoNavLiAColor.attr('class', '').eq(0).attr('class', 'active-color');

      common.fade_popup_box($('.header-info-list'), $('.header-info-list .header-popup-box'));
      infoNavLi.each(function (i) {
        $(this).mouseenter(function () {
          infoNavMainItem.eq(i).show().siblings().hide();
          infoNavLiAColor.attr('class', '').eq(i).attr('class', 'active-color');
          common.init(infoNavLiBorder, {'display': 'none'}, {'display': 'block'}, i);
        })
      });

    }

  }

  // header banner
  function fadeBanner() {
    let bannerEle = $('.header-banner');
    let ulEle = $('#banner-list');
    let liArrEle = ulEle.children('li');
    let descList = $('.banner-desc-list li');
    let descListText = descList.children('a');

    let nowIndex = 0;
    let timer = null;

    liArrEle.css('display', 'none').eq(0).css('display', 'block');

    $(descListText).each(function (i) {
      $(this).mouseenter(function () {
        nowIndex = i;
        fade(nowIndex)
      })
    });

    autoPlay();

    bannerEle.mouseenter(function () {
      clearInterval(timer)
    })
      .mouseleave(function () {
        clearInterval(timer);
        autoPlay()
      });

    function fade(i) {
      $(liArrEle[i]).fadeIn(300).siblings().fadeOut(300);
      $(descListText).removeClass('active-color').eq(i).addClass('active-color')
    }

    function autoPlay() {
      timer = setInterval(function () {
        if (nowIndex >= liArrEle.length - 1) {
          nowIndex = 0
        } else {
          nowIndex++
        }
        fade(nowIndex)
      }, 2000);
    }
  }

  // header吸顶和返回顶部
  function fixedHeader() {
    let headerEle = $('.header');
    let scrollTop = $('.scroll-top');
    $(document).scroll(function () {

      if (parseInt($(this).scrollTop()) > 70 && parseInt($(this).scrollTop()) < 589) {
        headerEle.css({'position': 'relative', 'top': 0, 'left': 0, 'display': 'none'});
        $('.header-banner').css('marginTop', 70)
      } else if (parseInt($(this).scrollTop()) >= 590) {
        headerEle.css({'position': 'fixed', 'top': 0, 'left': 0}).fadeIn(200);
        $('.header-banner').css('marginTop', 70)
      } else {
        headerEle.css({'display': 'block'})
        $('.header-banner').css('marginTop', 0)
      }

      // 返回顶部
      if (parseInt($(this).scrollTop()) > 800) {
        scrollTop.fadeIn(200)
      } else {
        scrollTop.fadeOut(200)
      }
    });
    scrollTop.click(function () {
      $('html,body').animate({scrollTop:0}, 300)
    })
  }

  // focus_banner
  function fadeFocusBanner () {
    let bannerUlEle = $('.focus-banner');
    let bannerLiEle = $('.focus-banner-list li');
    let bannerLiText = $('.focus-banner-desc li');
    let prev = $('.focus-banner-click .banner-click-prev');
    let next = $('.focus-banner-click .banner-click-next');
    let num = $('.focus-banner-click .page-num');

    let countAll = bannerLiEle.length;
    let nowIndex = 0;
    let timer = null;

    common.init(bannerLiEle, {'display': 'none'}, {'display': 'block'}, 0);
    common.init(bannerLiText, {'display': 'none'}, {'display': 'block'}, 0);

    next.click(function () {
      nextPlay()
    });

    prev.click(function () {
      if (nowIndex == 0) {
        nowIndex = countAll - 1;
      } else {
        nowIndex--;
      }
      fade(nowIndex)
    });

    autoPlay();

    bannerUlEle.mouseenter(function () {
      clearInterval(timer)
    })
      .mouseleave(function () {
        autoPlay();
      });

    function nextPlay() {
      if (nowIndex >= countAll - 1) {
        nowIndex = 0;
      } else {
        nowIndex++;
      }
      fade(nowIndex)
    }

    function fade(i) {
      bannerLiEle.eq(i).fadeIn(200).siblings().fadeOut(200);
      bannerLiText.eq(i).fadeIn(200).siblings().fadeOut(200);
      num.text(`${i+1}/${countAll}`)
    }

    function autoPlay() {
      timer = setInterval(function () {
        nextPlay()
      }, 3000)
    }

  }

  // mod-big_banner
  common.fadeModBigBanner($('.tv .banner-wrap'), $('.tv .banner-wrap li'), $('.tv .banner-wrap .prev'), $('.tv .banner-wrap .next'));

  // 娱乐模块banner
  common.fadeModBigBanner($('.rec .banner-wrap'), $('.rec .banner-wrap li'), $('.rec .banner-wrap .prev'), $('.rec .banner-wrap .next'));

  // 动画模块banner
  common.fadeModBigBanner($('.cartoon .banner-wrap'), $('.cartoon .banner-wrap li'), $('.cartoon .banner-wrap .prev'), $('.cartoon .banner-wrap .next'));

  // 推广广告 -1
  common.adBanner($('.ad-banner-1 .banner-item'), $('.ad-banner-1 .ad-banner-list'));

  // 推广广告 -2
  common.adBanner($('.ad-banner-2 .banner-item'), $('.ad-banner-2 .ad-banner-list'));


});