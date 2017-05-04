/**
 * Created by george on 5/4/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('DeleteDialogController', DeleteDialogControllerFn);

  /** @ngInject */
  function DeleteDialogControllerFn($uibModalInstance, CurrentEntry) {
    var vm = this;
    // variables
    vm.currentEntry = CurrentEntry;
    // Methods
    vm.ok = ok;
    vm.cancel = cancel;


    function ok() {
      $uibModalInstance.close(CurrentEntry);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
