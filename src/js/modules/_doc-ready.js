/*
  Every plugin initialization goes here.
 */

$(document).ready(function() {
  
  // $('[data-js-top-menu]').TopMenu();
  // $.TopMenuSmall();


    $('[data-js-full-page]').FullPage();
    $('[data-js-sideNav]').SideNav();
    $('[data-js-module-setup-radios]').RadioBtn(); 
    $('[data-js-checbox]').CheckBox();  
    $('[data-js-card]').CardFlip();
    $('[data-js-charts-filter]').ChartsTypeButtons();
    $('[data-js-module-data-dropdown]').ModuleDataDropDown();
    $('[data-js-popup-preview').PopUpPreview();
    if($('#loginModal').length){
        $('#loginModal').modal({backdrop:"static",show:false})
    }

    $('[data-tree-view]').TreeView();
    $('[data-add-menu]').AddMenu();
    $('.js-select-data').slick({
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        fade:true,
        nextArrow: this.$nextArrow
        prevArrow: this.$prevArrow,
    });
});