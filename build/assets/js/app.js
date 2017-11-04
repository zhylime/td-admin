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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddMenu = function (_MLP$apps$MLPModule) {
  _inherits(AddMenu, _MLP$apps$MLPModule);

  function AddMenu() {
    _classCallCheck(this, AddMenu);

    return _possibleConstructorReturn(this, (AddMenu.__proto__ || Object.getPrototypeOf(AddMenu)).apply(this, arguments));
  }

  _createClass(AddMenu, [{
    key: 'init',
    value: function init() {
      _get(AddMenu.prototype.__proto__ || Object.getPrototypeOf(AddMenu.prototype), 'init', this).call(this);
      this.el = {
        addItem: this.el.target.find('.js-add-menu'),
        menuItem: this.el.target.find('.js-menu-item'),
        confirmBtn: this.el.target.find('.js-save-item'),
        modalItem: this.el.target.find('.js-menu-modal'),
        showModal: this.el.target.find('.js-open-modal'),
        removeBtn: this.el.target.find(".js-remove-btn"),
        modalConfirm: this.el.target.find(".js-confirm-modal")
      };
      this.$action = "addFirst";
      this.target = "";
      this.$removeAction = "removeThird";
      this.removeStatus = false;

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this3 = this;

      var _this = this;
      this.openModal();
      this.removeNode();
      this.confirmRemove();
      this.orderMenu();
      this.el.confirmBtn.off('click').on('click', function (evt) {

        var _this = _this3,
            nodeIndex = void 0;
        switch (_this3.$action) {
          case "addFirst":
            nodeIndex = 0;
            break;
          case "addSecond":
            nodeIndex = 1;
            break;
          default:
            nodeIndex = 2;
        }

        var $itemName = $(_this3.el.addItem).val();
        var $errorMessage = $(_this3.el.addItem).siblings('.text-danger');
        if ($itemName && $itemName.length >= 2 && $itemName.length <= 10) {
          _this3.el.modalItem.modal('hide');
          $errorMessage.addClass('hide');
          _this.updateMenu($itemName, nodeIndex, _this.target);
        } else {
          $errorMessage.removeClass('hide');
        }
      });
    }

    //更新菜单内容

  }, {
    key: 'updateMenu',
    value: function updateMenu(itemName, index, curTarget) {
      var nodeIndex = void 0,
          $item = void 0,
          _this = this,
          $startTag = void 0,
          $endTag = void 0,
          $sibling = void 0,
          $firstNode = void 0,
          $secondNode = void 0;
      var $target = curTarget.parent();

      switch (index) {
        case 0:
          nodeIndex = "node-first";
          $item = "<ul class='list-group'>" + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon expand-icon ion-arrow-down-b'></span><span class='icon node-icon'></span>" + itemName + "" + "<span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down'></span><span class='ion ion-arrow-up-b js-arrow-up'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeALL'></span>" + "<span class='ion ion-android-create'></span><span class='ion ion-plus-round js-open-modal'  data-action='addSecond'></span>" + "</li></ul>";
          $(this.el.menuItem).append($item);
          _this.openModal();
          _this.removeNode();
          break;
        case 1:
          nodeIndex = "node-second";
          var $targetNode = $target.find(".list-group-second");
          $startTag = $targetNode && $targetNode.length ? "" : "<ul class='list-group list-group-second'>";
          $endTag = $targetNode && $targetNode.length ? "" : "</ul>";
          $firstNode = $targetNode && $targetNode.length ? $targetNode : $target;
          $item = $startTag + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon expand-icon ion-arrow-down-b'></span><span class='icon node-icon'></span>" + itemName + "" + "<span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down'></span><span class='ion ion-arrow-up-b js-arrow-up'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeSecond'></span>" + "<span class='ion ion-android-create'></span><span class='ion ion-plus-round js-open-modal'  data-action='addThird'></span>" + "</li>" + $endTag;
          $firstNode.append($item);
          _this.openModal();
          _this.removeNode();
          _this.orderMenu();
          break;
        default:
          nodeIndex = "node-third";
          $sibling = $target.find(".list-group-third");
          $startTag = $sibling && $sibling.length ? "" : "<ul class='list-group-third list-group'>";
          $endTag = $sibling && $sibling.length ? "" : "</ul>";
          $secondNode = $sibling && $sibling.length ? $sibling : $target;
          $item = $startTag + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon glyphicon'></span><span class='icon node-icon ion-stop'></span>" + itemName + "" + "<span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down'></span><span class='ion ion-arrow-up-b js-arrow-up'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeThird'></span>" + "<span class='ion ion-android-create'></span>" + "</li>" + $endTag;
          $secondNode.append($item);
          _this.openModal();
          _this.removeNode();
          _this.orderMenu();
      }
    }

    //打开modal

  }, {
    key: 'openModal',
    value: function openModal() {
      var _this4 = this;

      $(".js-open-modal").on('click', function (evt) {
        _this4.target = $(evt.target);
        _this4.$action = $(evt.target).data("action");
        _this4.el.modalItem.modal('show');
      });
    }

    //移除节点

  }, {
    key: 'removeNode',
    value: function removeNode() {
      var _this5 = this;

      var _this = this;
      this.removeStatus = false;
      $(".js-remove-node").on('click', function (evt) {
        _this5.$removeAction = $(evt.target).data("action");
        switch (_this5.$removeAction) {
          case "removeThird":
            $(evt.target).parent().remove();
            break;
          default:
            $(".js-confirm-modal").modal("show");
            _this.confirmRemove($(evt.target).parent());
            break;
        }
      });
    }

    //确认返回值

  }, {
    key: 'confirmRemove',
    value: function confirmRemove($target) {
      var _this6 = this;

      $(".js-remove-btn").off('click').on('click', function (evt) {
        _this6.removeStatus = true;
        _this6.el.modalConfirm.modal('hide');
        if (_this6.removeStatus) {
          $target.remove();
        }
      });
    }

    //节点排序

  }, {
    key: 'orderMenu',
    value: function orderMenu() {

      $(".js-arrow-down").off('click').on('click', function (evt) {
        var $action = $(evt.target).data("action");
        var $target = $action ? $(evt.target).closest(".list-group") : $(evt.target).closest(".list-group-item"),
            $silbings = $action ? $target.next(".list-group") : $target.next(".list-group-item");

        if ($silbings && $silbings.length) {
          $target.insertAfter($silbings);
        }
      });
      $(".js-arrow-up").off('click').on('click', function (evt) {
        var $action = $(evt.target).data("action");
        var $target = $action ? $(evt.target).closest(".list-group") : $(evt.target).closest(".list-group-item"),
            $silbings = $action ? $target.prev(".list-group") : $target.prev(".list-group-item");

        if ($silbings && $silbings.length) {
          $target.insertBefore($silbings);
        }
      });
    }
  }]);

  return AddMenu;
}(MLP.apps.MLPModule);

