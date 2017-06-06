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
      var $el = angular.element("#" + id);
      $el.removeClass('nav-closed');
      if (asideConfig[id] !== undefined){
        $el.removeClass('nav-closed-' + asideConfig[id].direction)
      }
    }

    function close(id) {
      var $el = angular.element("#" + id);
      $el.addClass('nav-closed');
      if (asideConfig[id] !== undefined){
        $el.addClass('nav-closed-' + asideConfig[id].direction)
      }
    }

    function toggle(id) {
      var $el = angular.element("#" + id);
      $el.toggleClass('nav-closed');
      if (asideConfig[id] !== undefined){
        $el.toggleClass('nav-closed-' + asideConfig[id].direction)
      }
    }

    function setAside(id, config) {
      asideConfig[id] = config;
      var $el = angular.element("#" + id);
      $el.addClass('nav-closed');
      if (config.direction !== undefined){
        $el.addClass('nav-closed-' + config.direction + " nav-" + config.direction)
      }
      if(config.isOffCanvas === "true"){
        $el.addClass('is-off-canvas');
      }
    }
  }

  function omAsideFn(omAside) {
    return {
      restrict: 'A',
      scope: {
        direction: '@omSlideDirection',
        isOffCanvas: '@omIsOffCanvas'
      },
      link: function(scope, el){
        omAside.setAside(el.attr('id'), {direction: scope.direction, isOffCanvas: scope.isOffCanvas});
      }
    };
  }
})();
