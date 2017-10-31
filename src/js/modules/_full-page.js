

class FullPage extends MLP.apps.MLPModule {

    init() {

      this.events();
    }

    events(){
        var _this = this;
        this.fullPage();
        $("body").css("background-color","#041e45");
        $(window).resize(function(){
            _this.fullPage();
        });
    }
    fullPage(){
        var windowHeight = $(window).height();
        var footerHeight = $('.c-footer').outerHeight();
        var headerHeight = $('.c-header').outerHeight();
        if(windowHeight <= 1000){
          $(".c-content").height(windowHeight-footerHeight-headerHeight-100);
        }else if(windowHeight > 1000){
          $(".c-content").height(1000-footerHeight-headerHeight-100);
        }

    }

}

$.mlpPlugin(FullPage, 'FullPage', false, false);
