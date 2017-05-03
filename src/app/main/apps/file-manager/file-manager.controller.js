(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('FileManagerController', FileManagerControllerFn);

  /** @ngInject */
  function FileManagerControllerFn($rootScope, $translate, $uibModal, files, omAside) {
    var vm = this;

    vm.selectedFile = null;
    vm.currentView = 'list-condensed';
    vm.orderByField = 'name';
    vm.defaultSort = true;
    vm.filterBy = "";
    vm.menuOptions = [];
    vm.searchValue = "";
    vm.searchResults = [];
    vm.toggleSearch = false;
    vm.files = files.fileList;
    vm.breadcrumbs = files.breadcrumbs;
    vm.canPreview = ["Image", "Video", "Audio"];
    vm.users = [{"name": "John Doe", "email": "JohnDoe@example.com"}, {
      "name": "Jane Doe",
      "email": "JaneDoe@examle.com"
    }, {"name": "user name", "email": "userEmail@example.com"}];
    vm.currentUser = vm.users[0];

    // Methods
    // --File selections
    vm.selectFile = selectFile;
    vm.resetSelection = resetSelection;
    vm.isAvailableForPreview = isAvailableForPreview;
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
    // --Create/Rename Folder Modal
    vm.showCreateFolderDialog = showCreateFolderDialog;
    vm.showRenameFolderDialog = showRenameFolderDialog;
    // --Manage Tags Modal
    vm.showManageTagsDialog = showManageTagsDialog;
    vm.filterListByTag = filterListByTag;
    // --Preview File Modal
    vm.showPreviewFileDialog = showPreviewFileDialog;
    // --Side Menu
    vm.toggleFileManagerAside = toggleFileManagerAside;
    // --Breadcrumbs click
    vm.changeDirectory = changeDirectory;

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
        'FILE_MANAGER.MENU.RENAME', 'FILE_MANAGER.MENU.DELETE', 'FILE_MANAGER.MENU.VIEW',
        'FILE_MANAGER.MENU.DOWNLOAD']).then(function (translations) {
        vm.AllMenuOptions = {
          /*
           ['Menu item name', function ($itemScope, $event, modelValue, text, $li) {
           vm.selected = $itemScope.item.name;
           }]
           */
          "open": ["<i class='fa fa-folder-open' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.OPEN'], openFn],
          "view": ["<i class='fa fa-eye' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.VIEW'], viewFn],
          "download": ["<i class='fa fa-download' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.DOWNLOAD'], downloadFn],
          "share": ["<i class='fa fa-share-alt' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.SHARE'], shareFn],
          "tags": ["<i class='fa fa-tags' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.MANAGE_TAGS'], manageTagsFn],
          "cut": ["<i class='fa fa-scissors' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.CUT'], cutFn],
          "rename": ["<i class='fa fa-pencil' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.RENAME'], renameFn],
          "null": null, // Divider
          "delete": ["<i class='fa fa-trash' aria-hidden='true'></i> " + translations['FILE_MANAGER.MENU.DELETE'], deleteFn]
        };
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

    function isAvailableForPreview(file) {
      if (vm.canPreview.indexOf(file.type) != -1 && (file.preview != "" || file.thumb != "")) {
        return true;
      } else
        return false;
    }

    function chooseFiles(input) {
      console.log(input.files);
    }

    function chooseFolder(input) {
      console.log(input.files);
    }

    function checkFileType($itemScope) {
      vm.menuOptions = [];
      vm.menuOptionsClone = angular.copy(vm.AllMenuOptions);
      angular.forEach(vm.menuOptionsClone, function(value, key){
        if (vm.selectedFile.type === 'Folder' && !(key === 'view' || key === 'download')){
          vm.menuOptions.push(value);
        }else if(!(vm.selectedFile.type === 'Folder') && vm.isAvailableForPreview($itemScope) && !(key === 'open')){
          vm.menuOptions.push(value);
        }else if(!(vm.selectedFile.type === 'Folder') && !vm.isAvailableForPreview($itemScope) && !(key === 'open' || key === 'view')){
          vm.menuOptions.push(value);
        }
      });
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

    function filterListByTag(tag) {
      if (tag != null) {
        vm.filterBy = tag;
        angular.element("#filteredBy").css("display","inline-block");
      }else {
        vm.filterBy = "";
        angular.element("#filteredBy").css("display","none");
      }
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

    function deleteFn($itemScope) {
      console.log("Delete Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function viewFn($itemScope) {
      console.log("View Selected File" + "\nfileID: " + $itemScope.file.id);
      console.log($itemScope.file);
      vm.selectedFile = $itemScope.file;
      vm.showPreviewFileDialog(vm.selectedFile);
    }

    function downloadFn($itemScope) {
      console.log("Download Selected File" + "\nfileID: " + $itemScope.file.id);
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
          CurrentEntry: null
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
          CurrentEntry: function () {
            return {name: renameTarget.name};
          }
        }
      });
    }

    function showManageTagsDialog() {
      $uibModal.open({
        templateUrl: 'app/main/apps/file-manager/dialogs/manage-tags-dialog/manage-tags-dialog.html',
        controller: 'ManageTagsController',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          CurrentTags: function () {
            return vm.selectedFile.tags;
          }
        }
      }).result.then(function (tags) {
        vm.selectedFile.tags = tags;
        console.log("resolve", arguments);
      }, function () {
        console.log("reject")
      });
    }

    function showPreviewFileDialog(file) {
      if (vm.canPreview.indexOf(file.type) != -1) {
        $uibModal.open({
          templateUrl: 'app/main/apps/file-manager/dialogs/preview-file/preview-file.html',
          controller: 'PreviewFileController',
          controllerAs: 'vm',
          size: 'md',
          resolve: {
            CurrentEntry: function () {
              return file;
            }
          }
        });
      } else {
        window.alert("not a valid type");
      }
    }

    function toggleFileManagerAside(id) {
      omAside.toggle(id);
    }

    function changeDirectory(crumb) {
      vm.breadcrumbs = vm.breadcrumbs.slice(0, vm.breadcrumbs.indexOf(crumb)+1);
    }
  }
})();
