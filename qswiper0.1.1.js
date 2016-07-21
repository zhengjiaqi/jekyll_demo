/**
 * 滑动组件
 * @param {dom} ele dom容器
 * @param {Object} options 配置参数
 *
 */
function QSwiper(ele, options) {
  this.opt = {
    anchor: ele || '',                    //页面锚点
    limit: 1 / 5,                         //页面滑动达到limit时切换页面
    transitionTime: .2,                   //过渡动画时间
    autoplay: false,                      //是否自动轮播
    intervalTime: 3000,                   //自动轮播时间间隔
    vertical: false,                      //是否纵向滚动
    loop: false,                          //循环模式
    base: 'window',                       //设置轮播组件宽度的基准元素
    touchable: true,                      //是否开启滑动切换
    autoFixHeight: false,                 //是否在滚动时自动消除slide间高度影响（仅横向模式使用）
    slides: [],                           //配置展示的slide,
    onSlideChange: function() {           //       slides:[
    },           //页面切换后的回调         //            {
    beforeSlideChange: function() {       //               attrs : {
    }        //页面切换前的回调             //                 'class':'first',
  };                                      //                 'data-k':'dataK'
  $.extend(this.opt, options);            //              },
  this.init(this.opt);                    //              tpl : '<div>第一页</div>',
};                                        //            },
                                          //            {
