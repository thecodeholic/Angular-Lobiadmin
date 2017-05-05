/**
 * Created by zura on 5/2/17.
 */
(function () {
  'use strict';

  angular
    .module('app.pages.auth')
    .controller('AuthController', AuthControllerFn);

  /** @ngInject */
  function AuthControllerFn($scope) {
    // var vm = this;

    // Data


    // Methods


    init();

    ///////////

    function init() {
      // Remove the splash screen
      $scope.$on('$viewContentAnimationEnded', function (event) {
        if (event.targetScope.$id === $scope.$id) {
          angular.element('#page-preloader').remove();
        }
      });
    }
  }
})();
