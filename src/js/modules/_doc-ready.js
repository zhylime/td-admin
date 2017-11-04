/*
  Every plugin initialization goes here.
 */

$(document).ready(function() {
  
  // $('[data-js-top-menu]').TopMenu();
  // $.TopMenuSmall();


    $('[data-js-full-page]').FullPage();
    $('[data-js-sideNav]').SideNav();
    $('[data-js-module-setup-radios]').RadioBtn(); 
    $('[data-js-card]').CardFlip();
    if($('#loginModal').length){
        $('#loginModal').modal({backdrop:"static",show:false})
    }

    $('[data-tree-view]').TreeView();
    $('[data-add-menu]').AddMenu();

});