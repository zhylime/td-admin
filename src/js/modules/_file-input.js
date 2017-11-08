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
      allowedFileExtensions: ["jpg", "gif", "png", "txt"],
      previewClass: "bg-warning",
      maxFilePreviewSize: 20240
    });
  }

}

$.mlpPlugin(FileInput, 'FileInput', false, false);
