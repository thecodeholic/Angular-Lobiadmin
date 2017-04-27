(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('FileManagerController', FileManagerControllerFn);

  /** @ngInject */
  function FileManagerControllerFn($rootScope, $translate, $uibModal, files) {
    var vm = this;

    vm.selectedFile = null;
    vm.currentView = 'list-condensed';
    vm.orderByField = 'name';
    vm.defaultSort = true;
    vm.menuOptions = [];
    vm.searchValue = "";
    vm.searchResults = [];
    vm.toggleSearch = false;
    vm.files = files;

    // Methods
    // --File selections
    vm.selectFile = selectFile;
    vm.resetSelection = resetSelection;
    // --File display
    vm.toggleView = toggleView;
    // --File type check
    vm.checkFileType = checkFileType;
    // --Upload buttons
    vm.chooseFiles = chooseFiles;
    vm.chooseFolder = chooseFolder;
    // --Search
    vm.searchFn = searchFn;
    vm.clearSearchResultsFn = clearSearchResultsFn;
    // --CreateFolderModal
    vm.showCreateFolderDialog = showCreateFolderDialog;
    vm.showRenameFolderDialog = showRenameFolderDialog;
    // --ManageTagsModal
    vm.showManageTagsDialog = showManageTagsDialog;

    /////////////////////////

    translateMenu();
    init();

    function init() {
      $rootScope.$on('App:languageChange', function () {
        translateMenu();
      });
    }

    function translateMenu() {

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
      vm.showManageTagsDialog(vm.selectedFile);

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
      vm.showRenameFolderDialog(vm.selectedFile);
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

    function searchFn(searchValue) {
      vm.searchResults = [];
      if (searchValue != "") {
        for (var i = 0; i < vm.files.length; i++) {
          if (vm.files[i].name.indexOf(searchValue) != -1) {
            vm.searchResults.push({
              id: vm.files[i].id, icon: vm.files[i].icon, name: vm.files[i].name, type: vm.files[i].type,
              owner: vm.files[i].owner, size: vm.files[i].size, date: vm.files[i].date
            });
          }
        }
        console.log(vm.searchResults);
      }
    }

    function clearSearchResultsFn() {
      vm.displayData = vm.files;
      vm.searchValue = "";
    }

    function showCreateFolderDialog() {
      $uibModal.open({
        templateUrl: 'app/main/apps/file-manager/dialogs/create-rename-dialog/create-rename-dialog.html',
        controller: 'CreateRenameDialogController',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          currentEntry: null
        }
      });
    }

    function showRenameFolderDialog(renameTarget) {
      $uibModal.open({
        templateUrl: 'app/main/apps/file-manager/dialogs/create-rename-dialog/create-rename-dialog.html',
        controller: 'CreateRenameDialogController',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          currentEntry: function () {
            return { name: renameTarget.name };
          }
        }
      });
    }

    function showManageTagsDialog(manageTagsTarget) {
      $uibModal.open({
        templateUrl: 'app/main/apps/file-manager/dialogs/manage-tags-dialog/manage-tags-dialog.html',
        controller: 'ManageTagsController',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          currentEntry: function () {
            return { tags: manageTagsTarget.tags };
          }
        }
      });
    }
  }
})();
