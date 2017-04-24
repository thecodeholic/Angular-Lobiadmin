(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('FileManagerController', FileManagerControllerFn)
  ;


  /** @ngInject */
  function FileManagerControllerFn($rootScope, $translate) {
    var vm = this;

    vm.selectedFile = null;
    vm.currentView = 'list-condensed';
    vm.orderByField = 'name';
    vm.defaultSort = true;
    vm.menuOptions = [];


    // Methods

    vm.selectFile = selectFile;
    vm.resetSelection = resetSelection;
    vm.toggleView = toggleView;
    vm.checkFileType = checkFileType;
    vm.chooseFiles = chooseFiles;
    vm.chooseFolder = chooseFolder;

    /////////////////////////

    translateMenu();
    init();

    function init() {
      $rootScope.$on('App:languageChange', function(){
        translateMenu();
      });

      // Data
      vm.files = [
        {
          "id": 1,
          "icon": "<i class='fa fa-folder' aria-hidden='true'></i>",
          "name": "Adeline",
          "type": "Folder",
          "owner": "Public",
          "size": "",
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
          "type": "Folder",
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

    function translateMenu(){

      $translate(['FILE_MANAGER.MENU.OPEN', 'FILE_MANAGER.MENU.SHARE', 'FILE_MANAGER.MENU.MANAGE_TAGS', 'FILE_MANAGER.MENU.CUT',
        'FILE_MANAGER.MENU.RENAME', 'FILE_MANAGER.MENU.CHANGE_OWNER', 'FILE_MANAGER.MENU.DELETE', 'FILE_MANAGER.MENU.VIEW',
        'FILE_MANAGER.MENU.DOWNLOAD', 'FILE_MANAGER.MENU.VERSIONS']).then(function (translations) {
        vm.folderMenuOptions = [
          /*
           ['Menu item name', function ($itemScope, $event, modelValue, text, $li) {
           vm.selected = $itemScope.item.name;
           }]
           */
          ["<i class='fa fa-folder-open' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.OPEN'], openFn],
          ["<i class='fa fa-share-alt' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.SHARE'], shareFn],
          ["<i class='fa fa-tags' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.MANAGE_TAGS'], manageTagsFn],
          ["<i class='fa fa-scissors' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.CUT'], cutFn],
          ["<i class='fa fa-pencil' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.RENAME'], renameFn],
          null, // Divider
          ["<i class='fa fa-user' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.CHANGE_OWNER'], changeOwnerFn],
          ["<i class='fa fa-trash' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.DELETE'], deleteFn]
        ];
        vm.fileMenuOptions = [
          /*
           ['Menu item name', function ($itemScope, $event, modelValue, text, $li) {
           vm.selected = $itemScope.item.name;
           }]
           */
          ["<i class='fa fa-eye' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.VIEW'], viewFn],
          ["<i class='fa fa-download' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.DOWNLOAD'], downloadFn],
          ["<i class='fa fa-share-alt' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.SHARE'], shareFn],
          ["<i class='fa fa-tags' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.MANAGE_TAGS'], manageTagsFn],
          ["<i class='fa fa-scissors' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.CUT'], cutFn],
          ["<i class='fa fa-pencil' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.RENAME'], renameFn],
          null, // Divider
          ["<i class='fa fa-code-fork' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.VERSIONS'], versionsFn],
          ["<i class='fa fa-user' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.CHANGE_OWNER'], changeOwnerFn],
          ["<i class='fa fa-trash' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.DELETE'], deleteFn]
        ];
      });
    }

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
    
    function chooseFiles(input) {
      console.log(input.files);
    }

    function chooseFolder(input) {
      console.log(input.files);
    }

    function checkFileType($itemScope) {
      if ($itemScope.type === 'Folder') {
        vm.menuOptions = vm.folderMenuOptions;
      } else {
        vm.menuOptions = vm.fileMenuOptions;
      }
    }

    function openFn($itemScope) {
      console.log("Open Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function shareFn($itemScope) {
      console.log("Share Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function manageTagsFn($itemScope) {
      console.log("Manage Tags For Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function cutFn($itemScope) {
      console.log("Cut Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function renameFn($itemScope) {
      console.log("Rename Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function changeOwnerFn($itemScope) {
      console.log("Change Owner For Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function deleteFn($itemScope) {
      console.log("Delete Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function viewFn($itemScope) {
      console.log("View Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function downloadFn($itemScope) {
      console.log("Download Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function versionsFn($itemScope) {
      console.log("Version Control For Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

  }
})();
