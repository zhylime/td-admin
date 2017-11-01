

class SideNav extends MLP.apps.MLPModule {

    init() {
      super.init();
      this.el ={
        extendableItems: this.el.target.find('[data-expanded] > span'),
        clickableItems: this.el.target.find('[data-expanded] a'),
        sideNav: $('[data-js-sidenav]'),
        tabContent: $('#mainFrameTabs'),
        arrow: this.el.target.find('.js-arrow'),

      }
      this.events();
    }

    events(){
        var _this = this;
        
        this.initSideNav();
        this.setHeight();



       


        
    }
    initSideNav(){
      var _this = this;



      this.el.extendableItems.each(function(){
        $(this).on('click', function(){
          var status = $(_this.el.arrow).attr('data-status');
          if(status == 'open'){
            var toggleExpand = $(this).parent().attr('data-expanded') == 'true' ? 'false' : 'true';
            $(this).parent().attr('data-expanded', toggleExpand);
          }
          else{
            $(_this.el.arrow).trigger('click');
          }
          
          
        })
      });

      this.el.clickableItems.each(function(){
        $(this).on('click', function(){
          _this.setHeight();
        });
      });


      this.el.arrow.on('click', function(){
        var status = $(this).attr('data-status') == 'open' ? 'close' : 'open';
        $(_this.el.arrow).attr('data-status', status);
        $(_this.el.sideNav).attr('data-status', status);
      });
    }

    setHeight(){
      var _this = this;
      var tabContentheight = this.el.tabContent.height();
      var sideNavHeight = this.el.sideNav.height();
      if(sideNavHeight < tabContentheight){
        _this.el.sideNav.height(tabContentheight);
      }
      
    }
   

}

$.mlpPlugin(SideNav, 'SideNav', false, false);