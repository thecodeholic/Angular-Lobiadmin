(function() {
  'use strict';

  angular
    .module('angularLobiadmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
