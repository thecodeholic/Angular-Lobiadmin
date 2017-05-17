(function () {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatControllerFn);

  /** @ngInject */
  function ChatControllerFn($scope, $http, Users, Chats) {
    var vm = this;
    // Data
    vm.users = Users.data;
    vm.chats = Chats.data;

    vm.selectedUser = null;
    vm.userMessages = {};

    console.log(vm.users);
    console.log(vm.chats);

    // Methods

    init();

    ///////////

    function init() {
      $scope.$watch("vm.selectedUser", function (newValue) {
        vm.userMessages = $http.get('app/main/apps/chat/data/messages/'+"9653254821"+'.json')
            .then(function (response) {
              return response.data;
            }, function (error) {
              return 'There was an error getting data' + error;
            });
        console.log(vm.userMessages);
      });
    }

  }
})();
