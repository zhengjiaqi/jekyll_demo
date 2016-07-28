(function() {
  var styleStr =
      '.qt-rotate {' +
      'animation-name: qt-rotate;' +
      '-webkit-animation-name: qt-rotate;' +
      '}' +

      '@-webkit-keyframes qt-rotate {' +
      '0% {' +
      '-webkit-transform: rotate(0deg) translate3d(0, 0, 0);' +
      '}' +
      '100% {' +
      '-webkit-transform: rotate(360deg) translate3d(0, 0, 0);' +
      '}' +
      '}' +

      '@keyframes qt-rotate {' +
      '0% {' +
      'transform: rotate(0deg) translate3d(0, 0, 0);' +
      '}' +
      '100% {' +
      'transform: rotate(360deg) translate3d(0, 0, 0);' +
      '}' +
      '}'
    ;
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = styleStr;
  $('head').append(style);
})();

function Turntable(ele, options) {
  this.opt = {
    anchor: ele || '',                     //页面锚点
    transitionTime: .5,                    //动画一圈时间
    bufferDeg: 720,                        //设置停止的缓冲角度
    onEnded: function() {
    }
  };
  $.extend(this.opt, options);
  this.init(this.opt);
};

Turntable.prototype = {
  init: function(opt) {
    var me = this, opt = me.opt, $anchor = $(opt.anchor), anchor = $anchor[0];
    me.stop = false;
    me.started = false;
    me.endDeg = 0;
    me.bufferDeg = opt.bufferDeg;
    initListening();

    function initListening() {
      $anchor.on('webkitAnimationIteration animationIteration', function(e) {
        if (!me.stop) {
          return
        }
        var computedStyle = window.getComputedStyle(anchor, null);
        var startDeg = 0;
        if (computedStyle && computedStyle.transform) {
          startDeg = me.getmatrix(computedStyle.transform);
        }
        var stopDeg = (me.endDeg + me.bufferDeg);
        $anchor.one('webkitTransitionEnd transitionEnd', function(e) {
          me.opt.onEnded(me.endDeg);
          me.started = false;
        });
        me.setTransform(startDeg, stopDeg);
        $anchor.removeClass('qt-rotate');

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
      me.setTransform(me.endDeg + me.bufferDeg, 360 + me.bufferDeg, true);
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
      $anchor.css(cssData).removeClass('qt-rotate');
      setTimeout(function() {
        $anchor.addClass('qt-rotate');
      }, 0)
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
  //停止到某个角度 0~360deg
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