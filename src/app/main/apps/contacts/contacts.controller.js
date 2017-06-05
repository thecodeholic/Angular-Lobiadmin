(function () {
  'use strict';

  angular
    .module('app.contacts')
    .controller('ContactsController', ContactsControllerFn);

  /** @ngInject */
  function ContactsControllerFn($scope, $http, Contacts, $timeout) {
    var vm = this;

    // Data
    vm.contacts = Contacts.data;
    vm.searchContactsResult = angular.copy(vm.contacts);
    vm.chunkedContacts = null;
    vm.alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    vm.filterBy = '#';

    // Methods
    vm.chunkArray = chunkArray;
    vm.searchContacts = searchContacts;
    vm.deleteContact = deleteContact;


    init();

    ///////////

    function init() {
      vm.chunkedContacts = vm.chunkArray(vm.contacts, 4);

      /*$scope.$watch("vm.contacts", function (newValue) {
        vm.chunkedContacts = vm.chunkArray(newValue, 4);
      });*/

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

    function searchContacts(by) {
      vm.filterBy = by;
      vm.searchContactsResult = [];
      for (var i = 0; i < vm.contacts.length; i++) {
        if (vm.contacts[i].name[0] == by || vm.contacts[i].name[vm.contacts[i].name.indexOf(' ') + 1] == by) {

          console.log(vm.contacts[i].name[0], vm.contacts[i].name[vm.contacts[i].name.indexOf(' ') + 1], vm.contacts[i]);

          vm.searchContactsResult.push(vm.contacts[i]);
        }
      }
    }

    function deleteContact(id) {
      var conId = -1;
      for(var i = 0; i < vm.contacts.length; i++){
        if(vm.contacts[i].id == id) conId = i;
      }

      var del = Lobibox.confirm({
        title: "Delete Contact ?",
        msg: "Delete '"+vm.contacts[conId].name+"' (id: " + vm.contacts[conId].id + ") ?",
        callback: function ($this, type, ev) {
          if(type == "yes"){
            if(conId > -1) {
              angular.element("."+id).addClass('shrinkToZero');
              $timeout(function () {
                vm.contacts.splice(conId, 1);
                vm.chunkedContacts = vm.chunkArray(vm.contacts, 4);
                vm.searchContacts(vm.filterBy);
                console.log(vm.contacts, vm.chunkedContacts);
                $scope.$apply();
              },1000);
            }
          }
        }
      });
      del.show();
    }
  }
})();
