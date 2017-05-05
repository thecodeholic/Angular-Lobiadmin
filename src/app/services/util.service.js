/**
 * Created by zura on 10/7/2016.
 */
(function () {
  'use strict';

  angular
    .module('angularLobiadmin')
    .factory('Util', UtilService);

  /** @ngInject */
  function UtilService($window) {
    return {
      // baseUrl: 'app/data/',
      formatUrl: formatUrl
    };

    function formatUrl(url) {
      return $window.__env.apiUrl + url;
    }
  }
})();
