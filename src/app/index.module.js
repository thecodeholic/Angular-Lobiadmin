(function () {
  'use strict';

  angular
    .module('angularLobiadmin', [
      'ui.bootstrap.contextMenu',
      'ui.bootstrap.accordion',

      'app.core',

      'app.pages',

      'app.dashboard',
      'app.fileManager',
      'app.chat'
    ]);

})();
