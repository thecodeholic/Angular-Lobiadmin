/**
 * Created by george on 4/26/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('CreateRenameDialogController', CreateRenameDialogControllerFn);

  /** @ngInject */
  function CreateRenameDialogControllerFn($uibModalInstance, CurrentEntry, FileId) {
    var vm = this;
    // variables
    vm.isRename = CurrentEntry != null;
    vm.currentEntry = CurrentEntry || {
      "id": FileId,
      "icon": "<i class='fa fa-folder-open' aria-hidden='true'></i>",
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
      $uibModalInstance.close(vm.currentEntry);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
