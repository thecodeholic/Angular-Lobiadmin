/**
 * Created by zura on 9/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.pages.errors.error401')
    .controller('Error401Controller', Error401Controller);

  /** @ngInject */
  function Error401Controller($rootScope) {

    // Data
    $rootScope.pageTitle = "Error 401. Unauthorized";

    // Methods


    init();

    ///////////

    function init() {

    }

  }
})();
