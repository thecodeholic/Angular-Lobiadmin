(function () {
  'use strict';

  angular
    .module('app.pages.auth.login')
    .controller('LoginController', LoginControllerFn);

  /** @ngInject */
  function LoginControllerFn(Auth, $state) {
    var vm = this;

    // Data
    vm.showForm = 'login';
    vm.data = {};


    // Methods
    vm.login = login;


    init();

    ///////////

    function init() {

    }

    function login() {
      Auth
        .login(vm.data)

        .then(function (result) {
          if (result.success){
            $state.go(Auth.mainState)
          }
        });
    }
  }
})();
