/**
 * Created by zura on 10/17/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('SettingsBoxService', SettingsBoxServiceFn)
        .controller('SettingsBoxController', SettingsBoxControllerFn)
        .directive('settingsBox', settingsBoxFn)
    ;

    /** @ngInject */
    function settingsBoxFn(SettingsBoxService) {
        return {

            restrict: 'AE',
            replace: true,
            controller: 'SettingsBoxController as vm',
            templateUrl: 'app/core/directives/settings-box/settings-box.html',
            link: function () {
                SettingsBoxService.init();
            }
        }
    }

    /** @ngInject */
    function SettingsBoxControllerFn() {
        var vm = this;

        // Data
        vm.title = "Something";
        vm.themes = [
            '',
            'theme-lobiadmin'
        ];
        vm.selectedTheme = null;

        // Methods
        vm.selectTheme = selectTheme;
        vm.clearStorage = clearStorage;


        init();

        function init(){

        }

        function selectTheme(theme){
            vm.selectedTheme = theme;
        }

        function clearStorage(){

        }

    }

    /** @ngInject */
    function SettingsBoxServiceFn(ConfigService) {
        var CONFIG = ConfigService;

        var SettingsBoxService = {
            $settingBox: null,

            init: init
        };

        function init() {
            SettingsBoxService.$settingBox = angular.element(CONFIG.settingBoxSelector);

            SettingsBoxService.$settingBox.find('.btn-toggle').click(function () {
                SettingsBoxService.$settingBox.toggleClass('opened');
            });
            //Trigger change event of checked body background
            SettingsBoxService.$settingBox.find('[name="body-bg"]:checked').trigger('change');

            var $themes = SettingsBoxService.$settingBox.find('[name="header-skin"]');
            $themes.change(function () {
                $themes.each(function (ind, el) {
                    angular.element('body').removeClass(el.value);
                });
                // var storage = _getLocalStorage();
                // if ($this.is(':checked') && $this.val() !== '0') {
                //     storage.theme = $this.val();
                //     $('body').addClass($this.val());
                // } else if ($this.is(':checked') && $this.val() === '0') {
                //     delete storage.theme;
                // }
                //
                // _putToLocalStorage(storage);
            });
            //Trigger change event of checked theme
            SettingsBoxService.$settingBox.find('[name="header-skin"]:checked').trigger('change');
        }

        return SettingsBoxService;
    }
})();
