/**
 * Created by zura on 9/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.pages.errors.error')
    .controller('ErrorController', ErrorController);

  /** @ngInject */
  function ErrorController($rootScope, $stateParams) {
    var vm = this;

    // Data
    vm.code = $stateParams.code;
    $rootScope.pageTitle = "Error " + vm.code;
    vm.subTitle = $stateParams.subtitle;
    vm.body = $stateParams.body;

    // Methods


    init();

    ///////////

    function init() {

    }

  }
})();
