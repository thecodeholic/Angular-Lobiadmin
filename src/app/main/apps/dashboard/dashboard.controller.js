/**
 * Created by zura on 4/11/17.
 */
(function () {
  'use strict';

  angular
      .module('app.dashboard')
      .controller('DashboardController', DashboardControllerFn);

  /** @ngInject */
  function DashboardControllerFn($filter){
      // var vm = this;

      $filter('translate')("SOME TEXT");
      // Data


      // Methods


      init();

      ///////////

      function init(){

      }
  }
})();
