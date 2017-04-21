(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('FileManagerController', FileManagerControllerFn)
    .directive('ngRightClick', ngRightClickFn);

  /** @ngInject */
  function ngRightClickFn($parse) {
    return function (scope, element, attrs) {
      var fn = $parse(attrs.ngRightClick);
      element.bind('contextmenu', function (event) {
        scope.$apply(function () {
          event.preventDefault();
          fn(scope, {$event: event});
        });
      });
    };
  }

  function FileManagerControllerFn() {
    var vm = this;

    vm.selectFile = selectFile;
    vm.resetSelection = resetSelection;
    vm.toggleView = toggleView;

    vm.selectedFile = null;
    vm.currentView = 'list-condensed';
    vm.orderByField = 'name';
    vm.defaultSort = true;
    vm.menuOptions = [
      /*
       ['Menu item name', function ($itemScope, $event, modelValue, text, $li) {
       vm.selected = $itemScope.item.name;
       }]
       */
      ['Open', function ($itemScope) {
        console.log("Open Selected File"+"\nfileID: "+ $itemScope.file.id);
        vm.selectedFile = $itemScope.file;
      }],
      null, // Divider
      ['Share', function ($itemScope) {
        console.log("Share Selected File"+"\nfileID: "+ $itemScope.file.id);
        vm.selectedFile = $itemScope.file;
      }],
      null, // Divider
      ['Manage Tags', function ($itemScope) {
        console.log("Manage Tags For Selected File"+"\nfileID: "+ $itemScope.file.id);
        vm.selectedFile = $itemScope.file;
      }],
      null, // Divider
      ['Cut', function ($itemScope) {
        console.log("Cut Selected File"+"\nfileID: "+ $itemScope.file.id);
        vm.selectedFile = $itemScope.file;
      }],
      null, // Divider
      ['Rename', function ($itemScope) {
        console.log("Rename Selected File"+"\nfileID: "+ $itemScope.file.id);
        vm.selectedFile = $itemScope.file;
      }],
      null, // Divider
      ['Change Owner', function ($itemScope) {
        console.log("Change Owner For Selected File"+"\nfileID: "+ $itemScope.file.id);
        vm.selectedFile = $itemScope.file;
      }],
      null, // Divider
      ['Delete', function ($itemScope) {
        console.log("Delete Selected File"+"\nfileID: "+ $itemScope.file.id);
        vm.selectedFile = $itemScope.file;
      }]
    ];


    // Methods
    function toggleView() {
      if (vm.currentView === 'list-condensed') {
        vm.currentView = 'grid-view';
      } else if (vm.currentView === 'grid-view') {
        vm.currentView = 'list-condensed';
      }
    }

    function selectFile(x) {
      vm.selectedFile = x;
    }

    function resetSelection() {
      vm.selectedFile = null;
    }

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
          "size": 128832362,
          "date": 1288323623006
        },
        {
          "id": 2,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Renee",
          "type": "Image",
          "owner": "Public",
          "size": 2332300,
          "date": 1288323323006
        },
        {
          "id": 3,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Mathis",
          "type": "Word",
          "owner": "Public",
          "size": 233300,
          "date": 1288323623306
        },
        {
          "id": 4,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Elizabeth",
          "type": "Excel",
          "owner": "Me",
          "size": 23323,
          "date": 1288343623006
        },
        {
          "id": 5,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Mcmahon",
          "type": "Power Point",
          "owner": "Public",
          "size": 13623006,
          "date": 1288313623006
        },
        {
          "id": 6,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Alisha",
          "type": "Video",
          "owner": "Public",
          "size": 13623006,
          "date": 1288323673006
        },
        {
          "id": 7,
          "icon": "<i class='fa fa-file-text' aria-hidden='true'></i>",
          "name": "Consuelo",
          "type": "Audio",
          "owner": "Public",
          "size": 2883936,
          "date": 1288393623006
        },
        {
          "id": 8,
          "icon": "<i class='fa fa-file-text' aria-hidden='true'></i>",
          "name": "Bobbie",
          "type": "HTML",
          "owner": "Emily Bennet",
          "size": 87236,
          "date": 1288723623006
        },
        {
          "id": 9,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Berg",
          "type": "Css",
          "owner": "Me",
          "size": 28832,
          "date": 1288323645006
        },
        {
          "id": 10,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Nina",
          "type": "Code",
          "owner": "Emily Bennet",
          "size": 23673,
          "date": 1288323673006
        },
        {
          "id": 11,
          "icon": "<i class='fa fa-file-text' aria-hidden='true'></i>",
          "name": "Loretta",
          "type": "Archive",
          "owner": "Public",
          "size": 2883237,
          "date": 1288323723006
        },
        {
          "id": 12,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Newman",
          "type": "Other",
          "owner": "Public",
          "size": 83236230,
          "date": 1288323623044
        },
        {
          "id": 13,
          "icon": "<i class='fa fa-table' aria-hidden='true'></i>",
          "name": "Yvette",
          "type": "Document",
          "owner": "Emily Bennet",
          "size": 28838362,
          "date": 1288383623006
        },
        {
          "id": 14,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Polly",
          "type": "Document",
          "owner": "Emily Bennet",
          "size": 88736,
          "date": 1288873623006
        }
      ];
    }
  }
})();
