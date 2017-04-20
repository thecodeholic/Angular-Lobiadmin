(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('FileManagerController', FileManagerControllerFn)
    .directive('ngRightClick', function ($parse) {
      return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
          scope.$apply(function () {
            event.preventDefault();
            fn(scope, {$event: event});
          });
        });
      };
    });

  /** @ngInject */
  function FileManagerControllerFn() {
    var vm = this;

    vm.currentView = 'list-condensed';
    vm.orderByField = 'name';
    vm.reverseSort = false;
    vm.selectedFile = null;
    vm.openContext = null;

    // Methods
    vm.toggleView = function () {
      if (vm.currentView === 'list-condensed') {
        vm.currentView = 'grid-view';
      } else if (vm.currentView === 'grid-view') {
        vm.currentView = 'list-condensed';
      }
    }

    vm.selectFile = function (x) {
      vm.selectedFile = x;
      console.log(vm.selectedFile);
    };
    vm.openMenu = function (event, x) {
      vm.openContext = x;
      console.log(event);
      vm.myPos = { left: event.pageX - (event.screenX-event.pageX), top: event.pageY - (event.screenY-event.pageY)};
    };
    vm.resetSelection = function () {
      vm.selectedFile = null;
      console.log(vm.selectedFile);
    };

    init();
    function init() {
      // Data
      vm.files = [
        {
          "id": 1,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Adeline",
          "type": "Folder",
          "owner": "Public",
          "size": "34 Mb",
          "date": 1288323623006
        },
        {
          "id": 2,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Renee",
          "type": "Folder",
          "owner": "Public",
          "size": "52 Mb",
          "date": 1288323323006
        },
        {
          "id": 3,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Mathis",
          "type": "Spreadsheet",
          "owner": "Public",
          "size": "12 Mb",
          "date": 1288323623306
        },
        {
          "id": 4,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Elizabeth",
          "type": "Spreadsheet",
          "owner": "Me",
          "size": "20 Mb",
          "date": 1288343623006
        },
        {
          "id": 5,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Mcmahon",
          "type": "Spreadsheet",
          "owner": "Public",
          "size": "11 Mb",
          "date": 1288313623006
        },
        {
          "id": 6,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Alisha",
          "type": "Spreadsheet",
          "owner": "Public",
          "size": "38 Mb",
          "date": 1288323673006
        },
        {
          "id": 7,
          "icon": "<i class='fa fa-file-text' aria-hidden='true'></i>",
          "name": "Consuelo",
          "type": "Document",
          "owner": "Public",
          "size": "38 Mb",
          "date": 1288393623006
        },
        {
          "id": 8,
          "icon": "<i class='fa fa-file-text' aria-hidden='true'></i>",
          "name": "Bobbie",
          "type": "Document",
          "owner": "Emily Bennet",
          "size": "85 Mb",
          "date": 1288723623006
        },
        {
          "id": 9,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Berg",
          "type": "Spreadsheet",
          "owner": "Me",
          "size": "42 Mb",
          "date": 1288323645006
        },
        {
          "id": 10,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Nina",
          "type": "Spreadsheet",
          "owner": "Emily Bennet",
          "size": "47 Mb",
          "date": 1288323673006
        },
        {
          "id": 11,
          "icon": "<i class='fa fa-file-text' aria-hidden='true'></i>",
          "name": "Loretta",
          "type": "Document",
          "owner": "Public",
          "size": "50 Mb",
          "date": 1288323723006
        },
        {
          "id": 12,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Newman",
          "type": "Folder",
          "owner": "Public",
          "size": "31 Mb",
          "date": 1288323623044
        },
        {
          "id": 13,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Yvette",
          "type": "Spreadsheet",
          "owner": "Emily Bennet",
          "size": "10 Mb",
          "date": 1288383623006
        },
        {
          "id": 14,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Polly",
          "type": "Folder",
          "owner": "Emily Bennet",
          "size": "62 Mb",
          "date": 1288873623006
        }
      ];
    }
  }
})();
