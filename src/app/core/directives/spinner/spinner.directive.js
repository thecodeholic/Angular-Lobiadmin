/**
 * Created by zura on 10/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('spinner', spinnerFn);
    
    /** @ngInject */
    function spinnerFn() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'app/core/directives/spinner/spinner.html'
        }
    }
})();