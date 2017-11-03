
class CardFlip extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el ={
        cardItems: this.el.target.find('.js-card'),
        cardSide: this.el.target.find('.card-side'),
      }

    this.cardFront;
    this.cardBack;
    this.speed = 225;

    this.events();
  }

  events(){
    var _this = this;

    // this.initCardSide();
    this.el.cardItems.each(function(){
      $(this).on('click', function(){

        // console.log($(this).find('.card-side').hasClass('card-front'));
        // console.log($(this).find('.card-side').hasClass('card-back'));
        if($(this).find('.card-side').hasClass('card-front')){
          _this.cardFront = $(this).find('.card-front');
          // console.log(_this.cardFront);
          setTimeout(function(){
            _this.cardFront.addClass('card-back').removeClass('card-front');
          })
          
        }
        if($(this).find('.card-side').hasClass('card-back')){
          _this.cardBack = $(this).find('.card-back');
          setTimeout(function(){
            _this.cardBack.addClass('card-front').removeClass('card-back');
          })
          
        }
    


      })
    })
    // this.el.cardItems.on('click', function(){
    //   _this.cardFront.addClass('card-back').removeClass('card-front');
    //   setTimeout(function(){
    //     _this.cardBack.addClass('card-front').removeClass('card-back');
    //     _this.initCardSide()
    //   });
    // })
  }

  // initCardSide(){
  //   var _this = this;
  //   this.el.cardSide.each(function(){
  //     if($(this).hasClass('card-front')){
  //       _this.cardFront = $(this);
  //     }
  //     else{
  //       _this.cardBack = $(this);
  //     }
  //   });
  // }

}

$.mlpPlugin(CardFlip, 'CardFlip', false, false);
