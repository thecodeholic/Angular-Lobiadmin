/**
 * Created by zura on 10/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('strToTime', strToTimeFn);

    /** @ngInject */
    function strToTimeFn() {
        return function (value) {
            return value.replace(/(\d{2}:\d{2})(:.*)/gi, "$1");
        }
    }
})();
