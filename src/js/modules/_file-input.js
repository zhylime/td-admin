class FileInput extends MLP.apps.MLPModule {

  init() {
    super.init();

    this.el = {
      uploadFile: this.el.target.find('.js-file-input')
    };

    this.events();

  }

  events() {

    this.el.uploadFile.fileinput({
      language: 'zh',
      browseClass: "btn btn-success",
      browseLabel: "选择上传",
      showUpload: true,
      showCaption: true,
      allowedFileExtensions: ["jpg", "gif", "png", "txt"],
      previewClass: "bg-warning",
      maxFilePreviewSize: 20240,
      showUpload: false
    });
  }

}

$.mlpPlugin(FileInput, 'FileInput', false, false);
