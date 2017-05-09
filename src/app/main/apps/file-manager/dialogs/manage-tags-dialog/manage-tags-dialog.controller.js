/**
 * Created by george on 4/27/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('ManageTagsController', ManageTagsControllerFn);

  /** @ngInject */
  function ManageTagsControllerFn($uibModalInstance, CurrentTags) {
    var vm = this;

    // variables
    vm.currentTags = CurrentTags || [];

    // Methods
    vm.ok = ok;
    vm.cancel = cancel;


    function ok(){
      $uibModalInstance.close(vm.currentTags);
    }

    function cancel(){
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
