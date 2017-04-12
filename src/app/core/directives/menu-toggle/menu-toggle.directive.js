/**
 * Created by zura on 9/29/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('lobiMenuToggle', lobiMenuToggle);

    /** @ngInject */
    function lobiMenuToggle(LobiMenuService) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<a class="border-radius-0 btn font-size-lg" data-action="show-hide-sidebar">\
                            <i class="fa fa-bars"></i>\
                        </a>',
            link: function (scope, element) {
                LobiMenuService.$showHideBtn = element;
                LobiMenuService.initToggle();
            }
        }
    }
})();
