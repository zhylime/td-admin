class Slick extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el = {
      slickOpt: this.el.target.find('.js-select-data'),
      slickBtn: this.el.target.find('.js-select-info'),
      prev: this.el.target.find('.slick-btn-prev'),
      next: this.el.target.find('.slick-btn-next'),
      prevBtn: this.el.target.find('.slick-info-prev'),
      nextBtn: this.el.target.find('.slick-info-next'),
      closeBtn: this.el.target.find('.js-remove-detail'),
      detail: this.el.target.find(".c-module-slick-detail"),
    }
    this.className = {
      active: "active"
    }

    this.events();
  }

  events() {
    var _this = this;

    this.el.slickOpt.slick({
      slide:"li",
      fade:true,
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      draggable: false,
      nextArrow: this.el.prev,
      prevArrow: this.el.next
    });

    this.el.slickBtn.slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      nextArrow: this.el.prevBtn,
      prevArrow: this.el.nextBtn
    });


    this.el.closeBtn.off("click").on("click",(evt)=>{
      $(evt.target).parent().remove();
    });

    this.el.detail.off("click").on("click",(evt)=>{
      const $target = $(evt.target).closest(".c-module-slick-detail");
      if($target.hasClass(_this.className.active)){
        $target.removeClass(_this.className.active);
      }else {
        $target.addClass(_this.className.active);
      }
    });
  }


}

$.mlpPlugin(Slick, 'Slick', false, false);
