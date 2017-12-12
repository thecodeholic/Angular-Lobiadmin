(function () {
  'use strict';

  angular
    .module('angularLobiadmin', [
      'ui.bootstrap.contextMenu',

      'app.core',

      'app.components',
      'app.pages',

      'app.dashboard',
      'app.calendar',
      'app.fileManager',
      'app.chat',
      'app.contacts'
    ]);

})();
