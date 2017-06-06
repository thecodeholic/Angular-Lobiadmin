/**
 * Created by zura on 6/6/17.
 */
(function () {
  'use strict';

  angular
    .module('app.fileManager')
    .factory('Files', FilesFn);

  /** @ngInject */
  function FilesFn(apiService) {
    return apiService.resolve('fileManagerFiles');
  }
})();
