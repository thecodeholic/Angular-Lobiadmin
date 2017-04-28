/**
 * Created by george on 4/26/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('CreateRenameDialogController', CreateRenameDialogControllerFn);

  /** @ngInject */
  function CreateRenameDialogControllerFn($uibModalInstance, CurrentEntry) {
    var vm = this;

    // variables
    vm.isRename = CurrentEntry != null;
    vm.currentEntry = CurrentEntry || {};

    // Methods
    vm.ok = ok;
    vm.cancel = cancel;


    function ok(){
      console.log(vm.currentEntry.name);
      $uibModalInstance.close();
    }

    function cancel(){
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
