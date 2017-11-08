
class Validator extends MLP.apps.MLPModule {


  init() {
    super.init();
    this.sel.errorMsg = ".input-error-message";
    this.sel.callback = this.el.target.attr('data-callback');
    this.events();
  }

  events(){

    $('.js-form-submit').on("click" , evt => {
      if(!this.validate()) {
        var errInfoPostion = this.getPostion();
        if(errInfoPostion){
          $('html, body').animate({
            scrollTop: errInfoPostion - 100
          });
        }
        return false;
      }

      return false;
    });

  }

  validate() {
    var _isPassed, _this;
    this.hideErrorMsg();
    _isPassed = true;
    _this = this;
    $(this.el.target.context).find(" :input").each( (index , item)=> {
      var _rulesSplit;
      if($(item).is(":visible") || $(item).data("js-visible")){
        var _rules = $(item).data('rule');
        if(_rules){
          _rulesSplit = _rules.split("|");
          $.each(_rulesSplit, (index, rule) =>{
            if(!this.isRulePassed($(item), rule)){
              $(item).siblings('.input-error-message').removeClass('hide');
              $(item).parent().siblings('.input-error-message').removeClass('hide');
              _isPassed = false;
            }
          });
        }
      }
    });
    return _isPassed;
  }

  isRulePassed(_this, rule){
    var _isValid = true , number;
    var splitRule = rule.split(':');
    if(splitRule[0] == 'max' || splitRule[0] == 'min'){
      rule = splitRule[0];
      number = splitRule[1];
    }

    switch(rule){
      case 'required':
        if (_this.attr('type') == 'checkbox') {
          if (!_this.is(':checked')) {
            _isValid = false;
          }
        } else {
          if ($.trim(_this.val()).length === 0) {
            _isValid = false;
          }
        }
        break;

      case 'max':
        if ($.trim(_this.val()).length > number) {
          _isValid = false;
        }
        break;
      case 'max':
        if ($.trim(_this.val()).length > number) {
          _isValid = false;
        }
        break;
      case 'min':
        if ($.trim(_this.val()).length < number) {
          _isValid = false;
        }
        break;
      case 'noZZOnBeginning':
        if (_this.val().toLowerCase().substr(0, 2) === 'zz') {
          _isValid = false;
        }
        break;
      case 'firstThreeNoRepeat':
        var pattern = /([a-zA-Z0-3])\1{2,}/;
        if (pattern.test(_this.val())) {
          _isValid = false;
        }
        break;
      case 'alpha':
        var pattern = /[0-9~`!@#\$\%\^&*()_+,\.\/\;\'[\]\\<>\?\:\"\{\}\|～！@＃¥％……&＊（）＋——－＝、］［｛｝｜‘；：“／。，《》？]/i;
        if (pattern.test(_this.val())) {
          _isValid = false;
        }
        break;
      case 'email':
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (!pattern.test(_this.val())) {
          _isValid = false;
        }
        break;
      case 'mobile':
        var pattern = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
        if (!pattern.test(_this.val())) {
          _isValid = false;
        }
    }

    return _isValid;
  }

  hideErrorMsg(){
    $(this.sel.errorMsg).addClass('hide');
  }


  getPostion(){
    for(var i=0; i<$(".input-error-message").length ; i++ ){
      if($(".input-error-message").eq(i).is(":visible")){
        return $(".input-error-message").eq(i).offset().top;
      }
    }
  }


}

$.mlpPlugin(Validator, 'Validator', false, false);
