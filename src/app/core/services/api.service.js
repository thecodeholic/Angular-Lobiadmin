/**
 * Created by zura on 5/2/17.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .provider('apiService', apiServiceProviderFn);

  /** @ngInject */
  function apiServiceProviderFn() {


    var resources = {},
      provider = this;

    provider.resources = resources;
    provider.addResource = addResource;

    provider.$get = function ($resource, Util) {

      return {
        addResource: addResource,
        resolve: resolve
      };


      function resolve(key) {
        var args = angular.copy(resources[key]);
        if (args.length > 0) {
          args[0] = Util.formatUrl(args[0] || '');
        }
        return $resource.apply($resource, args);
      }

    };

    function addResource(resourceKey) {
      resources[resourceKey] = Array.prototype.splice.apply(arguments, [1]);
    }

  }
})();
