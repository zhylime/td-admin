class Slick extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el = {
      slickOpt: this.el.target.find('.js-select-data'),
      prev: this.el.target.find('.slick-prev'),
      next: this.el.target.find('.slick-next')
    }

    this.events();
  }

  events() {
    this.el.slickOpt.slick({
      centerMode: false,
      infinite: true,
      fade: true,
      nextArrow: this.el.prev,
      prevArrow: this.el.next,
    });

  }


}

$.mlpPlugin(Slick, 'Slick', false, false);
