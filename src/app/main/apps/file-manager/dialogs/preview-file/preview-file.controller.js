/**
 * Created by george on 4/27/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('PreviewFileController', PreviewFileControllerFn);

  /** @ngInject */
  function PreviewFileControllerFn($uibModalInstance, CurrentEntry) {
    var vm = this;

    // variables
    vm.currentEntry = CurrentEntry;

    vm.fileName = vm.currentEntry.name;
    vm.previewLink = vm.currentEntry.preview;
    vm.thumbLink = vm.currentEntry.thumb;
    vm.fileType = vm.currentEntry.type;

    // Methods
    vm.ok = ok;


    function ok(){
      $uibModalInstance.close();
    }
  }
})();
