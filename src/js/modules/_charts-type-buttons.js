
class ChartsTypeButtons extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el ={
        buttons: this.el.target.find('[data-group-id]'),
       
      }


    this.events();
  }

  events(){
    var _this = this;

    this.el.buttons.each(function(){
      $(this).on('click', function(){
        var id = $(this).attr('data-group-id');
        $('.filter-group').hide();
        $('#' + id).show();
      })
    });

    $('.filter-item').on('click', function(){
      $(this).toggleClass('active');
    })





   
  }

}

$.mlpPlugin(ChartsTypeButtons, 'ChartsTypeButtons', false, false);
