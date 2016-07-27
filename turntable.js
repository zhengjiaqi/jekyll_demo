(function() {
  var styleStr =
      '.qt-popup-wrap{position: fixed;top:50%;left: 50%; -webkit-transform: translate3d(-50%,-50%,10px);z-index: 1002;}' +
      '.qt-popup{background: #fff; -webkit-border-radius: 10px;}' +
      '.qt-popup-mask{position: fixed;top:0;left: 0;width: 100%;height: 100%;z-index: 1000;background: rgba(0,0,0,.3);}' +
      '.qt-popup-btns{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;line-height: 30px;text-align: center;color: #006AFD;border-top: 1px solid #ddd;}' +
      '.qt-popup-btns > div{ -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1;flex: 1;border-left: 1px solid #ddd;line-height: 40px;}' +
      '.qt-popup-btns > div:first-child{border-left: 0;}' +
      '.qt-popup-btns > div:active{background: #ddd;}' +
      '.qt-popup-content{padding: 0 10px;margin-bottom: 10px;}' +
      '.qt-popup-title{padding: 0 10px;line-height: 30px;}' +
      '.qt-popUp { -webkit-animation-name: qt-popUp;}' +
      '@-webkit-keyframes qt-popUp {0% {opacity: 0;transform: scale(0); -webkit-transform: scale(0);}' +
      '70% {opacity: 1;transform: scale(1.1); -webkit-transform: scale(1.1);}' +
      '100% {opacity: 1;transform: scale(1); -webkit-transform: scale(1);}}' +
      '.zoomOut { -webkit-animation-name: zoomOut;}' +
      '@-webkit-keyframes zoomOut {from {opacity: 1;}50% {opacity: 0; -webkit-transform: scale3d(.3, .3, .3);transform: scale3d(.3, .3, .3);}' +
      'to {opacity: 0;}}' +
      '.qt-fadeIn { -webkit-animation-name: qt-fadeIn;}' +
      '@-webkit-keyframes qt-fadeIn {0% {opacity: 0;}' +
      '100% {opacity: 1;}}' +
      '.qt-fadeOut { -webkit-animation-name: qt-fadeOut;}' +
      '@-webkit-keyframes qt-fadeOut {from {opacity: 1;}to {opacity: 0;}}'
    ;
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = styleStr;
  $('head').append(style);
})();

function Turntable(ele, options) {
  this.opt = {
    anchor: ele || '',                     //页面锚点
    transitionTime: .5,                   //动画一圈时间
    onEnded: function() {
    }                                       //init完成
  };
  $.extend(this.opt, options);
  this.init(this.opt);
};

Turntable.prototype = {
  init: function(opt) {
    var me = this, opt = me.opt, $anchor = $(opt.anchor);
    me.stop = false;
    me.started = false;
    me.endDeg = 0;
    me.addDeg = 720;
    initListening();

    function initListening() {
      $anchor.on('webkitAnimationIteration animationIteration', function(e) {
        if (!me.stop) {
          return
        }
        var computedStyle = window.getComputedStyle($anchor[0], null);
        var transform = computedStyle.transform;
        var startDeg = transform ? me.getmatrix(transform) : 0;
        $anchor.removeClass('qt-rotate');
        var stopDeg = (me.endDeg + me.addDeg);
        $anchor.one('webkitTransitionEnd transitionEnd', function(e) {
          me.opt.onEnded(me.endDeg);
          me.started = false;
        });
        me.setTransform(startDeg, stopDeg);

      })
    }

  },
  start: function() {
    var me = this,
      $anchor = $(this.opt.anchor);
    if (me.started) {
      return;
    }
    me.started = true;
    if (me.endDeg != 0 && me.endDeg != 360) {
      $anchor.one('webkitTransitionEnd transitionEnd', function(e) {
        setAnimation();
      });
      me.setTransform(me.endDeg + me.addDeg, 360 + me.addDeg, true);
    } else {
      setAnimation();
    }

    function setAnimation() {
      var cssData = {},
        cssPrefix = $.fx.cssPrefix;
      cssData[cssPrefix + 'animation-timing-function'] = 'linear';
      cssData[cssPrefix + 'animation-duration'] = me.opt.transitionTime + 's';
      cssData[cssPrefix + 'animation-iteration-count'] = 'infinite';
      cssData[cssPrefix + 'animation-direction'] = 'normal';
      $anchor.css(cssData).addClass('qt-rotate');
      //setTimeout(function() {
      //  $anchor.addClass('qt-rotate');
      //}, 0)
      me.stop = false;
    }

  },
  setTransform: function(startDeg, stopDeg, linear) {
    var me = this,
      $anchor = $(me.opt.anchor);
    var cssPrefix = $.fx.cssPrefix,
      cssData = {},
      time;
    var degPoor = stopDeg - startDeg;
    if (linear) {
      time = parseFloat(me.opt.transitionTime) / 360 * degPoor;
      cssData[cssPrefix + 'transition-timing-function'] = 'linear';
    } else {
      time = parseFloat(me.opt.transitionTime) / 360 * degPoor * 1.5;
      cssData[cssPrefix + 'transition-timing-function'] = 'ease-out';
      cssData[cssPrefix + 'transition-duration'] = '0' + 's';
      cssData[cssPrefix + 'transform'] = 'rotate(' + startDeg + 'deg) translate3d(0,0,0)';
      $anchor.css(cssData);
    }
    setTimeout(function() {
      cssData[cssPrefix + 'transition-duration'] = time + 's';
      cssData[cssPrefix + 'transition-property'] = 'all';
      cssData[cssPrefix + 'transform'] = 'rotate(' + stopDeg + 'deg) translate3d(0,0,0)';
      $anchor.css(cssData);
    }, 0)
  },
  endToDeg: function(endDeg) {
    this.endDeg = endDeg || 0;
    this.stop = true;
  },
  onEnded: function(endfun) {
    this.opt.onEnded = endfun;
  },
  reset: function() {
    this.stop = false;
    this.started = false;
    this.endDeg = 0;
    $(this.opt.anchor).removeAttr('style');
  },
  getmatrix: function(matrix) {
    matrix = matrix.match(/\((.*)\)/)[1].split(',');
    var aa = Math.round(180 * Math.asin(matrix[0]) / Math.PI);
    var bb = Math.round(180 * Math.acos(matrix[1]) / Math.PI);
    var cc = Math.round(180 * Math.asin(matrix[2]) / Math.PI);
    var dd = Math.round(180 * Math.acos(matrix[3]) / Math.PI);
    var deg = 0;
    if (aa == bb || -aa == bb) {
      deg = dd;
    } else if (-aa + bb == 180) {
      deg = 180 + cc;
    } else if (aa + bb == 180) {
      deg = 360 - cc || 360 - dd;
    }
    return deg >= 360 ? 0 : deg;
  }

}
;