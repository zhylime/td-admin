
class ModuleEdit extends MLP.apps.MLPModule {

  init() {
    super.init();


    this.events();
  }

  events(){

  }

}

$.mlpPlugin(ModuleEdit, 'ModuleEdit', false, false);
