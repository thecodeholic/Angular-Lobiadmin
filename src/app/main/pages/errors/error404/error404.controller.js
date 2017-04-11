/**
 * Created by zura on 9/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.pages.errors.error404')
    .controller('Error404Controller', Error404Controller);

  /** @ngInject */
  function Error404Controller($rootScope) {

    // Data
    $rootScope.pageTitle = "Error 404. Page not found";

    // Methods


    init();

    ///////////

    function init() {

    }

  }
})();
