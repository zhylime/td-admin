class AddMenu extends MLP.apps.MLPModule {

    init() {
        super.init();
        this.el ={
            addItem: this.el.target.find('.js-add-menu'),
            menuItem: this.el.target.find('.js-menu-item'),
            confirmBtn: this.el.target.find('.js-save-item'),
            modalItem: this.el.target.find('.js-menu-modal'),
            showModal: this.el.target.find('.js-open-modal'),
            removeBtn: this.el.target.find(".js-remove-btn"),
            modalConfirm: this.el.target.find(".js-confirm-modal")
        }
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
        this.el.confirmBtn.off('click').on('click', (evt)=>{

            let _this = this , nodeIndex;
            switch(this.$action)
            {
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
            if($itemName && $itemName.length >= 2 && $itemName.length <= 10){
                this.el.modalItem.modal('hide');
                $errorMessage.addClass('hide');
                _this.updateMenu($itemName, nodeIndex , _this.target);
            }else {
                $errorMessage.removeClass('hide');
            }

        });

    }
    //更新菜单内容
    updateMenu(itemName , index , curTarget){
        let nodeIndex ,$item , _this = this;
        let $target = curTarget.parent();
        let $firstTarget = $target.parent();

        switch(index)
        {
            case 0:
                nodeIndex = "node-first";
                $item = "<ul class='list-group'>" +
                    "<li class='list-group-item "+ nodeIndex +"' data-index = '"+ index +"'>" +
                    "<span class='icon expand-icon ion-arrow-down-b'></span><span class='icon node-icon'></span>" + itemName +"" +
                    "<span class='ion ion-code node-first'></span><span class='ion ion-close js-remove-node' data-action='removeALL'></span>" +
                    "<span class='ion ion-android-create'></span><span class='ion ion-plus-round js-open-modal'  data-action='addSecond'></span>" +
                    "</li></ul>";
                $(this.el.menuItem).append($item);
                _this.openModal();
                _this.removeNode();
                break;
            case 1:
                nodeIndex = "node-second";
                $item = "<ul class='list-group-second'><li class='list-group-item "+ nodeIndex +"' data-index = '"+ index +"'>" +
                    "<span class='icon expand-icon ion-arrow-down-b'></span><span class='icon node-icon'></span>" + itemName +"" +
                    "<span class='ion ion-code'></span><span class='ion ion-close js-remove-node' data-action='removeSecond'></span>" +
                    "<span class='ion ion-android-create'></span><span class='ion ion-plus-round js-open-modal'  data-action='addThird'></span>" +
                    "</li></ul>";
                $firstTarget.append($item);
                _this.openModal();
                _this.removeNode();
                break;
            default:
                nodeIndex = "node-third";
                $item = "<ul class='list-group-third'><li class='list-group-item "+ nodeIndex +"' data-index = '"+ index +"'>" +
                    "<span class='icon glyphicon'></span><span class='icon node-icon ion-stop'></span>" + itemName +"" +
                    "<span class='ion ion-code'></span><span class='ion ion-close js-remove-node' data-action='removeThird'></span>" +
                    "<span class='ion ion-android-create'></span>" +
                    "</li></ul>";
                $target.after($item);
                _this.openModal();
                _this.removeNode();
        }


    }

    openModal(){
        $(".js-open-modal").on('click', (evt)=>{
            this.target = $(evt.target);
            this.$action = $(evt.target).data("action");
            this.el.modalItem.modal('show');
        });
    }

    removeNode(){
        var _this = this;
        this.removeStatus = false;
        $(".js-remove-node").on('click', (evt)=>{
            this.$removeAction = $(evt.target).data("action");
            switch (this.$removeAction){
                case "removeThird":
                    $(evt.target).parent().remove();
                    break;
                default:
                    $(".js-confirm-modal").modal("show");
                    _this.confirmRemove($(evt.target).parent().parent())
                    break;
            }
            console.log("remove");

        });
    }

    confirmRemove($target){
        $(".js-remove-btn").off('click').on('click', (evt)=>{
            this.removeStatus = true;
            this.el.modalConfirm.modal('hide');
            if(this.removeStatus){
                $target.remove();
                if(this.$removeAction == "removeSecond"){
                    console.log($target.siblings(".node-third"));
                }
            }

        });
    }

}

$.mlpPlugin(AddMenu, 'AddMenu', false, false);
