(function() {
  buildStyle();
  function buildStyle() {
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
        '.popUp { -webkit-animation-name: popUp;}' +
        '@-webkit-keyframes popUp {0% {opacity: 0;transform: scale(0); -webkit-transform: scale(0);}' +
        '70% {opacity: 1;transform: scale(1.1); -webkit-transform: scale(1.1);}' +
        '100% {opacity: 1;transform: scale(1); -webkit-transform: scale(1);}}' +
        '.zoomOut { -webkit-animation-name: zoomOut;}' +
        '@-webkit-keyframes zoomOut {from {opacity: 1;}50% {opacity: 0; -webkit-transform: scale3d(.3, .3, .3);transform: scale3d(.3, .3, .3);}' +
        'to {opacity: 0;}}' +
        '.fadeIn { -webkit-animation-name: fadeIn;}' +
        '@-webkit-keyframes fadeIn {0% {opacity: 0;}' +
        '100% {opacity: 1;}}' +
        '.fadeOut { -webkit-animation-name: fadeOut;}' +
        '@-webkit-keyframes fadeOut {from {opacity: 1;}to {opacity: 0;}}'
      ;
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = styleStr;
    $('head').append(style);
  }

  window.QPopup = QPopup;
  function QPopup(ele, options) {               //img元素加上 data-src 默认支持懒加载
    this.opt = {
      anchor: ele || '',                     //页面锚点
      noHeader: false,                       //取消头部title
      noFooter: false,                       //取消尾部button
      autoHide: true,                        //是否点击任意位置自动隐藏
      animitTime: .3,                         //过渡动画时间
      title: '去哪儿网温馨提示：',             //title内容
      message: 'XXX',                        //消息内容
      content: '',                           //设置content的内容，会覆盖message的结构
      height: '',                            //设置弹框高度，支持%，按视口高度计算
      autoFixHeight: false,                  //是否开启自适应高度，在设置height时生效，实际使用max-height来设置高度
      width: '80%',                          //设置弹框高度，支持%，按视口宽度计算
      noAnimit: true,                        //是否开启动画，如果开启动画，需要有对应的动画class
      inAnimit: 'popUp',                     //进入动画的class
      outAnimit: 'zoomOut',                  //消失动画的class
      innerScroll: false,                    //是否进行对内滚动的特殊支持，会设置<html>的高度与overflow: hidden;会导致正常布局的页面滚回顶部
      noScroll: false,                       //是否在弹出后完全禁止滚动
      buttons: [
        {
          label: '确定',
          className: 'ok',
          action: function() {
            alert(1)
          }
        }
      ],
      events: {
        'tap .invite-weixin': 'inviteWeixin',
        'tap .invite-address-book': 'inviteAddBook',
        'tap .lo-close': 'close'
      },
      onReady: function() {
      },
      onShow: function() {
      },
      onHide: function() {
      },
      onTapMask: function() {
      }

    };
    $.extend(this.opt, options);
    this.init(this.opt);
  };

  QPopup.prototype = {
    init: function(opt) {
      this.buileFrame(opt);
      this.setOpt(opt);
      this.opt.onReady();
      this.showed = false;
      $('body').css({'-webkit-overflow-scrolling': 'touch'})
    },
    buileFrame: function(opt) {
      var defaultTpl =
        '<div class="qt-popup-wrap"  style="display: none">' +
        '<div class="qt-popup">' +
          //'<div class="qt-popup-wrap ">'+
        '<div class="qt-popup-title">去哪儿网温馨提示：</div>' +
        '<div class="qt-popup-content"> ' +
        '<div class="qt-popup-msg">请输入11位有效手机号</div> ' +
        '</div>             ' +
        '<div class="qt-popup-btns">   ' +
        '<div class="qt-popup-btn cancel">取消</div>  ' +
        '<div class="qt-popup-btn ok">确定</div> ' +
        '</div>   ' +
          //'</div>  '+
        '</div>  ' +
        '</div> ' +
        '<div class="qt-popup-mask" style="display: none"></div>'
      $(opt.anchor).html(defaultTpl);
    },
    setOpt: function(opt) {         //通过传入opt重新设置参数
      if (isEmptyObj(opt)) {                  // （注意：会导致所有的参数初始化操作重新进行）
        return;
      }
      var me = this;
      $.extend(me.opt, opt);
      opt = me.opt;
      var $anchor = $(me.opt.anchor),
        $qtPopupWrap = $anchor.children('.qt-popup-wrap'),
        $qtPopup = $qtPopupWrap.children('.qt-popup'),
        $qtPopupMask = $anchor.children('.qt-popup-mask'),
        $qtPopupTitle = $qtPopup.find('.qt-popup-title'),
        $qtPopupBtns = $qtPopup.find('.qt-popup-btns'),
        $qtPopupContent = $qtPopup.find('.qt-popup-content');

      $qtPopup.find('.qt-popup-title').html(opt.title);
      $qtPopupWrap.css({width: opt.width});
      opt.height && (opt.autoFixHeight ? $qtPopupWrap.css({'max-height': opt.height}) : $qtPopupWrap.css({height: opt.height}));
      opt.content ? $qtPopupContent.html(opt.content) : $qtPopup.find('.qt-popup-msg').html(opt.message);
      var oFragment = document.createDocumentFragment();
      $.each(opt.buttons, function(index, item) {
        var div = document.createElement('div');
        div.innerHTML = item.label;
        div.setAttribute('class', '.qt-popup-btn ' + item.className);
        $(div).on('tap.pop', item.action);
        oFragment.appendChild(div)
      });
      opt.buttons.length > 0 && $qtPopupBtns.children('div').remove();
      $qtPopupBtns.html(oFragment);
      opt.noHeader && $qtPopupTitle.remove();
      opt.noFooter && $qtPopupBtns.remove();

      if (opt.height) {
        $qtPopupWrap.css({display: 'block'});
        var qtPopupWrapHeight = $qtPopupWrap.height() || 0,
          qtPopupTitleHeight = $qtPopupTitle.height() || 0,
          $qtPopupBtnsHeight = $qtPopupBtns.height() || 0,
          setHeight = qtPopupWrapHeight - qtPopupTitleHeight - $qtPopupBtnsHeight;
        $qtPopupWrap.css({display: 'none'});
        opt.autoFixHeight ? $qtPopupContent.css({'max-height': setHeight}) : $qtPopupContent.css({height: setHeight});
        $qtPopupContent.css({
          'overflow-y': 'scroll',
          'transform': 'translate3d(0,0,0)',
          '-webkit-overflow-scrolling': 'touch'
        });
      }

      $anchor.off('.pop');
      $.each(opt.events, function(index, event) {
        var kv = $.trim(index).split(/^(\w+)\s+/);
        if (kv.length != 3)return;
        $anchor.on(kv[1] + '.user', kv[2], function(e) {
          var evt = opt[event];
          evt && evt.call(this, e);
        });
      });
      $qtPopupWrap.off('.pop');
      me.opt.autoHide && $qtPopupWrap.on('tap.pop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        me.hide();
      })
      $qtPopupMask.off('tap.pop');
      $qtPopupMask.on('tap.pop', function(e) {
        me.opt.autoHide && me.hide();
        me.opt.onTapMask.call(this, e);
      });

      function isEmptyObj(obj) {
        if (!obj || !obj instanceof Object || obj instanceof Array) {
          return true;
        }
        for (var i in obj) {
          return false;
        }
        return true;
      }

    },
    show: function(callBack, opt) {   //在show 时可以通过传入opt重新设置参数
      if (this.showed) {             // （注意：会导致所有的参数初始化操作重新进行）
        return;
      }
      this.setOpt(opt);
      var me = this;
      var $anchor = $(this.opt.anchor),
        $qtPopupWrap = $anchor.children('.qt-popup-wrap'),
        $qtPopup = $qtPopupWrap.children('.qt-popup'),
        $qtPopupMask = $anchor.children('.qt-popup-mask'),
        animitTime = me.opt.animitTime;

      if (me.opt.innerScroll) {
        me.oldStyleHtml = $('html')[0].style.cssText;
        me.oldStyleBody = $('body')[0].style.cssText;
        $('html,body').css({overflow: 'hidden', height: $(window).height()});
      }
      if (me.opt.noScroll) {
        $qtPopupWrap.off('touchmove.pop');
        $qtPopupWrap.on('touchmove.pop', function(e) {
          e.preventDefault();
          return false;
        });
      }
      $qtPopupMask.off('touchmove.pop');
      $qtPopupMask.on('touchmove.pop', function(e) {
        e.preventDefault();
        return false;
      })

      if (me.opt.noAnimit) {
        $qtPopupWrap.css({'display': 'block'});
        $qtPopupMask.css({'display': 'block'});
        showedAction();
      } else if (!me.showed && !me.showing) {
        $qtPopup.one($.fx.animationEnd, function() {
          $qtPopup.css({'-webkit-animation-duration': ''});
          $qtPopupMask.css({'-webkit-animation-duration': ''});
          $qtPopup.removeClass(me.opt.inAnimit);
          $qtPopupMask.removeClass('fadeIn');
          showedAction();
        })
        me.showing = true;
        $qtPopup.addClass(this.opt.inAnimit);
        $qtPopupWrap.css({'display': 'block'});
        $qtPopupMask.css({'display': 'block'}).addClass('fadeIn');
        $qtPopup.css({'-webkit-animation-duration': animitTime + 's'});
        $qtPopupMask.css({'-webkit-animation-duration': animitTime + 's'});
      }
      function showedAction() {
        callBack && callBack();
        me.opt.onShow();
        me.showed = true;
        me.showing = false;
      }

    },
    hide: function(callBack) {
      if (!this.showed) {
        return;
      }
      var me = this;
      var $anchor = $(me.opt.anchor),
        $qtPopupWrap = $anchor.children('.qt-popup-wrap'),
        $qtPopup = $qtPopupWrap.children('.qt-popup'),
        $qtPopupMask = $anchor.children('.qt-popup-mask'),
        animitTime = me.opt.animitTime;

      if (me.opt.noAnimit) {
        $qtPopupWrap.css({'display': 'none'});
        $qtPopupMask.css({'display': 'none'});
        hidedAction();
      } else if (me.showed && !me.hiding) {
        $qtPopup.one($.fx.animationEnd, function() {
          $qtPopupWrap.css({'display': 'none'});
          $qtPopupMask.css({'display': 'none'}).removeClass('fadeOut');
          $(this).removeClass(me.opt.outAnimit);
          $qtPopup.css({'-webkit-animation-duration': ''});
          $qtPopupMask.css({'-webkit-animation-duration': ''});
          hidedAction();
        })
        me.hiding = true;
        $qtPopup.addClass(me.opt.outAnimit);
        $qtPopupMask.addClass('fadeOut');
        $qtPopup.css({'-webkit-animation-duration': animitTime + 's'});
        $qtPopupMask.css({'-webkit-animation-duration': animitTime + 's'});
      }

      if (me.opt.innerScroll) {
        $('html').attr('style', me.oldStyleHtml);
        $('body').attr('style', me.oldStyleBody);
      }

      function hidedAction() {
        callBack && callBack();
        me.opt.onHide();
        me.showed = false;
        me.hiding = false;
        if (me.opt.noScroll) {
          $anchor.off('touchmove.pop');
        }
        $qtPopupMask.off('touchmove.pop');
      }

    }

  };
})()