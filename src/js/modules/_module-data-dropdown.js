

class ModuleDataDropDown extends MLP.apps.MLPModule {

    init() {
      super.init();
      this.el ={
        dropdownBtn: this.el.target.find('.js-module-data-dropdown'),
      }
  
      this.events();
    }

    events(){
        var _this = this;
        
        this.el.dropdownBtn.each(function(){
          $(this).on('click', function(){
            var ifActive = $(this).hasClass('active');

            // $(_this.el.dropdownBtn).removeClass('active');
            if(!ifActive){
              $(this).addClass('active');
            }
            else{
              $(this).removeClass('active');
            }
            $(this).parent().next().toggleClass('hide');
          });
        });

      
 
    }

 


      

   

}

$.mlpPlugin(ModuleDataDropDown, 'ModuleDataDropDown', false, false);
