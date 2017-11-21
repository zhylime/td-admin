
// 业务表单 - 瀑布流 + 点击popup
class MasonryLayout extends MLP.apps.MLPModule {

    init() {
      super.init();
      this.el ={
        gridContainer: this.el.target.find('.masonry'),
        gridItem : this.el.target.find('.grid-item'),
        previewBtn : this.el.target.find('.js-open-modal-charts-preview'),
        pager: $('#chartsPager'),
      }

      this.removedItem;
  
      this.events();
    }

    events(){
        var _this = this;
        this.layout();
        this.highlightItem();
        this.popup();
        this.removeItem();
        
    

 
    }

    layout(){
      this.el.gridContainer.masonry({
        itemSelector: '.box',
        // columnWidth: 260,
        // isFitWidth:true,
        gutter: 20,
        // isAnimated: true
      })
    }
    highlightItem(){
      var _this = this;
      this.el.gridItem.each(function(){
        $(this).on('click', function(e){
         
          _this.el.gridItem.removeClass('active');
          $(this).addClass('active');
        })
      })
    }
    popup(){
      var _this = this;

      this.el.previewBtn.on('click', function(e){
        e.stopPropagation();
        var id=$(this).attr('data-target');
        $(id).modal('show');
        _this.previewPager();
      
      })

    }

    previewPager(){
      $(this.el.pager).pager({
        buttonClickCallback: function(pagenumber, pagecount, buttonClickCallback){

        }
      })
    }

    removeItem(){
      var _this = this;
      $(document).on('click', '.js-remove-chart-item', function(e){
        e.stopPropagation();
        _this.removedItem = $(e.target).parents('.grid-item');
        // $(e.target).parents('.grid-item').remove();
         // $(_this.el.gridContainer).masonry('layout');
         var id = $(this).attr('data-target');
         $(id).modal('show');

         $(id).find('.js-remove-btn').unbind('click').on('click', function(){
           $(_this.removedItem).remove();
           $(_this.el.gridContainer).masonry('layout');
           $(id).find('.close').trigger('click');
         });
      })
    }

    
   

 


      

   

}

$.mlpPlugin(MasonryLayout, 'MasonryLayout', false, false);
