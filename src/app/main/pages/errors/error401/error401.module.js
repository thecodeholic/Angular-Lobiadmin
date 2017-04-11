/**
 * Created by zura on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.pages.errors.error401', [])
        .config(Config);

    /** @ngInject */
    function Config($stateProvider) {

        $stateProvider
            .state('app.error401', {
                url: '/error401',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/pages/errors/error401/error401.html'
                    }
                },
                bodyClass: 'error401'
            });

        // Translation
    }
})();