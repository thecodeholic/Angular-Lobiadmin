/**
 * Created by george on 4/26/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('CreateRenameDialogController', CreateRenameDialogControllerFn);

  /** @ngInject */
  function CreateRenameDialogControllerFn($log, $uibModalInstance, FileFolder) {
    var vm = this,
      randomId = Math.round(Math.random() * 1000000);

    $log.debug("Generating random ID ", randomId);

    // variables
    vm.isRename = FileFolder !== null;
    vm.currentEntry = FileFolder || {
      "id": randomId,
      "name": "",
      "type": "Folder",
      "thumb": "",
      "preview": "",
      "owner": "Public",
      "size": "",
      "tags": [],
      "date": new Date()
      };

    // Methods
    vm.ok = ok;
    vm.cancel = cancel;


    function ok() {
      $log.debug("Implement saving/updating ");
      // @todo Your code goes here
      $uibModalInstance.close(vm.currentEntry);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
