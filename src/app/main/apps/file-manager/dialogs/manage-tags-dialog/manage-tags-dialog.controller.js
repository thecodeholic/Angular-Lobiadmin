/**
 * Created by george on 4/27/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('ManageTagsController', ManageTagsControllerFn)

  /** @ngInject */
  function ManageTagsControllerFn($uibModalInstance, CurrentEntry) {
    var vm = this;

    // variables
    vm.currentEntry = CurrentEntry || {};

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
