(function () {
  'use strict';

  angular
      .module('app.calendar')
      .controller('CalendarController', CalendarControllerFn);

  /** @ngInject */
  function CalendarControllerFn(){
    var vm = this;
    
    // Data
    vm.availableViews = ["day", "week", "month"];
    vm.currentView = "month";

    // Methods
    vm.toggleView = toggleView;

    init();

    ///////////

    function init(){

    }
    
    function toggleView(switchTo) {
      if(switchTo === vm.availableViews[0]) vm.currentView = "day";
      else if(switchTo === vm.availableViews[1]) vm.currentView = "week";
      else if(switchTo === vm.availableViews[2]) vm.currentView = "month";
    }
  }
})();
