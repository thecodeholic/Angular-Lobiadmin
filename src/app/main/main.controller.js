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
    var vm = this;

    // Variables
    vm.contacts = [
      {
        name:"Jane Doe",
        status:"online",
        thumb:"http://altair_app.tzdthemes.com/assets/img/avatars/avatar_11_tn.png",
        unread: 14
      },
      {
        name:"George Batiashvili",
        status:"offline",
        thumb:"https://avatars1.githubusercontent.com/u/14313425?v=3&s=40",
        unread: 0
      },
      {
        name:"Zura Sekhniashvili",
        status:"busy",
        thumb:"https://avatars2.githubusercontent.com/u/4627922?v=3&s=40",
        unread: 3
      },
      {
        name:"Nick Doe",
        status:"online",
        thumb:"http://altair_app.tzdthemes.com/assets/img/avatars/avatar_05_tn.png",
        unread: 0
      }
    ];

    // Methods
    vm.AAA = AAA;

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

    function AAA() {
      console.log("AAA");
    }

  }
})();