$.mlpPlugin(AddMenu, 'AddMenu', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardFlip = function (_MLP$apps$MLPModule) {
  _inherits(CardFlip, _MLP$apps$MLPModule);

  function CardFlip() {
    _classCallCheck(this, CardFlip);

    return _possibleConstructorReturn(this, (CardFlip.__proto__ || Object.getPrototypeOf(CardFlip)).apply(this, arguments));
  }

  _createClass(CardFlip, [{
    key: 'init',
    value: function init() {
      _get(CardFlip.prototype.__proto__ || Object.getPrototypeOf(CardFlip.prototype), 'init', this).call(this);
      this.el = {
        gridContainer: $('[data-js-card]'),
        cardItems: this.el.target.find('.js-card'),
        cardSide: this.el.target.find('.card-side'),
        previewBtn: this.el.target.find('.button-preview'),
        createModule: this.el.target.find('.button-create'),
        remove: this.el.target.find('.button-remove')
      };

      this.cardFront;
      this.cardBack;
      this.speed = 225;
      // this.enableFlip = true;

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      setTimeout(function () {
        _this.el.gridContainer.css('opacity', '1');
      }, 260);

      this.el.previewBtn.each(function (e) {
        $(this).on('click', function (evt) {
          evt.stopPropagation();
        });
      });
      this.el.createModule.each(function (e) {
        $(this).on('click', function (evt) {
          evt.stopPropagation();
        });
      });
      this.el.remove.each(function (e) {
        $(this).on('click', function (evt) {
          evt.stopPropagation();
          $(this).parents('.js-card').remove();
        });
      });
      // this.initCardSide();
      this.el.cardItems.each(function () {
        $(this).on('click', function (e) {

          if ($(this).find('.card-side').hasClass('card-front')) {
            _this.cardFront = $(this).find('.card-front');
            // console.log(_this.cardFront);
            setTimeout(function () {
              _this.cardFront.addClass('card-back').removeClass('card-front');
            });
          }
          if ($(this).find('.card-side').hasClass('card-back')) {
            _this.cardBack = $(this).find('.card-back');
            setTimeout(function () {
              _this.cardBack.addClass('card-front').removeClass('card-back');
            });
          }
        });
      });
    }
  }]);

  return CardFlip;
}(MLP.apps.MLPModule);

$.mlpPlugin(CardFlip, 'CardFlip', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartsTypeButtons = function (_MLP$apps$MLPModule) {
  _inherits(ChartsTypeButtons, _MLP$apps$MLPModule);

  function ChartsTypeButtons() {
    _classCallCheck(this, ChartsTypeButtons);

    return _possibleConstructorReturn(this, (ChartsTypeButtons.__proto__ || Object.getPrototypeOf(ChartsTypeButtons)).apply(this, arguments));
  }

  _createClass(ChartsTypeButtons, [{
    key: 'init',
    value: function init() {
      _get(ChartsTypeButtons.prototype.__proto__ || Object.getPrototypeOf(ChartsTypeButtons.prototype), 'init', this).call(this);
      this.el = {
        buttons: this.el.target.find('[data-group-id]')

      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      this.el.buttons.each(function () {
        $(this).on('click', function () {
          var id = $(this).attr('data-group-id');
          $('.filter-group').hide();
          $('#' + id).show();
        });
      });

      $('.filter-item').on('click', function () {
        $(this).toggleClass('active');
      });
    }
  }]);

  return ChartsTypeButtons;
}(MLP.apps.MLPModule);

$.mlpPlugin(ChartsTypeButtons, 'ChartsTypeButtons', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBox = function (_MLP$apps$MLPModule) {
  _inherits(CheckBox, _MLP$apps$MLPModule);

  function CheckBox() {
    _classCallCheck(this, CheckBox);

    return _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).apply(this, arguments));
  }

  _createClass(CheckBox, [{
    key: 'init',
    value: function init() {
      _get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'init', this).call(this);
      this.el = {
        checkBox: this.el.target.find('[type="checkbox"]')
      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      this.el.checkBox.each(function () {
        $(this).on('click', function () {

          $(this).parent().toggleClass('active');
        });
      });
    }
  }]);

  return CheckBox;
}(MLP.apps.MLPModule);

$.mlpPlugin(CheckBox, 'CheckBox', false, false);
'use strict';

/*
  Every plugin initialization goes here.
 */

$(document).ready(function () {

  // $('[data-js-top-menu]').TopMenu();
  // $.TopMenuSmall();


  $('[data-js-full-page]').FullPage();
  $('[data-js-sideNav]').SideNav();
  $('[data-js-module-setup-radios]').RadioBtn();
  $('[data-js-checbox]').CheckBox();
  $('[data-js-card]').CardFlip();
  $('[data-js-charts-filter]').ChartsTypeButtons();
  $('[data-js-module-data-dropdown]').ModuleDataDropDown();
  $('[data-js-popup-preview').PopUpPreview();
  if ($('#loginModal').length) {
    $('#loginModal').modal({ backdrop: "static", show: false });
  }

  $('[data-tree-view]').TreeView();
  $('[data-add-menu]').AddMenu();
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
      if (windowHeight <= 700) {
        $(".c-content__menu").attr("style", "");
      } else if (windowHeight > 700 && windowHeight <= 800) {
        var curHeight = 800 - footerHeight - headerHeight - 100;
        $(".c-content").height(curHeight);
        $(".c-content__menu").css({ "top": "50%", "margin-top": 50 - curHeight / 2 });
      } else if (windowHeight > 800 && windowHeight <= 1000) {
        var _curHeight = windowHeight - footerHeight - headerHeight - 100;
        $(".c-content").height(_curHeight);
        $(".c-content__menu").css({ "top": "50%", "margin-top": 50 - _curHeight / 2 });
      } else if (windowHeight > 1000) {
        var _curHeight2 = 1000 - footerHeight - headerHeight - 100;
        $(".c-content").height(_curHeight2);
        $(".c-content__menu").css({ "top": "50%", "margin-top": 100 - _curHeight2 / 2 });
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

var ModuleDataDropDown = function (_MLP$apps$MLPModule) {
  _inherits(ModuleDataDropDown, _MLP$apps$MLPModule);

  function ModuleDataDropDown() {
    _classCallCheck(this, ModuleDataDropDown);

    return _possibleConstructorReturn(this, (ModuleDataDropDown.__proto__ || Object.getPrototypeOf(ModuleDataDropDown)).apply(this, arguments));
  }

  _createClass(ModuleDataDropDown, [{
    key: 'init',
    value: function init() {
      _get(ModuleDataDropDown.prototype.__proto__ || Object.getPrototypeOf(ModuleDataDropDown.prototype), 'init', this).call(this);
      this.el = {
        dropdownBtn: this.el.target.find('.js-module-data-dropdown')
      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      this.el.dropdownBtn.each(function () {
        $(this).on('click', function () {
          var ifActive = $(this).hasClass('active');

          // $(_this.el.dropdownBtn).removeClass('active');
          if (!ifActive) {
            $(this).addClass('active');
          } else {
            $(this).removeClass('active');
          }
          $(this).parent().next().toggleClass('hide');
        });
      });
    }
  }]);

  return ModuleDataDropDown;
}(MLP.apps.MLPModule);

$.mlpPlugin(ModuleDataDropDown, 'ModuleDataDropDown', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModuleEdit = function (_MLP$apps$MLPModule) {
  _inherits(ModuleEdit, _MLP$apps$MLPModule);

  function ModuleEdit() {
    _classCallCheck(this, ModuleEdit);

    return _possibleConstructorReturn(this, (ModuleEdit.__proto__ || Object.getPrototypeOf(ModuleEdit)).apply(this, arguments));
  }

  _createClass(ModuleEdit, [{
    key: 'init',
    value: function init() {
      _get(ModuleEdit.prototype.__proto__ || Object.getPrototypeOf(ModuleEdit.prototype), 'init', this).call(this);

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {}
  }]);

  return ModuleEdit;
}(MLP.apps.MLPModule);

$.mlpPlugin(ModuleEdit, 'ModuleEdit', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopUpPreview = function (_MLP$apps$MLPModule) {
  _inherits(PopUpPreview, _MLP$apps$MLPModule);

  function PopUpPreview() {
    _classCallCheck(this, PopUpPreview);

    return _possibleConstructorReturn(this, (PopUpPreview.__proto__ || Object.getPrototypeOf(PopUpPreview)).apply(this, arguments));
  }

  _createClass(PopUpPreview, [{
    key: 'init',
    value: function init() {
      _get(PopUpPreview.prototype.__proto__ || Object.getPrototypeOf(PopUpPreview.prototype), 'init', this).call(this);
      this.el = {
        previewBtns: this.el.target.find('.button-preview')

      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      this.el.previewBtns.each(function () {
        $(this).on('click', function () {
          $('.js-popup-preview').show();
          $('.js-popup-cover').show();
        });
      });

      $('.js-close-popup-preview').on('click', function () {
        $('.js-popup-preview').hide();
        $('.js-popup-cover').hide();
      });
    }
  }]);

  return PopUpPreview;
}(MLP.apps.MLPModule);

$.mlpPlugin(PopUpPreview, 'PopUpPreview', false, false);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioBtn = function (_MLP$apps$MLPModule) {
  _inherits(RadioBtn, _MLP$apps$MLPModule);

  function RadioBtn() {
    _classCallCheck(this, RadioBtn);

    return _possibleConstructorReturn(this, (RadioBtn.__proto__ || Object.getPrototypeOf(RadioBtn)).apply(this, arguments));
  }

  _createClass(RadioBtn, [{
    key: 'init',
    value: function init() {
      _get(RadioBtn.prototype.__proto__ || Object.getPrototypeOf(RadioBtn.prototype), 'init', this).call(this);
      this.el = {
        radioItems: this.el.target.find('.js-radio-item')
      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      this.el.radioItems.each(function () {
        $(this).on('click', function () {
          var isActive = $(this).hasClass('active');
          if (isActive) {
            return;
          } else {
            _this.el.radioItems.removeClass('active');
            $(this).addClass('active');
          }
        });
      });

      // console.log(this.setupRadio);
      if ($('.js-radio-images').length > 0) {
        _this.radioImages();
      }
    }
  }, {
    key: 'radioImages',
    value: function radioImages() {
      var _this = this;
      this.el.radioItems.each(function () {
        $(this).on('click', function () {

          var id = $(this).attr('data-image');
          console.log(id);
          $('.js-radio-images img').removeClass('active');
          $('img#' + id).addClass('active');
        });
      });
    }
  }]);

  return RadioBtn;
}(MLP.apps.MLPModule);

$.mlpPlugin(RadioBtn, 'RadioBtn', false, false);
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
        clickableItems: this.el.target.find('a'),
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
          var status = $(_this.el.arrow).attr('data-status');
          console.log(status);
          if (status == 'open') {
            _this.setHeight();
            _this.highlightNav();
            _this.removeHightLight();
          } else {
            $(_this.el.arrow).trigger('click');
          }
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
      if ($('.nav-tabs a[aria-expanded="true"]').length > 0) {
        var cHref = $('.nav-tabs a[aria-expanded="true"]').attr('href');
        var cidArray = cHref.split('_');
        var cid = cidArray[1];
        $('.tab-active').removeClass('tab-active');
        $('a[mid="' + cid + '"]').addClass('tab-active');
      }
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeView = function (_MLP$apps$MLPModule) {
    _inherits(TreeView, _MLP$apps$MLPModule);

    function TreeView() {
        _classCallCheck(this, TreeView);

        return _possibleConstructorReturn(this, (TreeView.__proto__ || Object.getPrototypeOf(TreeView)).apply(this, arguments));
    }

    _createClass(TreeView, [{
        key: 'init',
        value: function init() {
            _get(TreeView.prototype.__proto__ || Object.getPrototypeOf(TreeView.prototype), 'init', this).call(this);

            this.events();
        }
    }, {
        key: 'events',
        value: function events() {}
    }]);

    return TreeView;
}(MLP.apps.MLPModule);

$.mlpPlugin(TreeView, 'TreeView', false, false);