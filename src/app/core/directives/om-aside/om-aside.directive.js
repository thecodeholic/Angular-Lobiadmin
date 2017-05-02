/**
 * Created by george on 5/2/17.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('omAsideController', omAsideControllerFn)
    .factory('omAside', omAsideFactoryFn)
    .directive('omAside', omAsideFn);

  /** @ngInject */
  function omAsideControllerFn() {

    // Data

    // Methods

    init();
    function init() {

    }
  }

  function omAsideFactoryFn() {
    var asideConfig = {};
    return {
      open: open,
      close: close,
      toggle: toggle,
      setAside: setAside
    };

    function open(id) {
      asideConfig[id] != undefined ? angular.element("#" + id).removeClass('nav-closed-' + asideConfig[id].direction) : angular.element("#" + id).removeClass('nav-closed');
    }

    function close(id) {
      asideConfig[id] != undefined ? angular.element("#" + id).addClass('nav-closed-' + asideConfig[id].direction) : angular.element("#" + id).addClass('nav-closed');
    }

    function toggle(id) {
      asideConfig[id] != undefined ? angular.element("#" + id).toggleClass('nav-closed-' + asideConfig[id].direction) : angular.element("#" + id).toggleClass('nav-closed');
    }

    function setAside(id, config) {
      asideConfig[id] = config;
      config.direction != undefined ? angular.element("#" + id).addClass('nav-closed-' + config.direction) : angular.element("#" + id).addClass('nav-closed');
    }
  }

  function omAsideFn(omAside) {
    return {
      restrict: 'A',
      scope: {
        direction: '@omSlideDirection'
      },
      link: function(scope, el){
        omAside.setAside(el.attr('id'), {direction: scope.direction});
      }
    };
  }
})();