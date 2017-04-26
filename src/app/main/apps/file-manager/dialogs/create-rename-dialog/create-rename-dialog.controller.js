/**
 * Created by george on 4/26/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('CreateRenameDialogController', CreateRenameDialogControllerFn)

  /** @ngInject */
  function CreateRenameDialogControllerFn($uibModalInstance, CurrentFolder) {
    var vm = this;

    // variables
    vm.isRename = CurrentFolder != null;
    vm.currentFolder = CurrentFolder || {};

    // Methods
    vm.ok = ok;
    vm.cancel = cancel;


    function ok(){
      $uibModalInstance.close();
    }

    function cancel(){
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
