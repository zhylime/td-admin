class AddMenu extends MLP.apps.MLPModule {

  init() {
    super.init();
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
      isEdit:"isEdit",
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

  events() {
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
    this.scrollBar();
    this.el.confirmBtn.off('click').on('click', (evt) =>{

      let nodeIndex;
      switch (this.$action) {
        case "addFirst":
          nodeIndex = 0;
          break;
        case "addSecond":
          nodeIndex = 1;
          break;
        default:
          nodeIndex = 2;
      }

      let $itemName = $(this.el.addItem).val();
      let $errorMessage = $(this.el.addItem).siblings('.text-danger');
      if ($itemName && $itemName.length >= 2 && $itemName.length <= 10) {
        this.el.modalItem.modal('hide');
        $errorMessage.addClass('hide');
        _this.updateMenu($itemName, nodeIndex, _this.target);
      } else {
        $errorMessage.removeClass('hide');
      }

    });

    this.el.confirmInfoBtn.off('click').on('click', (evt)=>{
      $(".js-setup-menu").removeClass(this.className.isEdit);
      this.upDateMenuTree();
    });
    this.el.editMneu.off('click').on('click', (evt)=>{
      $(".js-setup-menu").addClass(this.className.isEdit);
    });

  }

  //更新菜单内容
  updateMenu(itemName, index, curTarget) {
    let nodeIndex,
      $item,
      _this = this,
      $startTag,
      $endTag,
      $sibling,
      $firstNode,
      $secondNode;
    let $target = curTarget.parent();

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
        _this.scrollBar();
        break;
      case 1:
        nodeIndex = "node-second";
        let $targetNode = $target.find(".list-group-second");
        $startTag = ($targetNode && $targetNode.length) ? "": "<ul class='list-group list-group-second'>";
        $endTag = ($targetNode && $targetNode.length) ? "": "</ul>";
        $firstNode = ($targetNode && $targetNode.length) ? $targetNode: $target;
        $item = $startTag + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon expand-icon ion-arrow-down-b'></span><span class='icon node-icon'></span><span class='text-edit text-second'>" + itemName + "" + "</span><span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down'></span><span class='ion ion-arrow-up-b js-arrow-up'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeSecond'></span>" + "<span class='ion ion-edit js-edit-text'></span><span class='ion ion-plus-round js-open-modal'  data-action='addThird'></span>" + "</li>" + $endTag;
        $firstNode.append($item);
        _this.openModal();
        _this.removeNode();
        _this.orderMenu();
        _this.editMenuText();
        _this.openInfoModal();
        _this.isSetMenu();
        _this.scrollBar();
        break;
      default:
        nodeIndex = "node-third";
        $sibling = $target.find(".list-group-third");
        $startTag = ($sibling && $sibling.length) ? "": "<ul class='list-group-third list-group'>";
        $endTag = ($sibling && $sibling.length) ? "": "</ul>";
        $secondNode = ($sibling && $sibling.length) ? $sibling: $target;
        $item = $startTag + "<li class='list-group-item " + nodeIndex + "' data-index = '" + index + "'>" + "<span class='icon glyphicon'></span><span class='icon node-icon ion-stop'></span><span class='text-edit text-third'>" + itemName + "" + "</span><span class='ion ion-arrow'><span class='ion ion-arrow-down-b js-arrow-down'></span><span class='ion ion-arrow-up-b js-arrow-up'></span></span>" + "<span class='ion ion-close js-remove-node' data-action='removeThird'></span>" + "<span class='ion ion-edit js-edit-text'></span><span class='ion text-info js-edit-info'>设置菜单内容布局</span><span class='ion c-icon-edit text-info js-edit-info'></span>" + "</li>" + $endTag;
        $secondNode.append($item);
        _this.openModal();
        _this.removeNode();
        _this.orderMenu();
        _this.editMenuText();
        _this.openInfoModal();
        _this.isSetMenu();
        _this.showInfoMenu();
        _this.scrollBar();
    }

  }

  //打开modal
  openModal() {
    $(".js-open-modal").off('click').on('click', (evt) =>{
      this.target = $(evt.target);
      this.$action = $(evt.target).data("action");
      this.el.modalItem.modal('show');
    });
  }
  openInfoModal() {
    $(".js-dataType-modal-1").off('click').on('click', (evt) =>{
      $(".js-addData-modal-1").modal('show');
      this.el.modalType.modal('hide');
    });
    $(".js-dataType-modal-2").off('click').on('click', (evt) =>{
      $(".js-addData-modal-2").modal('show');
      this.el.modalType.modal('hide');
    });
  }

  openDataTypeModal() {
    $(".js-add-menu-info").off('click').on('click', (evt) =>{
      this.el.modalType.modal('show');
    });
  }
  showInfoMenu() {
    $(".js-edit-info").off('click').on('click', (evt) =>{
      $(".js-module-setup-radios").removeClass(this.className.hide);
    });
    $(".js-edit-info").off('click').on('click', (evt) =>{
      $(".js-module-setup-radios").removeClass(this.className.hide);
    });
  }

  //移除节点
  removeNode() {
    var _this = this;
    this.removeStatus = false;
    $(".js-remove-node").on('click', (evt) =>{
      this.$removeAction = $(evt.target).data("action");
      switch (this.$removeAction) {
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
  confirmRemove($target) {
    var _this = this;
    $(".js-remove-btn").off('click').on('click', (evt) =>{
      this.removeStatus = true;
      this.el.modalConfirm.modal('hide');
      if (this.removeStatus) {
        var $parentNode = $target.parent();
        $target.remove();
        if(!$parentNode.find(".list-group-item").length){
          $parentNode.remove();

        }
        _this.isSetMenu();
      }

    });
  }

  //节点排序
  orderMenu() {
    var _this = this;
    $(".js-arrow-down").off('click').on('click', (evt) =>{
      let $action = $(evt.target).data("action");
      let $target = ($action) ? $(evt.target).closest(".list-group") : $(evt.target).closest(".list-group-item"),
      $silbings = ($action) ? $target.next(".list-group") : $target.next(".list-group-item");

      if ($silbings && $silbings.length) {
        $target.insertAfter($silbings);
      }

    });
    $(".js-arrow-up").off('click').on('click', (evt) =>{
      let $action = $(evt.target).data("action");
      let $target = ($action) ? $(evt.target).closest(".list-group") : $(evt.target).closest(".list-group-item"),
      $silbings = ($action) ? $target.prev(".list-group") : $target.prev(".list-group-item");

      if ($silbings && $silbings.length) {
        $target.insertBefore($silbings);
      }

    });
  }

  //编辑菜单文本
  editMenuText(){
    var _this = this;
    $(".js-edit-text").off('click').on('click', (evt) =>{

      var $textInput = $(evt.target).siblings(".text-edit"),
        $input = $("<input type='text'/>");
      var $text = $textInput.text();
      if($textInput.children("input").length>0 ){
        return false;
      }
      $input.width($textInput.width() + 5);
      $input.val($text);
      $textInput.html("");
      $input.appendTo($textInput).focus().select();
      $input.on("click",()=>{
        return false;
      });
      $input.on('blur',()=>{
        var inputText = ($input.val())?$input.val():$text;
        $textInput.html(inputText);
      });
      $input.on('keyup',(event)=>{
        var myEvent = event || window.event;
        var key = myEvent.keyCode;
        if(key == 13){
          var inputText = ($input.val())?$input.val():$text;
          $textInput.html(inputText);
        }
      });

    });
  }

  //是否有菜单
  isSetMenu(){
    const menuItem = $(".js-menu-item").find(".list-group");
    if(menuItem && menuItem.length){
      $(".js-setup-menu").addClass(this.className.hasItem);
    }else if(!menuItem.length) {
      $(".js-setup-menu").removeClass(this.className.hasItem);
    }
  }

  //更新菜单数据
  upDateMenuTree(){
    var _this = this;
    var arr=[];
    var menuObj = {};

    let menuArr= $(".js-menu-item").find(".list-group-first >li");

    for(let i = 0; i < menuArr.length ; i++){

      let oFirstLevel = {};
      oFirstLevel.name = $(menuArr[i]).find(".text-first").text();
      oFirstLevel.children = [];

      let menuSecond = $(menuArr[i]).find(".list-group-second >li");

      for(let j= 0; j< menuSecond.length; j++){

        let oSecondLevel = {};
        oSecondLevel.name = $(menuSecond[j]).find(".text-second").text();
        oSecondLevel.children = [];
        oFirstLevel.children.push(oSecondLevel);

        let menuThird = $(menuSecond[j]).find(".list-group-third >li");

        for(let k= 0; k< menuThird.length; k++){

          let oThirdLevel = {};
          oThirdLevel.name = $(menuThird[k]).find(".text-third").text();
          oSecondLevel.children.push(oThirdLevel);
        }
      }
      arr.push(oFirstLevel);
    }
    menuObj.menuTree = arr;
    if(arr && arr.length){
      console.log(arr);
      $(".js-tree-menu").val(JSON.stringify(menuObj));
    }

  }

  //添加滚动条
  scrollBar(){
    $(".js-menu-scroll").mCustomScrollbar({
      setHeight:300,
      theme:"blue-1"
    });
  }


}

$.mlpPlugin(AddMenu, 'AddMenu', false, false);