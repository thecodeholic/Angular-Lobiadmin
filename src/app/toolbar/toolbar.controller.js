/**
 * Created by zura on 9/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('angularLobiadmin')
    .controller('ToolbarController', ToolbarController);

  /** @ngInject */
  function ToolbarController($state, Auth, $translate, omAside) {
    var vm = this;

    // Data
    vm.isOffCanvasMenuOpened = false;
    vm.languages = {
      en: {
        'title': 'English',
        'code': 'en'
      },
      // de: {
      //   'title': 'Deutsch',
      //   'code': 'de'
      // },

      ka: {
        'title': 'ქართული',
        'code': 'ka'
      }
    };

    // Methods
    vm.logout = logout;
    vm.lockScreen = lockScreen;
    vm.toggleMenu = toggleMenu;
    vm.toggleAside = toggleAside;
    vm.hasOffCanvasClass = hasOffCanvasClass;
    vm.changeLanguage = changeLanguage;

    init();

    ///////////

    function init() {
      // Get the selected language directly from angular-translate module setting

      vm.selectedLanguage = vm.languages[$translate.use()];
    }

    function logout() {

    }

    function lockScreen() {

    }

    function toggleMenu() {
      // @todo
    }

    /**
     * Change Language
     */
    function changeLanguage(lang) {
      vm.selectedLanguage = lang;
      // Change the language
      $translate.use(lang.code);
    }

    function toggleAside(id) {
      omAside.toggle(id);
      vm.hasOffCanvasClass(id);
    }

    function hasOffCanvasClass(id) {
      if (angular.element('#' + id).hasClass('is-off-canvas')) {
        vm.isOffCanvasMenuOpened = true;
      }
      console.log(vm.isOffCanvasMenuOpened);
    }
  }
})();