QSwiper.prototype = {                     //              attrs : 'second',     //默认设置class
  init: function(opt) {                   //               tpl : '<div>第二页</div>',
    var me = this, opt = me.opt,          //            },
      _anchor = $(opt.anchor),            //           '<div>第三页</div>',    //默认设置内容
      touchStartTime;                     //       ]
    me.slides = [];
    me.position = me.opt.loop ? 1 : 0;
    me.ele = _anchor;
    me.activeIndex = 0;
    me.intervalNum = 0;
    me.onStart = false;
    me.onTransitionEnd = true;
    me.moveDirection = -1;
    //所有真实dom
    me.allSlides = [];
    build();

    var $qtSwiper = me.ele.children('.qt-swiper'),
      $content = $qtSwiper.children('ul'),
      $slides = $content.children('li');
    me.$qtSwiper = $qtSwiper;
    me.$content = $content;
    me.$slides = $slides;
    _anchor.off('touchstart', fixDoubleTap);
    _anchor.on('touchstart', fixDoubleTap);
    var startX, X, moveX = 0, startY, Y, moveY = 0, contentWidth, contentHeight, pageWidth, pageHeight, num, translateX, translateY;
    var limit = opt.limit;
    var translateStart;
    me.oldActiveIndex = 0;
    me.interval();

    if (typeof window.ontouchstart != 'undefined') {
      $qtSwiper.on('touchstart', touchstart);
      $qtSwiper.on('touchmove', touchmove);
      $qtSwiper.on('touchend', touchend);
    } else {
      $qtSwiper.on('mousedown', touchstart);
      $qtSwiper.on('mousemove', touchmove);
      $qtSwiper.on('mouseup', touchend);
    }

    setWidthAndHeight(me);
    $(window).on('resize', function() {
      setWidthAndHeight(me);
    });

    function touchstart(e) {
      me.opt.touchable && me.stopInterval();
      me.fixPosition();
      if ("undefined" != typeof(e.targetTouches)) {
        var touche = e.targetTouches[0];
        startX = touche.pageX;
        startY = touche.pageY;
      } else if (e.clientX != "" || e.clientX != undefined) {
        startX = e.clientX;
        startY = e.clientY;
      }
      X = startX;
      Y = startY;
      translateStart = me.getComputedTranslate($content);
      me.setTransition($content, 0, translateStart.translateX, translateStart.translateY, translateStart.translateZ);
      me.onStart = true;
      me.showAllPart($slides);
    }

    function touchmove(e) {
      if (!me.onStart) {
        return
      }
      if (!me.opt.touchable) {
        return;
      }
      if ("undefined" != typeof(e.targetTouches)) {
        var touche = e.targetTouches[0];
        X = touche.pageX;
        Y = touche.pageY;
      } else if (e.clientX != "" || e.clientX != undefined) {
        X = e.clientX;
        Y = e.clientY;
      }
      moveX = (X - startX);
      moveY = (Y - startY);

      if (opt.vertical) {
        translateY = translateStart.translateY + moveY;
        if (translateY < pageHeight * limit && translateY > -contentHeight + pageHeight * (1 - limit)) {
          me.moveDirection = moveY;
          me.position = me.getPosition(moveY, translateY);
          me.addTranslate($content, translateStart, 0, 0, moveY);
        }
      } else {
        translateX = translateStart.translateX + moveX;
        if (translateX < pageWidth * limit && translateX > -contentWidth + pageWidth * (1 - limit)) {
          me.moveDirection = moveX;
          me.position = me.getPosition(moveX, translateX);
          me.addTranslate($content, translateStart, 0, moveX);
        }
      }
      if (me.opt.touchable) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    function touchend(e) {
      if (!me.opt.touchable) {
        return;
      }
      me.onStart = false;
      me.move(me.position);
    }

    $content.on($.fx.transitionEnd, function(e) {
      if ($content[0] !== e.target) {
        return;
      }
      var translate = me.getTranslate($content),
        cssData = {};
      cssData[$.fx.cssPrefix + 'transition-duration'] = '0s';
      $content.css(cssData);
      me.position = opt.vertical ? me.getPosition(moveY, translate.translateY) : me.getPosition(moveX, translate.translateX);
      //me.fixPosition();
      me.fixIndex();
      var $nowPart = $(me.allSlides[me.position]);
      if (me.opt.autoFixHeight && !me.opt.vertical) {
        $slides.css({height: '1px', overflow: 'hidden'});
        $nowPart.css({height: '', overflow: ''});
      }
      me.interval();
      $slides.removeClass('active');
      $nowPart.addClass('active');
      me.oldActiveIndex != me.activeIndex && me.opt.onSlideChange(me.activeIndex);
      me.oldActiveIndex = me.activeIndex;
      me.onTransitionEnd = true;
      e.stopPropagation();
    });

    function build() {
      if (me.ele.children('.qt-swiper').length <= 0) {
        var defaultTpl =
          '<div class="qt-swiper"><ul></ul></div>';
        var virtualSwiperDom = $(defaultTpl),
          slides = me.opt.slides;
        if (!isEmptyObject(slides)) {
          $.each(slides, function(index, item) {
            if (!isEmptyObject(item)) {
              var virtualPartDom = $('<li></li>'),
                itemData = item.attrs;
              item.tpl && virtualPartDom.html(item.tpl);
              if (!isEmptyObject(itemData)) {
                $.each(itemData, function(key, value) {
                  virtualPartDom.attr(key, value);
                });
              } else if (itemData) {
                virtualPartDom.attr('class', itemData);
              }
              virtualSwiperDom.children('ul').append(virtualPartDom);
            } else if (item) {
              var virtualPartDom = $('<li></li>');
              virtualPartDom.html(item);
              virtualSwiperDom.children('ul').append(virtualPartDom);
            }
          });
        }
        me.ele.append(virtualSwiperDom);
      }
      var $qtSwiper = me.ele.children('.qt-swiper'), $content = $qtSwiper.children('ul'), $slides = $content.children('li');
      me.num = $slides.length || 0;
      var last = $slides.last(), first = $slides.first();
      for (var i = 0; i < $slides.length; i++) {
        var domSlides = $slides[i];
        me.slides.push(domSlides);
        me.allSlides.push(domSlides);
      }
      if (opt.loop) {
        var slContent = $content,
          lastClone = last.clone()[0],
          firstClone = first.clone()[0];
        slContent.prepend(lastClone);
        slContent.append(firstClone);
        me.allSlides.splice(0, 0, lastClone);
        me.allSlides.push(firstClone);
      }

    }

    function isEmptyObject(obj) {
      if (obj && typeof(obj) == 'object') {
        for (var n in obj) {
          return false
        }
      }
      return true;
    }

    //阻止safari浏览器 doubletap默认滚动
    function fixDoubleTap(e) {
      if (!touchStartTime || touchStartTime == 0) {
        touchStartTime = new Date().getTime();
        setTimeout(function() {
          touchStartTime = 0;
        }, 500);
      } else {
        var time = new Date().getTime() - touchStartTime;
        if (time <= 400) {
          e.preventDefault();
        }
      }
    }

    function setWidthAndHeight(me) {
      $slides = $($content.children('li'));
      var windowSize = me.getWindowSize();
      pageWidth = windowSize.pageWidth;
      pageHeight = windowSize.pageHeight;
      var factor;
      opt.loop ? factor = (me.num + 2) : factor = (me.num);
      contentWidth = pageWidth * factor;
      contentHeight = pageHeight * factor;
      var cssData = {
          'list-style': 'none'
        },
        cssPrefix = $.fx.cssPrefix;
      cssData[cssPrefix + 'transition-duration'] = '0s';
      $content.css(cssData);
      $slides.css({'list-style': 'none'})
      $qtSwiper.css({'width': pageWidth, 'overflow': 'hidden'})
      if (opt.vertical) {
        $slides.css({'width': pageWidth, 'height': pageHeight});
        if (opt.loop) {
          var contentCssData = {
            'width': pageWidth,
            'height': pageHeight
          };
          contentCssData[cssPrefix + 'transform'] = 'translate3d(0,' + -pageHeight + 'px,0)';
          $content.css(contentCssData);
        } else {
          $content.css({'width': pageWidth, 'height': pageHeight});
        }
      } else {
        $slides.css({'width': pageWidth});
        if (opt.loop) {
          var contentCssData = {
            'width': contentWidth,
            'display': '-webkit-box',
          };
          contentCssData[cssPrefix + 'transform'] = 'translate3d(' + -pageWidth + 'px,0,0)';
          $content.css(contentCssData);
        } else {
          $content.css({'width': contentWidth, 'display': '-webkit-box'});
        }
      }
    }
  },
  interval: function() {
    if (this.opt.autoplay) {
      var me = this;
      me.stopInterval();
      me.intervalNum = setInterval(function() {
        me.slideNext();
      }, me.opt.intervalTime);
    }

  },
  stopInterval: function() {
    clearInterval(this.intervalNum);
  },
  //设置页面切换后的回调
  onSlideChange: function(fun) {
    this.opt.onSlideChange = fun;
  },
  //设置页面切换开始前的回调
  beforeSlideChange: function(fun) {
    this.opt.beforeSlideChange = fun;
  },
  //滑动到对应序号的页
  slideTo: function(n) {
    this.move(n);
  },
  //获得处于激活状态的页
  getActiveSlide: function() {
    return this.slides[this.position];
  },
  //获得对应序号的页
  getSlide: function(n) {
    return this.slides[n - 1];
  },
  //下滑一页
  slideNext: function() {
    this.moveTo(-1, this.position + 1);
  },
  //上滑一页
  slidePrev: function() {
    this.moveTo(1, this.position - 1);
  },
  showAllPart: function($slides) {
    var me = this;
    if (me.opt.autoFixHeight && !me.opt.vertical) {
      $slides.css({height: '', overflow: ''});
    }
  },
  fixPosition: function() {
    var me = this, windowSize = me.getWindowSize(), pageWidth = windowSize.pageWidth, pageHeight = windowSize.pageHeight,
      $content = me.$content;
    if (me.opt.loop) {
      (me.position > me.num + 1) && (me.position = me.num + 1);
      if (me.opt.vertical) {
        if (me.position == 0) {
          me.setTransition($content, 0, 0, -me.num * pageHeight, 0);
        } else if (me.position == me.num + 1) {
          me.setTransition($content, 0, 0, -1 * pageHeight, 0);
        }
      } else {
        if (me.position == 0) {
          me.setTransition($content, 0, -me.num * pageWidth, 0, 0);
        } else if (me.position == me.num + 1) {
          me.setTransition($content, 0, -1 * pageWidth, 0, 0);
        }
      }
    }
    var translate = me.getTranslate($content);
    me.position = me.opt.vertical ? me.getPosition(-1, translate.translateY) : me.getPosition(-1, translate.translateX);
    me.fixIndex();
  },
  fixIndex: function() {
    var me = this;
    me.activeIndex = me.getfixIndex(me.position);
  },
  getfixIndex: function(position) {
    var me = this;
    var activeIndex = 1;
    if (me.opt.loop) {
      if (position < 1) {
        activeIndex = me.num;
      } else if (position > me.num) {
        activeIndex = 1;
      } else {
        activeIndex = position;
      }
    } else {
      activeIndex = position + 1;
    }
    return activeIndex;
  },
  move: function(pos) {
    var me = this,
      $content = me.$content,
      $slides = me.$slides,
      transitionTime = me.opt.transitionTime,
      windowSize = me.getWindowSize();
    me.stopInterval();
    me.showAllPart($slides);
    var maxLimit,
      minLimit;
    if (!me.opt.loop) {
      maxLimit = me.num - 1;
      minLimit = 0;
    } else {
      maxLimit = me.num + 1;
      minLimit = 0;
    }
    if (pos > maxLimit) {
      me.setTransition($content, transitionTime, 0, 0, 0);
    } else if (pos < minLimit) {
      if (me.opt.vertical) {
        me.setTransition($content, transitionTime, 0, -(maxLimit) * windowSize.pageHeight, 0);
      } else {
        me.setTransition($content, transitionTime, -(maxLimit) * windowSize.pageWidth, 0, 0);
      }
    } else if (me.opt.vertical) {
      var activeIndex = me.getfixIndex(pos);
      me.activeIndex != activeIndex && me.opt.beforeSlideChange(me.activeIndex, activeIndex);
      me.setTransition($content, transitionTime, 0, -pos * windowSize.pageHeight, 0);
    } else {
      var activeIndex = me.getfixIndex(pos);
      me.activeIndex != activeIndex && me.opt.beforeSlideChange(me.activeIndex, activeIndex);
      me.setTransition($content, transitionTime, -pos * windowSize.pageWidth, 0, 0);
    }
  },
  //使用 addTranslate移动
  moveTo: function(direction, pos) {
    var me = this,
      $content = me.$content,
      $slides = me.$slides,
      transitionTime = me.opt.transitionTime,
      windowSize = me.getWindowSize();
    if (!me.onTransitionEnd) {
      return false;
    }
    me.onTransitionEnd = false;
    direction && (me.moveDirection = direction);
    if (!me.opt.loop) {
      if (pos > 0 && pos < me.num) {
        me.move(pos);
      } else {
        me.onTransitionEnd = true;
      }
    } else {
      me.stopInterval();
      me.showAllPart($slides);
      var nextPosition = pos;
      var nowPosition = me.position;
      var nextActiveIndex = me.getfixIndex(nextPosition);
      var positionDeviation = nowPosition - nextPosition;
      me.activeIndex == nextActiveIndex && (nextActiveIndex -= direction);
      me.fixPosition();
      var fixedTranslateStart = me.getTranslate($content);
      me.activeIndex != nextActiveIndex && me.opt.beforeSlideChange(me.activeIndex, nextActiveIndex);
      if (me.opt.vertical) {
        me.addTranslate($content, fixedTranslateStart, transitionTime, 0, positionDeviation * windowSize.pageHeight, 0)
      } else {
        me.addTranslate($content, fixedTranslateStart, transitionTime, positionDeviation * windowSize.pageWidth, 0, 0)
      }
    }

  },
  //direction 为负值时方向为右
  getPosition: function(direction, translate) {
    var me = this,
      windowSize = me.getWindowSize(),
      pageWidth = windowSize.pageWidth,
      pageHeight = windowSize.pageHeight,
      limit = me.opt.limit;
    var factor, pageLength;
    if (me.opt.vertical) {
      pageLength = pageHeight;
    } else {
      pageLength = pageWidth;
    }
    direction <= 0 ? factor = limit : factor = (1 - limit);
    return Math.abs(Math.ceil((translate + pageLength * factor) / pageLength) - 1);

  },
  getWindowSize: function() {
    var me = this;
    var base = me.opt.base, pageWidth, pageHeight;
    if (base == 'window') {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = $(base)[0].offsetWidth;
      pageHeight = $(base)[0].offsetHeight;
    }
    return {pageWidth: pageWidth, pageHeight: pageHeight};
  },
  getTranslate: function(sel) {
    var $sel = $(sel);
    var transformString = $sel.css($.fx.cssPrefix + 'transform');
    if (transformString && transformString != undefined) {
      var translate3d = transformString.split('translate3d')[1];
      if (translate3d && translate3d != undefined) {
        var match = translate3d.match(/-?\d+/g);
        var translateX = parseInt(match[0]), translateY = parseInt(match[1]), translateZ = parseInt(match[2]);
        return {translateX: translateX, translateY: translateY, translateZ: translateZ}
      }
    }
    return {translateX: 0, translateY: 0, translateZ: 0}
  },
  getComputedTranslate: function(sel) {
    var $sel = $(sel);
    var computedStyle = getComputedStyle($sel[0], false)[$.fx.cssPrefix + 'transform'].match(/([0-9|\.|-]+)/g);
    if (computedStyle) {
      return {translateX: parseFloat(computedStyle[4]), translateY: parseFloat(computedStyle[5]), translateZ: 0}
    } else {
      return {translateX: 0, translateY: 0, translateZ: 0}
    }
  },
  addTranslate: function(sel, translateStart, transitionTime, translateX, translateY, translateZ) {
    var setTranslateX = translateStart.translateX + (translateX || 0),
      setTranslateY = translateStart.translateY + (translateY || 0),
      setTranslateZ = translateStart.translateZ + (translateZ || 0);
    this.setTransition($(sel), transitionTime, setTranslateX, setTranslateY, setTranslateZ);
  },
  //设置过渡时间
  setTransitionTime: function(time) {
    this.opt.transitionTime = time;
  },
  setTransition: function(dom, transitionTime, TranslateX, TranslateY, TranslateZ) {
    var $dom = $(dom),
      cssPrefix = $.fx.cssPrefix,
      cssData = {};
    transitionTime = transitionTime || 0;
    TranslateX = TranslateX || 0;
    TranslateY = TranslateY || 0;
    TranslateZ = TranslateZ || 0;
    ($dom.css('transition-duration') !== (transitionTime + 's')) && (cssData[cssPrefix + 'transition-duration'] = transitionTime + 's');
    cssData[cssPrefix + 'transform'] = 'translate3d(' + TranslateX + 'px,' + TranslateY + 'px,' + TranslateZ + 'px)';
    $dom.css(cssData);
  },
  //停止触摸滑动
  stopTouch: function() {
    this.opt.touchable = false;
  },
  //开始触摸滑动
  startTouch: function() {
    this.opt.touchable = true;
  }
};