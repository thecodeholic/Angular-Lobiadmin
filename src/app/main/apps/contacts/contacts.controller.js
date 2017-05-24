(function () {
  'use strict';

  angular
    .module('app.contacts')
    .controller('ContactsController', ContactsControllerFn);

  /** @ngInject */
  function ContactsControllerFn($scope, $http, Contacts) {
    var vm = this;

    // Data
    vm.contacts = Contacts.data;
    vm.chunkedContacts = null;

    // Methods
    vm.chunkArray = chunkArray;


    init();

    ///////////

    function init() {
      vm.chunkedContacts = vm.chunkArray(vm.contacts, 4);

      /* $scope.$watch('chunkedData', function(val) {
        $scope.data = [].concat.apply([], val);
      }, true); // watch on contact add or remove */
    }

    function chunkArray(arr, len) {
      var result = [];
      for (var i = 0; i < arr.length; i += len) {
        result.push(arr.slice(i, i + len));
      }
      return result;
    }
  }
})();
