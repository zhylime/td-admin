"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$.mlpFnName = function (fn) {
  return fn.name || (fn + '').split(/\s|\(/)[1];
};

$.mlpInit = function (fn, name, set) {
  if (typeof set == "undefined") {
    set = true;
  }
  window.MLP = window.MLP || {};
  window.MLP.apps = window.MLP.apps || {};
  if (fn && set) {
    name = name || $.mlpFnName(fn);
    window.MLP.apps[name] = fn;
  } else {
    return window.MLP.apps[fn];
  }
};

$.mlpPlugin = function (fn, name, bypass, elPluggin) {
  var obj;
  if (typeof bypass == "undefined") {
    bypass = false;
  }
  if (typeof elPluggin == "undefined") {
    elPluggin = true;
  }
  obj = {};
  $.mlpInit(fn, name);
  name = name || $.mlpFnName(fn);
  obj[name] = function () {
    var args, option;
    option = arguments[0];
    args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return $(this).each(function () {
      var $this, data, key;
      $this = $(this);
      key = 'mlp-' + name;
      data = $this.data(key);
      if (!data || bypass) {
        $this.data('name', name);
        $this.data(key, data = new fn(option, this));
      }
      if (typeof option === 'string') {
        return data[option].apply(data, args);
      }
    });
  };
  $.fn.extend(obj);
  if (!elPluggin) {
    obj[name] = function (option) {
      return new fn(option);
    };
    return $.extend(obj);
  }
};

var MLPModule = function () {
  _createClass(MLPModule, [{
    key: "defaults",
    value: function defaults() {
      this.defaults = {};
    }
  }]);

  function MLPModule(options, element) {
    _classCallCheck(this, MLPModule);

    this.ops = $.extend({}, this.defaults, options);
    this.sel = this.sel || {};
    this.el = this.el || {};
    this.el.target = $(element);
    this.init();
    return this;
  }

  _createClass(MLPModule, [{
    key: "init",
    value: function init() {
      this.classes = {
        active: 'is-active',
        offscreen: 'l-offscreen'
      };
      this.keys = {
        esc: 27,
        down: 40,
        up: 38,
        left: 37,
        right: 39,
        o: 79,
        space: 32,
        tab: 9,
        enter: 13
      };
      this.aria = {
        expanded: 'aria-expanded',
        hidden: 'aria-hidden',
        controls: 'aria-controls',
        selected: 'aria-selected',
        invalid: 'aria-invalid',
        pressed: 'aria-pressed',
        described: 'aria-describedby',
        checked: 'aria-checked',
        label: 'aria-label',
        labelled: 'aria-labelledby',
        popup: 'aria-haspopup'
      };

      this.attr = {
        tabindex: 'tabindex'
      };
    }
  }, {
    key: "stop",
    value: function stop(e) {
      e.preventDefault();
      return e.stopPropagation();
    }
  }, {
    key: "target",
    value: function target(e) {
      return $(e.target);
    }
  }, {
    key: "currentTarget",
    value: function currentTarget(e) {
      return $(e.currentTarget);
    }
  }, {
    key: "isEnter",
    value: function isEnter(e) {
      return this.keycode(e) === this.keys.enter;
    }
  }, {
    key: "isSpace",
    value: function isSpace(e) {
      return this.keycode(e) === this.keys.space;
    }
  }, {
    key: "isTab",
    value: function isTab(e) {
      return this.keycode(e) === this.keys.tab;
    }
  }, {
    key: "isBackTab",
    value: function isBackTab(e) {
      return e.shiftKey && this.isTab(e);
    }
  }, {
    key: "isEsc",
    value: function isEsc(e) {
      return this.keycode(e) === this.keys.esc;
    }
  }, {
    key: "isEnterOrSpace",
    value: function isEnterOrSpace(e) {
      return this.isEnter(e) || this.isSpace(e);
    }
  }, {
    key: "keycode",
    value: function keycode(e) {
      return e.which;
    }
  }, {
    key: "isIE",
    value: function isIE(version) {
      if (typeof version == "undefined") {
        version = 8;
      }
      return bowser.msie && bowser.version === version;
    }
  }]);

  return MLPModule;
}();

$.mlpInit(MLPModule, 'MLPModule');
'use strict';

/*
  Every plugin initialization goes here.
 */

