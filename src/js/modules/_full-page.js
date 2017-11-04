class FullPage extends MLP.apps.MLPModule {

  init() {

    this.events();
  }

  events() {
    var _this = this;
    this.fullPage();
    $("body").css("background-color", "#041e45");
    $(window).resize(function () {
      _this.fullPage();
    });
  }

  fullPage() {
    var windowHeight = $(window).height();
    var footerHeight = $('.c-footer').outerHeight();
    var headerHeight = $('.c-header').outerHeight();
    if (windowHeight <= 700) {
      $(".c-content__menu").attr("style", "");
    } else if (windowHeight > 700 && windowHeight <= 800) {
      let curHeight = 800 - footerHeight - headerHeight - 100;
      $(".c-content").height(curHeight);
      $(".c-content__menu").css({"top": "50%", "margin-top": 50 - curHeight / 2});
    } else if (windowHeight > 800 && windowHeight <= 1000) {
      let curHeight = windowHeight - footerHeight - headerHeight - 100;
      $(".c-content").height(curHeight);
      $(".c-content__menu").css({"top": "50%", "margin-top": 50 - curHeight / 2});
    }
    else if (windowHeight > 1000) {
      let curHeight = 1000 - footerHeight - headerHeight - 100;
      $(".c-content").height(curHeight);
      $(".c-content__menu").css({"top": "50%", "margin-top": 100 - curHeight / 2});
    }

  }

}

$.mlpPlugin(FullPage, 'FullPage', false, false);
