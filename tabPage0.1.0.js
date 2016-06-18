
/**
 * 单页切换组件
 * @param {dom} ele dom容器
 * @param {Object} options 配置参数
 *
 */
function TabPage(ele, options) {
  this.opt = $.extend({
    anchor: ele || '',
    animationTime: .2,
    //         进入动画         回退动画
    animation: ['slideLeftIn', 'slideRightOut'],
    //自动fix容器高度，可能引起较严重重绘
    autoFixHeight : false
  }, options);
  this.init(this.opt);
};
TabPage.prototype = {
  init: function() {
    var me = this;
    var opt = me.opt,
      $anchor = $(opt.anchor);
    me.pages = $anchor.find('.tabPage');
    me.tabChangeHistory = [];
    me.activeHistoryIndex = 0;
    me.container = $anchor.find('.tabPage-container');
    opt.autoFixHeight && me.fixHeight();

    //处理浏览器刷新
    var tabPageHistory = me.getSessionStorage();
    if (!isEmptyObject(tabPageHistory)) {
      me.tabChangeHistory = tabPageHistory.tabChangeHistory;
      me.activeHistoryIndex = tabPageHistory.activeHistoryIndex;
      $('me.pages').removeClass('tabPage-active');
      $(me.pages[me.getHistoryShowIndex(me.activeHistoryIndex)]).addClass('tabPage-active');
    }

    $.each(me.pages, function(index, item) {
      var $item = $(item);
      $item.attr('tabPage-index', index).css({'-webkit-animation-duration': opt.animationTime + 's'});
      if ($item.hasClass('tabPage-active')) {
        $item.addClass('tabPage-show');
        me.replaceState({showIndex: index}, "", window.location.href);
      }
    })
    $(window).on('popstate', function(event) {
      if (history.state) {
        var showIndex = history.state.showIndex;
        var activeHistoryIndex = me.activeHistoryIndex;
        if (showIndex == activeHistoryIndex) {
          return;
        }
        if (me.tabChangeHistory[activeHistoryIndex - 1] && showIndex == me.getHistoryShowIndex(activeHistoryIndex - 1)) {
          me.hiddenTabPage();
        } else {
          me.showTabPage(showIndex, true);
        }
      }
    });

    function isEmptyObject(obj) {
      if (obj && typeof(obj) == 'object') {
        for (var n in obj) {
          return false
        }
      }
      return true;
    }
  },
  hiddenTabPage: function() {
    var me = this, opt = me.opt;
    var nowIndex = me.activeHistoryIndex;
    var backIndex = me.getHistoryShowIndex(nowIndex - 1);
    var _content = $(me.pages[nowIndex]), _otherContent = $(me.pages[backIndex]);
    _content.addClass(opt.animation[1]);
    _otherContent.addClass('tabPage-show');
    _content.on('webkitAnimationEnd', function() {
      _content.off('webkitAnimationEnd');
      _content.removeClass('tabPage-show ' + opt.animation[1]).removeClass('tabPage-active');
      _otherContent.addClass('tabPage-active');
      opt.autoFixHeight && me.fixHeight();
    })
    me.activeHistoryIndex -= 1;
    me.setSessionStorage({tabChangeHistory: me.tabChangeHistory, activeHistoryIndex: me.activeHistoryIndex});
    window.scrollTo(0, 0);
  },
  showTabPage: function(index, pop) {
    index = index || 0;
    var me = this, opt = me.opt;
    var _content = $(me.pages[index]), _otherContent = $(me.pages[me.getHistoryShowIndex(me.activeHistoryIndex)]);
    _content.addClass('tabPage-show');
    //切换动画在iphone中需要与 tabPage-show 分开进行，否则不进行动画
    if(navigator.userAgent.toLowerCase().indexOf('iphone')!=-1 ){
      setTimeout(function(){_content.addClass(opt.animation[0]);},0)
    }else{
      _content.addClass(opt.animation[0]);
    }
    _content.on('webkitAnimationEnd', function() {
      _content.off('webkitAnimationEnd');
      _content.removeClass(opt.animation[0]).addClass('tabPage-active');
      _otherContent.removeClass('tabPage-show').removeClass('tabPage-active');
      opt.autoFixHeight && me.fixHeight();
    })
    me.activeHistoryIndex += 1;
    if (pop) {
      me.replaceState({showIndex: index}, "", window.location.href);
    } else {
      me.pushState({showIndex: index}, "", window.location.href);
    }
    me.setSessionStorage({tabChangeHistory: me.tabChangeHistory, activeHistoryIndex: me.activeHistoryIndex});
    window.scrollTo(0, 0);
  },
  getHistoryShowIndex: function(index) {
    return this.tabChangeHistory[index].state.showIndex;
  },
  back: function() {
    window.history.go(-1);
  },
  fixHeight: function() {
    var me = this;
    var height = $(me.pages[me.activeHistoryIndex]).height();
    me.container.height(height);
  },
  replaceState: function(state, title, url) {
    history.replaceState(state, title, url);
    this.tabChangeHistory.splice(this.activeHistoryIndex, 1, {state: state, title: title, url: url});
  },
  pushState: function(state, title, url) {
    history.pushState(state, title, url);
    this.tabChangeHistory.push({state: state, title: title, url: url});
  },
  setSessionStorage: function(value) {
    value = value || {};
    try {
      sessionStorage.setItem('TabPageHistory', JSON.stringify(value));
    } catch (e) {
    }
  },
  getSessionStorage: function() {
    try {
      return JSON.parse(sessionStorage.getItem('TabPageHistory') || '{}');
    } catch (e) {
    }
  }
};