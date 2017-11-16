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
        modalConfirm: this.el.target.find(".js-confirm-modal"),
        editMenuText: this.el.target.find(".js-edit-text"),
        editMneu: this.el.target.find(".js-edit-menu"),
        confirmInfoBtn: this.el.target.find(".js-confirm-info"),
        editInfoBtn: this.el.target.find(".js-edit-info"),
        treeMenu: this.el.target.find(".js-tree-menu"),
        modalType: this.el.target.find(".js-dataType-modal")
      };
      this.className = {
        isEdit: "isEdit",
        hasItem: "hasItem",
        hide: "hide"
      };
      this.menuData = {};
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
      this.editMenuText();
      this.openInfoModal();
      this.isSetMenu();
      this.upDateMenuTree();
      this.showInfoMenu();
      this.openDataTypeModal();
      this.el.confirmBtn.off('click').on('click', function (evt) {

        var nodeIndex = void 0;
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

      this.el.confirmInfoBtn.off('click').on('click', function (evt) {
        $(".js-setup-menu").removeClass(_this3.className.isEdit);
        _this3.upDateMenuTree();
      });
      this.el.editMneu.off('click').on('click', function (evt) {
        $(".js-setup-menu").addClass(_this3.className.isEdit);
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
          $item = "<ul class='list-group list-group-first'>" + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon expand-icon ion-arrow-down-b'></span><span class='icon node-icon'></span><span class='text-edit text-first'>" + itemName + "" + "</span><span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down' data-action='orderFirst'></span><span class='ion ion-arrow-up-b js-arrow-up' data-action='orderFirst'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeALL'></span>" + "<span class='ion ion-edit js-edit-text'></span><span class='ion ion-plus-round js-open-modal'  data-action='addSecond'></span>" + "</li></ul>";
          $(this.el.menuItem).append($item);
          _this.openModal();
          _this.removeNode();
          _this.orderMenu();
          _this.editMenuText();
          _this.openInfoModal();
          _this.isSetMenu();
          break;
        case 1:
          nodeIndex = "node-second";
          var $targetNode = $target.find(".list-group-second");
          $startTag = $targetNode && $targetNode.length ? "" : "<ul class='list-group list-group-second'>";
          $endTag = $targetNode && $targetNode.length ? "" : "</ul>";
          $firstNode = $targetNode && $targetNode.length ? $targetNode : $target;
          $item = $startTag + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon expand-icon ion-arrow-down-b'></span><span class='icon node-icon'></span><span class='text-edit text-second'>" + itemName + "" + "</span><span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down'></span><span class='ion ion-arrow-up-b js-arrow-up'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeSecond'></span>" + "<span class='ion ion-edit js-edit-text'></span><span class='ion ion-plus-round js-open-modal'  data-action='addThird'></span>" + "</li>" + $endTag;
          $firstNode.append($item);
          _this.openModal();
          _this.removeNode();
          _this.orderMenu();
          _this.editMenuText();
          _this.openInfoModal();
          _this.isSetMenu();
          break;
        default:
          nodeIndex = "node-third";
          $sibling = $target.find(".list-group-third");
          $startTag = $sibling && $sibling.length ? "" : "<ul class='list-group-third list-group'>";
          $endTag = $sibling && $sibling.length ? "" : "</ul>";
          $secondNode = $sibling && $sibling.length ? $sibling : $target;
          $item = $startTag + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon glyphicon'></span><span class='icon node-icon ion-stop'></span><span class='text-edit text-third'>" + itemName + "" + "</span><span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down'></span><span class='ion ion-arrow-up-b js-arrow-up'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeThird'></span>" + "<span class='ion ion-edit js-edit-text'></span><span class='ion text-info js-edit-info'>设置菜单内容布局</span><span class='ion c-icon-edit text-info js-edit-info'></span>" + "</li>" + $endTag;
          $secondNode.append($item);
          _this.openModal();
          _this.removeNode();
          _this.orderMenu();
          _this.editMenuText();
          _this.openInfoModal();
          _this.isSetMenu();
          _this.showInfoMenu();
      }
    }

    //打开modal

  }, {
    key: 'openModal',
    value: function openModal() {
      var _this4 = this;

      $(".js-open-modal").off('click').on('click', function (evt) {
        _this4.target = $(evt.target);
        _this4.$action = $(evt.target).data("action");
        _this4.el.modalItem.modal('show');
      });
    }
  }, {
    key: 'openInfoModal',
    value: function openInfoModal() {
      var _this5 = this;

      $(".js-dataType-modal-1").off('click').on('click', function (evt) {
        $(".js-addData-modal-1").modal('show');
        _this5.el.modalType.modal('hide');
      });
      $(".js-dataType-modal-2").off('click').on('click', function (evt) {
        $(".js-addData-modal-2").modal('show');
        _this5.el.modalType.modal('hide');
      });
    }
  }, {
    key: 'openDataTypeModal',
    value: function openDataTypeModal() {
      var _this6 = this;

      $(".js-add-menu-info").off('click').on('click', function (evt) {
        _this6.el.modalType.modal('show');
      });
    }
  }, {
    key: 'showInfoMenu',
    value: function showInfoMenu() {
      var _this7 = this;

      $(".js-edit-info").off('click').on('click', function (evt) {
        $(".js-module-setup-radios").removeClass(_this7.className.hide);
      });
      $(".js-edit-info").off('click').on('click', function (evt) {
        $(".js-module-setup-radios").removeClass(_this7.className.hide);
      });
    }

    //移除节点

  }, {
    key: 'removeNode',
    value: function removeNode() {
      var _this8 = this;

      var _this = this;
      this.removeStatus = false;
      $(".js-remove-node").on('click', function (evt) {
        _this8.$removeAction = $(evt.target).data("action");
        switch (_this8.$removeAction) {
          case "removeThird":
            $(evt.target).parent().remove();
            _this.isSetMenu();
            break;
          default:
            $(".js-confirm-modal").modal("show");
            _this.confirmRemove($(evt.target).parent());
            _this.isSetMenu();
            break;
        }
      });
    }

    //确认返回值

  }, {
    key: 'confirmRemove',
    value: function confirmRemove($target) {
      var _this9 = this;

      var _this = this;
      $(".js-remove-btn").off('click').on('click', function (evt) {
        _this9.removeStatus = true;
        _this9.el.modalConfirm.modal('hide');
        if (_this9.removeStatus) {
          var $parentNode = $target.parent();
          $target.remove();
          if (!$parentNode.find(".list-group-item").length) {
            $parentNode.remove();
          }
          _this.isSetMenu();
        }
      });
    }

    //节点排序

  }, {
    key: 'orderMenu',
    value: function orderMenu() {
      var _this = this;
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

    //编辑菜单文本

  }, {
    key: 'editMenuText',
    value: function editMenuText() {
      var _this = this;
      $(".js-edit-text").off('click').on('click', function (evt) {

        var $textInput = $(evt.target).siblings(".text-edit"),
            $input = $("<input type='text'/>");
        var $text = $textInput.text();
        if ($textInput.children("input").length > 0) {
          return false;
        }
        $input.width($textInput.width() + 5);
        $input.val($text);
        $textInput.html("");
        $input.appendTo($textInput).focus().select();
        $input.on("click", function () {
          return false;
        });
        $input.on('blur', function () {
          var inputText = $input.val() ? $input.val() : $text;
          $textInput.html(inputText);
        });
        $input.on('keyup', function (event) {
          var myEvent = event || window.event;
          var key = myEvent.keyCode;
          if (key == 13) {
            var inputText = $input.val() ? $input.val() : $text;
            $textInput.html(inputText);
          }
        });
      });
    }

    //是否有菜单

  }, {
    key: 'isSetMenu',
    value: function isSetMenu() {
      var menuItem = $(".js-menu-item").find(".list-group");
      if (menuItem && menuItem.length) {
        $(".js-setup-menu").addClass(this.className.hasItem);
      } else if (!menuItem.length) {
        $(".js-setup-menu").removeClass(this.className.hasItem);
      }
    }

    //更新菜单数据

  }, {
    key: 'upDateMenuTree',
    value: function upDateMenuTree() {
      var _this = this;
      var arr = [];
      var menuObj = {};

      var menuArr = $(".js-menu-item").find(".list-group-first >li");

      for (var i = 0; i < menuArr.length; i++) {

        var oFirstLevel = {};
        oFirstLevel.name = $(menuArr[i]).find(".text-first").text();
        oFirstLevel.children = [];

        var menuSecond = $(menuArr[i]).find(".list-group-second >li");

        for (var j = 0; j < menuSecond.length; j++) {

          var oSecondLevel = {};
          oSecondLevel.name = $(menuSecond[j]).find(".text-second").text();
          oSecondLevel.children = [];
          oFirstLevel.children.push(oSecondLevel);

          var menuThird = $(menuSecond[j]).find(".list-group-third >li");

          for (var k = 0; k < menuThird.length; k++) {

            var oThirdLevel = {};
            oThirdLevel.name = $(menuThird[k]).find(".text-third").text();
            oSecondLevel.children.push(oThirdLevel);
          }
        }
        arr.push(oFirstLevel);
      }
      menuObj.menuTree = arr;
      if (arr && arr.length) {
        console.log(arr);
        $(".js-tree-menu").val(JSON.stringify(menuObj));
      }
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
  $('[data-js-popup-preview]').PopUpPreview();
  if ($('.modal').length) {
    $('.modal').modal({ backdrop: "static", show: false });
  }
  //select
  $('.js-select-fancy').selectpicker();
  $('[data-tree-view]').TreeView();
  $('[data-add-menu]').AddMenu();
  $('[data-slick-detail]').Slick();

  //form validator
  $('[data-js-form-validator]').Validator();

  //file upload
  $('[data-js-file-input]').FileInput();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileInput = function (_MLP$apps$MLPModule) {
  _inherits(FileInput, _MLP$apps$MLPModule);

  function FileInput() {
    _classCallCheck(this, FileInput);

    return _possibleConstructorReturn(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).apply(this, arguments));
  }

  _createClass(FileInput, [{
    key: 'init',
    value: function init() {
      _get(FileInput.prototype.__proto__ || Object.getPrototypeOf(FileInput.prototype), 'init', this).call(this);

      this.el = {
        uploadFile: this.el.target.find('.js-file-input')
      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {

      $("#fileUpload").fileinput(_defineProperty({
        language: 'zh',
        theme: 'fa',
        browseClass: "btn btn-success",
        browseLabel: "选择上传",
        showUpload: true,
        showCaption: true,
        allowedFileExtensions: ["jpg", "gif", "png"],
        previewClass: "bg-warning",
        maxFilePreviewSize: 20240
      }, 'showUpload', false));
    }
  }]);

  return FileInput;
}(MLP.apps.MLPModule);

$.mlpPlugin(FileInput, 'FileInput', false, false);
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
        $("#mainFrameTabs").attr('data-status', status);
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

var Slick = function (_MLP$apps$MLPModule) {
  _inherits(Slick, _MLP$apps$MLPModule);

  function Slick() {
    _classCallCheck(this, Slick);

    return _possibleConstructorReturn(this, (Slick.__proto__ || Object.getPrototypeOf(Slick)).apply(this, arguments));
  }

  _createClass(Slick, [{
    key: 'init',
    value: function init() {
      _get(Slick.prototype.__proto__ || Object.getPrototypeOf(Slick.prototype), 'init', this).call(this);
      this.el = {
        slickOpt: this.el.target.find('.js-select-data'),
        slickBtn: this.el.target.find('.js-select-info'),
        prev: this.el.target.find('.slick-btn-prev'),
        next: this.el.target.find('.slick-btn-next'),
        prevBtn: this.el.target.find('.slick-info-prev'),
        nextBtn: this.el.target.find('.slick-info-next'),
        closeBtn: this.el.target.find('.js-remove-detail'),
        detail: this.el.target.find(".c-module-slick-detail")
      };
      this.className = {
        active: "active"
      };

      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      this.el.slickOpt.slick({
        slide: "li",
        fade: true,
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        draggable: false,
        nextArrow: this.el.prev,
        prevArrow: this.el.next
      });

      this.el.slickBtn.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        nextArrow: this.el.prevBtn,
        prevArrow: this.el.nextBtn
      });

      this.el.closeBtn.off("click").on("click", function (evt) {
        $(evt.target).parent().remove();
      });

      this.el.detail.off("click").on("click", function (evt) {
        var $target = $(evt.target).closest(".c-module-slick-detail");
        if ($target.hasClass(_this.className.active)) {
          $target.removeClass(_this.className.active);
        } else {
          $target.addClass(_this.className.active);
        }
      });
    }
  }]);

  return Slick;
}(MLP.apps.MLPModule);

$.mlpPlugin(Slick, 'Slick', false, false);
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Validator = function (_MLP$apps$MLPModule) {
  _inherits(Validator, _MLP$apps$MLPModule);

  function Validator() {
    _classCallCheck(this, Validator);

    return _possibleConstructorReturn(this, (Validator.__proto__ || Object.getPrototypeOf(Validator)).apply(this, arguments));
  }

  _createClass(Validator, [{
    key: 'init',
    value: function init() {
      _get(Validator.prototype.__proto__ || Object.getPrototypeOf(Validator.prototype), 'init', this).call(this);
      this.sel.errorMsg = ".input-error-message";
      this.sel.callback = this.el.target.attr('data-callback');
      this.events();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this3 = this;

      $('.js-form-submit').on("click", function (evt) {
        if (!_this3.validate()) {
          var errInfoPostion = _this3.getPostion();
          if (errInfoPostion) {
            $('html, body').animate({
              scrollTop: errInfoPostion - 100
            });
          }
          return false;
        }

        return false;
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this4 = this;

      var _isPassed, _this;
      this.hideErrorMsg();
      _isPassed = true;
      _this = this;
      $(this.el.target.context).find(" :input").each(function (index, item) {
        var _rulesSplit;
        if ($(item).is(":visible") || $(item).data("js-visible")) {
          var _rules = $(item).data('rule');
          if (_rules) {
            _rulesSplit = _rules.split("|");
            $.each(_rulesSplit, function (index, rule) {
              if (!_this4.isRulePassed($(item), rule)) {
                $(item).siblings('.input-error-message').removeClass('hide');
                $(item).parent().siblings('.input-error-message').removeClass('hide');
                _isPassed = false;
              }
            });
          }
        }
      });
      return _isPassed;
    }
  }, {
    key: 'isRulePassed',
    value: function isRulePassed(_this, rule) {
      var _isValid = true,
          number;
      var splitRule = rule.split(':');
      if (splitRule[0] == 'max' || splitRule[0] == 'min') {
        rule = splitRule[0];
        number = splitRule[1];
      }

      switch (rule) {
        case 'required':
          if (_this.attr('type') == 'checkbox') {
            if (!_this.is(':checked')) {
              _isValid = false;
            }
          } else {
            if ($.trim(_this.val()).length === 0) {
              _isValid = false;
            }
          }
          break;

        case 'max':
          if ($.trim(_this.val()).length > number) {
            _isValid = false;
          }
          break;
        case 'max':
          if ($.trim(_this.val()).length > number) {
            _isValid = false;
          }
          break;
        case 'min':
          if ($.trim(_this.val()).length < number) {
            _isValid = false;
          }
          break;
        case 'noZZOnBeginning':
          if (_this.val().toLowerCase().substr(0, 2) === 'zz') {
            _isValid = false;
          }
          break;
        case 'firstThreeNoRepeat':
          var pattern = /([a-zA-Z0-3])\1{2,}/;
          if (pattern.test(_this.val())) {
            _isValid = false;
          }
          break;
        case 'alpha':
          var pattern = /[0-9~`!@#\$\%\^&*()_+,\.\/\;\'[\]\\<>\?\:\"\{\}\|～！@＃¥％……&＊（）＋——－＝、］［｛｝｜‘；：“／。，《》？]/i;
          if (pattern.test(_this.val())) {
            _isValid = false;
          }
          break;
        case 'email':
          var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
          if (!pattern.test(_this.val())) {
            _isValid = false;
          }
          break;
        case 'mobile':
          var pattern = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
          if (!pattern.test(_this.val())) {
            _isValid = false;
          }
      }

      return _isValid;
    }
  }, {
    key: 'hideErrorMsg',
    value: function hideErrorMsg() {
      $(this.sel.errorMsg).addClass('hide');
    }
  }, {
    key: 'getPostion',
    value: function getPostion() {
      for (var i = 0; i < $(".input-error-message").length; i++) {
        if ($(".input-error-message").eq(i).is(":visible")) {
          return $(".input-error-message").eq(i).offset().top;
        }
      }
    }
  }]);

  return Validator;
}(MLP.apps.MLPModule);

$.mlpPlugin(Validator, 'Validator', false, false);