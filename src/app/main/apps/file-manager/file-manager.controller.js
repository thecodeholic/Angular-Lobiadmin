(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .controller('FileManagerController', FileManagerControllerFn);

  /** @ngInject */
  function FileManagerControllerFn($rootScope, $translate, $uibModal, $log, $scope,
                                   omAside, myFiles, starredFiles, sharedFiles, recentFiles, offlineFiles) {
    var vm = this;

    vm.myFiles = myFiles;
    vm.starredFiles = starredFiles;
    vm.sharedFiles = sharedFiles;
    vm.recentFiles = recentFiles;
    vm.offlineFiles = offlineFiles;
    vm.selectedDirectory = myFiles;

    vm.files = myFiles.fileList;
    vm.breadcrumbs = myFiles.breadcrumbs;

    vm.selectedFile = null;
    vm.selectedFiles = {};

    vm.currentView = 'list-condensed';
    vm.orderByField = 'name';
    vm.defaultSort = true;
    vm.filterBy = "";

    vm.menuOptions = [];

    vm.searchValue = "";
    vm.searchResults = [];
    vm.toggleSearch = false;

    vm.canPreview = ["Image", "Video", "Audio"];
    vm.users = [{"name": "John Doe", "email": "JohnDoe@example.com"},
      {"name": "Jane Doe", "email": "JaneDoe@examle.com"},
      {"name": "user name", "email": "userEmail@example.com"}];
    vm.currentUser = vm.users[0];
    vm.isOffCanvasMenuOpened = false;
    vm.allSelected = false;

    // Methods
    // --File Directory
    vm.switchDirectory = switchDirectory;
    // --File Selections
    vm.selectFile = selectFile;
    vm.makeSelection = makeSelection;
    vm.resetSelection = resetSelection;
    vm.isAvailableForPreview = isAvailableForPreview;
    vm.selectMultiple = selectMultiple;
    vm.selectAll = selectAll;
    // --File Display
    vm.toggleView = toggleView;
    // --File Type Check
    vm.checkFileType = checkFileType;
    // --Upload Buttons
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
    // --Delete Modal
    vm.showDeleteDialog = showDeleteDialog;
    // --Side Menu
    vm.toggleAside = toggleAside;
    vm.hasOffCanvasClass = hasOffCanvasClass;
    // --Breadcrumbs click
    vm.changeDirectory = changeDirectory;

    /////////////////////////

    translateMenu();
    init();

    function init() {
      var languageChange = $rootScope.$on('App:languageChange', function () {
        translateMenu();
      });

      $rootScope.$on('destroy', languageChange)
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
      } else {
        vm.currentView = 'list-condensed';
      }
    }

    function selectFile(file, isLeftClick) {

      vm.selectedFiles = {};
      selectMultiple(file, null);
      openDetailAside();
      // if (vm.selectedFile === file && isLeftClick) {
      //   // resetSelection();
      // } else {
      //   makeSelection(file);
      // }

      // vm.checkFileType(file);
    }

    function selectMultiple(file) {
      // vm.selectedFile = file;

      makeSelection(file);

      if (Object.keys(vm.selectedFiles).length === 0) {
        resetSelection();
      }
    }

    function selectAll() {
      if (!vm.allSelected) {
        vm.selectedFiles = {};
        if (vm.files.length > 0) {
          vm.selectedFile = vm.files[0];
        }
        angular.forEach(vm.files, function (file, ind) {
          vm.selectedFiles[file.id] = file;
        });
      } else {
        vm.selectedFiles = {};
      }
      vm.allSelected = !vm.allSelected;
    }

    function makeSelection(file) {
      vm.selectedFile = file;
      if (vm.selectedFiles[file.id]) {
        delete vm.selectedFiles[file.id];
        vm.allSelected = false;
      } else {
        vm.selectedFiles[file.id] = file;
      }
    }

    function openDetailAside(){
      omAside.open("selectedFileAside");
      vm.hasOffCanvasClass("selectedFileAside");
    }

    function resetSelection() {
      vm.selectedFile = null;
      omAside.close("selectedFileAside");
      if (vm.isOffCanvasMenuOpened)
        vm.isOffCanvasMenuOpened = false;
    }

    function isAvailableForPreview(file) {
      return vm.canPreview.indexOf(file.type) !== -1 && (file.preview !== "" || file.thumb !== "");
    }

    function chooseFiles(input) {
      $log.debug(input.files);
    }

    function chooseFolder(input) {
      $log.debug(input.files);
    }

    function checkFileType(file) {
      vm.menuOptions = [];
      vm.menuOptionsClone = angular.copy(vm.AllMenuOptions);
      angular.forEach(vm.menuOptionsClone, function (value, key) {
        if (file.type === 'Folder' && !(key === 'view' || key === 'download')) {
          vm.menuOptions.push(value);
        } else if (!(file.type === 'Folder') && vm.isAvailableForPreview(file) && !(key === 'open')) {
          vm.menuOptions.push(value);
        } else if (!(file.type === 'Folder') && !vm.isAvailableForPreview(file) && !(key === 'open' || key === 'view')) {
          vm.menuOptions.push(value);
        }
      });
    }

    function openFn($itemScope) {
      $log.debug("Open Selected File" + "\nfileID: " + $itemScope.file.id);
      $log.debug($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function shareFn($itemScope) {
      $log.debug("Share Selected File" + "\nfileID: " + $itemScope.file.id);
      $log.debug($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function manageTagsFn($itemScope) {
      vm.selectedFile = $itemScope.file;
      vm.showManageTagsDialog(vm.selectedFile);

    }

    function filterListByTag(tag) {
      if (tag != null) {
        vm.filterBy = tag;
        angular.element("#filteredBy").css("display", "inline-block");
      } else {
        vm.filterBy = "";
        angular.element("#filteredBy").css("display", "none");
      }
    }

    function cutFn($itemScope) {
      $log.debug("Cut Selected File" + "\nfileID: " + $itemScope.file.id);
      $log.debug($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function renameFn($itemScope) {
      vm.selectedFile = $itemScope.file;
      vm.showRenameFolderDialog(vm.selectedFile);
    }

    function deleteFn($itemScope) {
      vm.selectedFile = $itemScope.file;
      vm.showDeleteDialog(vm.selectedFile);
    }

    function viewFn($itemScope) {
      vm.selectedFile = $itemScope.file;
      vm.showPreviewFileDialog(vm.selectedFile);
    }

    function downloadFn($itemScope) {
      $log.debug("Download Selected File" + "\nfileID: " + $itemScope.file.id);
      $log.debug($itemScope.file);
      vm.selectedFile = $itemScope.file;
    }

    function searchFn(searchValue) {
      vm.files = vm.selectedDirectory.fileList;
      vm.searchResults = [];
      if (searchValue != "") {
        for (var i = 0; i < vm.files.length; i++) {
          if (vm.files[i].name.indexOf(searchValue) != -1) {
            vm.searchResults.push(vm.files[i]);
          }
        }
        vm.files = vm.searchResults;
        $log.debug(vm.searchResults);
      } else {
        vm.files = vm.selectedDirectory.fileList;
      }
    }

    function clearSearchResultsFn() {
      vm.files = vm.selectedDirectory.fileList;
      vm.searchValue = "";
    }

    function showCreateFolderDialog() {
      $uibModal.open({
        templateUrl: 'app/main/apps/file-manager/dialogs/create-rename-dialog/create-rename-dialog.html',
        controller: 'CreateRenameDialogController',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          CurrentEntry: null,
          FileId: vm.files[vm.files.length - 1].id + 1
        }
      }).result.then(function (newFolder) {
        vm.files.push(newFolder);
        $log.debug("resolve", arguments);
      }, function () {
        $log.debug("reject")
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
          },
          FileId: vm.selectedFile.id
        }
      }).result.then(function (newName) {
        vm.selectedFile.name = newName.name;
        $log.debug("resolve", arguments);
      }, function () {
        $log.debug("reject")
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
        $log.debug("resolve", arguments);
      }, function () {
        $log.debug("reject")
      });
    }

    function showPreviewFileDialog(file) {
      if (vm.canPreview.indexOf(file.type) !== -1) {
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
        $log.error("Not a valid type");
      }
    }

    function showDeleteDialog(file) {
      $uibModal.open({
        templateUrl: 'app/main/apps/file-manager/dialogs/delete-dialog/delete-dialog.html',
        controller: 'DeleteDialogController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          CurrentEntry: vm.selectedFile
        }
      }).result.then(function () {
        vm.files.splice(file.id, 1);
        for (var i = 0; i < vm.files.length; i++) {
          vm.files[i].id = i; //ID UPDATE
        }
        resetSelection();
        $log.debug("resolve", arguments);
      }, function () {
        $log.debug("reject")
      });
    }

    function toggleAside(id) {
      omAside.toggle(id);
      vm.hasOffCanvasClass(id);
    }

    function hasOffCanvasClass(id) {
      if (angular.element('#' + id).hasClass('is-off-canvas')) {
        vm.isOffCanvasMenuOpened = true;
      }
      $log.debug(vm.isOffCanvasMenuOpened);
    }

    function changeDirectory(crumb) {
      vm.breadcrumbs = vm.breadcrumbs.slice(0, vm.breadcrumbs.indexOf(crumb) + 1);
    }

    function switchDirectory(switchTo) {
      vm.files = switchTo.fileList;
      vm.breadcrumbs = switchTo.breadcrumbs;
      vm.selectedDirectory = switchTo;
      vm.toggleAside('fileManagerAside');
    }
  }
})();
