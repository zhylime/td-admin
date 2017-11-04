

class PopUpPreview extends MLP.apps.MLPModule {

    init() {
      super.init();
      this.el ={
        previewBtns: this.el.target.find('.button-preview'),
        
      }
  
      this.events();
    }

    events(){
        var _this = this;
        
        this.el.previewBtns.each(function(){
          $(this).on('click', function(){
            $('.js-popup-preview').show();
            $('.js-popup-cover').show();

          });
        });

        $('.js-close-popup-preview').on('click', function(){
          $('.js-popup-preview').hide();
            $('.js-popup-cover').hide();
        })

      
 
    }

 


      

   

}

$.mlpPlugin(PopUpPreview, 'PopUpPreview', false, false);
