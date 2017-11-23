
class CardFlip extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el ={
        gridContainer: $('[data-js-card]'),
        cardItems: this.el.target.find('.js-card'),
        cardSide: this.el.target.find('.card-side'),
        previewBtn: this.el.target.find('.button-preview'),
        createModule: this.el.target.find('.button-create'),
        remove: this.el.target.find('.button-remove'),
      }

    this.cardFront;
    this.cardBack;
    this.speed = 225;
    // this.enableFlip = true;

    this.events();
  }

  events(){
    var _this = this;

    setTimeout(function(){
      _this.el.gridContainer.css('opacity','1')
    },260);

    this.el.previewBtn.each(function(e){
      $(this).on('click', function(evt){
        evt.stopPropagation()
      })
    })
    this.el.createModule.each(function(e){
      $(this).on('click', function(evt){
        evt.stopPropagation()
      })
    })
    this.el.remove.each(function(e){
      $(this).on('click', function(evt){
        evt.stopPropagation();
        $(this).parents('.js-card').remove();
      })
    })
    // this.initCardSide();
    // this.el.cardItems.each(function(){

    //   $(this).on('click', function(e){
        
    //     if($(this).find('.card-side').hasClass('card-front')){
    //       _this.cardFront = $(this).find('.card-front');
    //       // console.log(_this.cardFront);
    //       setTimeout(function(){
    //         _this.cardFront.addClass('card-back').removeClass('card-front');
    //       })
          
    //     }
    //     if($(this).find('.card-side').hasClass('card-back')){
    //       _this.cardBack = $(this).find('.card-back');
    //       setTimeout(function(){
    //         _this.cardBack.addClass('card-front').removeClass('card-back');
    //       })
          
    //     }
    //   });
    // })

    $(document).on('click', '.js-card', function(e){
      var _target = $(e.target).parents('.js-card');
      if(_target.length>0){
        _this.playCard(_target);
      }
    });


    

  }

  playCard(obj){
    var _this = this;
   if($(obj).find('.card-side').hasClass('card-front')){
      _this.cardFront = $(obj).find('.card-front');
      setTimeout(function(){
        _this.cardFront.addClass('card-back').removeClass('card-front');
      })
      
    }
    if($(obj).find('.card-side').hasClass('card-back')){
      _this.cardBack = $(obj).find('.card-back');
      setTimeout(function(){
        _this.cardBack.addClass('card-front').removeClass('card-back');
      })
      
    }
  }



}

$.mlpPlugin(CardFlip, 'CardFlip', false, false);
