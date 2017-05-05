/**
 * Created by zura on 9/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.pages', [
      'app.pages.auth',

      'app.pages.errors.error401',
      'app.pages.errors.error404'
    ])
    .config(Config);

  /** @ngInject */
  function Config() {

  }
})();
