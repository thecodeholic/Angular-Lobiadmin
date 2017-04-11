/**
 * Created by zura on 11/13/2016.
 */
(function () {
  'use strict';

  angular
    .module('angularLobiadmin')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {

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
