class FileInput extends MLP.apps.MLPModule {

  init() {
    super.init();

    this.el = {
      uploadFile: this.el.target.find('.js-file-input')
    };

    this.events();

  }

  events() {

    $("#fileUpload").fileinput({
      language: 'zh',
      theme: 'fa',
      browseClass: "btn btn-success",
      browseLabel: "选择上传",
      showUpload: true,
      showCaption: true,
      allowedFileExtensions: ["jpg", "gif", "png"],
      previewClass: "bg-warning",
      maxFilePreviewSize: 20240,
      showUpload: false
    });
    
  }

}

$.mlpPlugin(FileInput, 'FileInput', false, false);
