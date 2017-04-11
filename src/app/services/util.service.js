/**
 * Created by zura on 10/7/2016.
 */
(function () {
  'use strict';

  angular
    .module('angularLobiadmin')
    .factory('Util', UtilService);

  /** @ngInject */
  function UtilService() {
    var Util = {
      baseUrl: '/_vacancy/',
      // baseUrl: 'app/data/',
      formatUrl: formatUrl
    };

    return Util;

    function formatUrl(url) {
      return Util.baseUrl + url;
    }
  }
})();
