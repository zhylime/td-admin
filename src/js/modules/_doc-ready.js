/*
  Every plugin initialization goes here.
 */

$(document).ready(function() {
  
  // $('[data-js-top-menu]').TopMenu();
  // $.TopMenuSmall();


    $('[data-js-full-page]').FullPage();

    if($('#loginModal').length){
        $('#loginModal').modal({backdrop:"static",show:false})
    }


});