$(document).ready(function () {

  // $('[data-js-top-menu]').TopMenu();
  // $.TopMenuSmall();


  $('[data-js-full-page]').FullPage();
  $('[data-js-sideNav]').SideNav();

  if ($('#loginModal').length) {
    $('#loginModal').modal({ backdrop: "static", show: false });
  }
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullPage = function (_MLP$apps$MLPModule) {
    _inherits(FullPage, _MLP$apps$MLPModule);

    function FullPage() {
        _classCallCheck(this, FullPage);

        return _possibleConstructorReturn(this, (FullPage.__proto__ || Object.getPrototypeOf(FullPage)).apply(this, arguments));
    }

    _createClass(FullPage, [{
        key: "init",
        value: function init() {

            this.events();
        }
    }, {
        key: "events",
        value: function events() {
            var _this = this;
            this.fullPage();
            $("body").css("background-color", "#041e45");
            $(window).resize(function () {
                _this.fullPage();
            });
        }
    }, {
        key: "fullPage",
        value: function fullPage() {
            var windowHeight = $(window).height();
            var footerHeight = $('.c-footer').outerHeight();
            var headerHeight = $('.c-header').outerHeight();
            if (windowHeight <= 1000) {
                $(".c-content").height(windowHeight - footerHeight - headerHeight - 100);
            } else if (windowHeight > 1000) {
                $(".c-content").height(1000 - footerHeight - headerHeight - 100);
            }
        }
    }]);

    return FullPage;
}(MLP.apps.MLPModule);

$.mlpPlugin(FullPage, 'FullPage', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNav = function (_MLP$apps$MLPModule) {
  _inherits(SideNav, _MLP$apps$MLPModule);

  function SideNav() {
    _classCallCheck(this, SideNav);

    return _possibleConstructorReturn(this, (SideNav.__proto__ || Object.getPrototypeOf(SideNav)).apply(this, arguments));
  }

  _createClass(SideNav, [{
    key: 'init',
    value: function init() {
      _get(SideNav.prototype.__proto__ || Object.getPrototypeOf(SideNav.prototype), 'init', this).call(this);
      this.el = {
        extendableItems: this.el.target.find('[data-expanded] > span'),
        clickableItems: this.el.target.find('[data-expanded] a'),
        sideNav: $('[data-js-sidenav]'),
        tabContent: $('#mainFrameTabs'),
        arrow: this.el.target.find('.js-arrow')

      };
      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      this.initSideNav();
      this.setHeight();
    }
  }, {
    key: 'initSideNav',
    value: function initSideNav() {
      var _this = this;

      this.el.extendableItems.each(function () {
        $(this).on('click', function () {
          var status = $(_this.el.arrow).attr('data-status');
          if (status == 'open') {
            var toggleExpand = $(this).parent().attr('data-expanded') == 'true' ? 'false' : 'true';
            $(this).parent().attr('data-expanded', toggleExpand);
          } else {
            $(_this.el.arrow).trigger('click');
          }
        });
      });

      this.el.clickableItems.each(function () {
        $(this).on('click', function () {
          _this.setHeight();
          _this.highlightNav();
          _this.removeHightLight();
        });
      });

      this.el.arrow.on('click', function () {
        var status = $(this).attr('data-status') == 'open' ? 'close' : 'open';
        $(_this.el.arrow).attr('data-status', status);
        $(_this.el.sideNav).attr('data-status', status);
      });
    }
  }, {
    key: 'setHeight',
    value: function setHeight() {
      var _this = this;
      var tabContentheight = this.el.tabContent.height();
      var sideNavHeight = this.el.sideNav.height();
      if (sideNavHeight < tabContentheight) {
        _this.el.sideNav.height(tabContentheight);
      }
    }
  }, {
    key: 'highlightNav',
    value: function highlightNav() {
      var _this = this;
      var cHref = $('.nav-tabs a[aria-expanded="true"]').attr('href');
      var cidArray = cHref.split('_');
      var cid = cidArray[1];
      $('.tab-active').removeClass('tab-active');
      $('a[mid="' + cid + '"]').addClass('tab-active');
    }
  }, {
    key: 'removeHightLight',
    value: function removeHightLight() {

      $('.navTabsCloseBtn').on('click', function () {
        $('.tab-active').removeClass('tab-active');
      });

      this.highlightNav();
    }
  }]);

  return SideNav;
}(MLP.apps.MLPModule);

$.mlpPlugin(SideNav, 'SideNav', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabSwitch = function (_MLP$apps$MLPModule) {
  _inherits(TabSwitch, _MLP$apps$MLPModule);

  function TabSwitch() {
    _classCallCheck(this, TabSwitch);

    return _possibleConstructorReturn(this, (TabSwitch.__proto__ || Object.getPrototypeOf(TabSwitch)).apply(this, arguments));
  }

  _createClass(TabSwitch, [{
    key: 'init',
    value: function init() {
      _get(TabSwitch.prototype.__proto__ || Object.getPrototypeOf(TabSwitch.prototype), 'init', this).call(this);
      this.el = {
        tabNavs: $('.js-tab-nav ul li'),
        tabContents: $('.js-tab-content > div')
      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;
      var tabLength = this.el.tabNavs.length;

      for (var i = 0; i < tabLength; i++) {
        (function (i) {
          $(_this.el.tabNavs[i]).on("click", function () {
            $(_this.el.tabNavs).removeClass(_this.classes.active);
            $(this).addClass(_this.classes.active);
            $(_this.el.tabContents).hide();
            $(_this.el.tabContents[i]).show();
          });
        })(i);
      }
    }
  }]);

  return TabSwitch;
}(MLP.apps.MLPModule);

$.mlpPlugin(TabSwitch, 'TabSwitch', false, false);