
// 业务表单 - 下拉菜单
class CustomDropDown extends MLP.apps.MLPModule {

    init() {
      super.init();
      this.el ={
        dropDownBtn: this.el.target.find('.js-dropdown-btn'),
        dropDownList: this.el.target.find('.js-dropdown-list'),
        dropDownSubList : this.el.target.find('.jd-dropdown-sub-list'),
        dropDownItem: this.el.target.find('.js-dropdown-item'),
      }
  
      this.events();
    }

    events(){
        var _this = this;
        
        this.setIcons();

        this.el.dropDownBtn.on('click', function(){
          $(this).toggleClass('active');
          _this.el.dropDownList.toggleClass('active').toggleClass('hide');
          if(!$(this).hasClass('active')){
            _this.resetSubList();
          }
          
        });


        this.el.dropDownItem.on('click', function(){
          if($(this).next().hasClass('jd-dropdown-sub-list')){
            var _left = $(this).parent().parent().outerWidth(),
                _top = $(this).position().top;
            // $(_this.el.dropDownItem).removeClass('active');
            _this.resetSubList();
            console.log($(this).parents('.jd-dropdown-sub-list').prev().hasClass('js-dropdown-item'));
            if($(this).parents('.jd-dropdown-sub-list').prev().hasClass('js-dropdown-item') > 0){
              $(this).parents('.jd-dropdown-sub-list').prev().toggleClass('active');
            }
            $(this).parents('.jd-dropdown-sub-list').toggleClass('hide');
            $(this).toggleClass('active');
            $(this).next().toggleClass('hide');
    
            $(this).next().css({
              left: _left,
              top: _top
            })
          }
        });

        // this.el.dropDownList.on('mouseleave', function(){
        //   $(_this.el.dropDownBtn).trigger('click');
        // })



 
    }

    setIcons(){
      this.el.dropDownItem.each(function(){
        // 如果没有子菜单，隐藏icon
        if($(this).parent().find('ul').length<=0){
          $(this).find('.icon-dropdown-arrow').addClass('hide');
        }
      })
    }
    // 清除所有展开状态
    resetSubList(){
      var _this = this;
      this.el.dropDownSubList.each(function(){
        $(this).addClass('hide');
      });
      this.el.dropDownItem.each(function(){
        $(this).removeClass('active');
      })

    }

 


      

   

}

$.mlpPlugin(CustomDropDown, 'CustomDropDown', false, false);
