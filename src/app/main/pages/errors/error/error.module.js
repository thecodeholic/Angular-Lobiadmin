/**
 * Created by zura on 9/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.pages.errors.error', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider) {

    $stateProvider
      .state('app.error', {
        url: '/error/:code',
        params: [
          'subtitle',
          'body'
        ],
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/errors/error/error.html'
          }
        },
        bodyClass: 'error'
      });

    // Translation
  }
})();