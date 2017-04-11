/**
 * Created by zura on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.pages.errors.error404', [])
        .config(Config);

    /** @ngInject */
    function Config($stateProvider) {

        $stateProvider
            .state('app.error404', {
                url: '/error404',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/pages/errors/error404/error404.html'
                    }
                },
                bodyClass: 'error404'
            });

        // Translation
    }
})();