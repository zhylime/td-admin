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
    $('[data-js-popup-preview]').PopUpPreview();
    if($('.modal').length){
        $('.modal').modal({backdrop:"static",show:false})
    }
    //select
    $('.js-select-fancy').selectpicker();
    $('[data-tree-view]').TreeView();
    $('[data-add-menu]').AddMenu();
    $('[data-slick-detail]').Slick();

    // 业务表单 - 下拉菜单
    $('[data-js-dropdown]').CustomDropDown();

    //form validator
    $('[data-js-form-validator]').Validator();

    //file upload
    $('[data-js-file-input]').FileInput();
});