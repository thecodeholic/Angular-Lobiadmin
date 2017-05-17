/**
 * Created by zura on 5/2/17.
 */
(function () {
  'use strict';

  angular
    .module('app.pages.auth.login')
    .factory('LoginResource', LoginResource);

  /** @ngInject */
  function LoginResource() {
    // var ServiceName = apiService('/book/:bookId',
    //   {bookId: '@bookId'}, {
    //     loan: {
    //       method: 'PUT',
    //       params: {bookId: '@bookId'},
    //       isArray: false
    //     }
    //   });
    // return ServiceName;
  }
})();
