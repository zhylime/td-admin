
class TabSwitch extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el = {
      tabNavs: $('.js-tab-nav ul li'),
      tabContents: $('.js-tab-content > div'),
    };

    this.events();
  }

  events(){
    var _this = this;
    var tabLength = this.el.tabNavs.length;

    for(var i = 0; i < tabLength; i++) {
      (function(i) {
        $(_this.el.tabNavs[i]).on("click", function() {
          $(_this.el.tabNavs).removeClass(_this.classes.active);
          $(this).addClass(_this.classes.active);
          $(_this.el.tabContents).hide();
          $(_this.el.tabContents[i]).show();
        })
      })(i)
    }
  }

}

$.mlpPlugin(TabSwitch, 'TabSwitch', false, false);
