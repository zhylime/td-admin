

class CheckBox extends MLP.apps.MLPModule {

    init() {
      super.init();
      this.el ={
        checkBox: this.el.target.find('[type="checkbox"]'),
      }
  
      this.events();
    }

    events(){
        var _this = this;
        
        this.el.checkBox.each(function(){
          $(this).on('click', function(){

            $(this).parent().toggleClass('active');
          });
        });

      
 
    }

 


      

   

}

$.mlpPlugin(CheckBox, 'CheckBox', false, false);
