/**
 * Created by george on 4/27/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('ManageTagsController', ManageTagsControllerFn);

  /** @ngInject */
  function ManageTagsControllerFn($uibModalInstance, FileFolder) {
    var vm = this;

    // variables
    vm.currentFileFolder = angular.copy(FileFolder);
    vm.currentFileFolder.tags = vm.currentFileFolder.tags || [];


    // Methods
    vm.ok = ok;
    vm.cancel = cancel;


    function ok(){
      var tags = vm.currentFileFolder.tags;
      if (tags.length === 1 && !tags[0]){
        tags = [];
      }
      $uibModalInstance.close(tags);
    }

    function cancel(){
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
