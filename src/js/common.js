import $ from 'jquery'

class Common {
  constructor () {
    this.$ = $
  }

  fade_popup_box (mouseEle, showOrHideEle) {
    mouseEle.mouseenter(function () {
      showOrHideEle.fadeIn(300)
    })
      .mouseleave(function () {
        showOrHideEle.fadeOut(300)
      })
  }

  init (item, cssAllObj, cssNowObj, indexEle) {
    item.css(cssAllObj).eq(indexEle).css(cssNowObj);
  }

  fadeModBigBanner (ulEle, liEle, prevEle, nextEle) {
    let bannerEle = ulEle;
    let bannerLiArr = liEle;
    let prev = prevEle;
    let next = nextEle;

    let countAll = bannerLiArr.length;
    let nowIndex = 0;
    let timer = null;

    this.init(bannerLiArr, {'display': 'none', 'opacity': 0}, {'display': 'block', 'opacity': 1}, 0);

    prev.click(function () {
      if (nowIndex == 0) {
        nowIndex = countAll - 1
      } else {
        nowIndex--
      }
      fade(nowIndex);
    });

    next.click(function () {
      nextPlay();
    });

    autoPlay();

    bannerEle.mouseenter(function () {
      clearInterval(timer)
    })
      .mouseleave(function () {
        autoPlay();
      });

    function nextPlay() {
      if (nowIndex >= countAll - 1) {
        nowIndex = 0
      } else {
        nowIndex++
      }
      fade(nowIndex)
    }

    function fade(i) {
      bannerLiArr.eq(i).css({'display': 'block'}).animate({'opacity': 1}, 200).siblings().css({'display': 'none', 'opacity': 0});
    }

    function autoPlay() {
      timer = setInterval(function () {
        nextPlay();
      }, 3000)
    }

  }

  adBanner (bannerItemClass, bannerList) {
    let bannerItem = bannerItemClass;
    let bannerListWidth = bannerList.width();

    bannerItem.each(function (i) {

      $(this).mouseenter(function () {
        let left = parseInt($(this).position().left);
        if (i !== 0) {
          if (left <= 1070) {
            $(this).animate({'marginLeft': -left}, 20)
          } else {
            $(this).animate({'marginLeft': -860}, 20)
          }
        }
        $(bannerItem).eq(i).addClass('banner-item-active').siblings().removeClass('banner-item-active');
      })
        .mouseleave(function () {
          $(this).removeClass('banner-item-active').animate({'marginLeft': 0}, 10);
        })
    })
  }
}


export { Common }