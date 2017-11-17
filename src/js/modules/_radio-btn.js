

class RadioBtn extends MLP.apps.MLPModule {

    init() {
      super.init();
      this.el ={
        radioItems: this.el.target.find('.js-radio-item'),
      }
  
      this.events();
    }

    events(){
        var _this = this;
        
        this.el.radioItems.each(function(){
          $(this).on('click', function(){
            var isActive = $(this).hasClass('active');
            if(isActive){
              return;
            }
            else{
              _this.el.radioItems.removeClass('active');
              $(this).addClass('active');
            }
          });
        });

        // console.log(this.setupRadio);
        if($('.js-radio-images').length>0){
          _this.radioImages();
        }
 
    }

    radioImages(){
      var _this = this;
      this.el.radioItems.each(function(){
        $(this).on('click', function(){

          var id = $(this).attr('data-image');
          console.log(id);
          $('.js-radio-images img').removeClass('active');
          $('.js-add-menu-info').removeClass('active');
          $('img#' + id).addClass('active');
          $('#'+id).addClass('active');
        });
      });
    }
 


      

   

}

$.mlpPlugin(RadioBtn, 'RadioBtn', false, false);
