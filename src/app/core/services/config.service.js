/**
 * Created by zura on 9/29/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('ConfigService', ConfigService);

    /** @ngInject */
    function ConfigService() {
        return {
            SCREEN_XS : 480,
            SCREEN_SM : 768,
            SCREEN_MD : 992,
            SCREEN_LG : 1200,

            //In every updateTimeForLockScreen Miliseconds clock will be updated on lock screen
            updateTimeForLockScreen: 1000,
            //When you click lock screen one time and lock screen slideshow is slide up,
            // after this amount of miliseconds slideshow will slide down if you do not unlock the screen
            showLockScreenTimeout: 30000,
            //These month names are used when lock screen is shown.
            monthNames: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"],
            //These week names are used when lock screen is shown.
            weekNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            //Add this attribute to element to activate expanding on full screen by clicking on this element
            fullScreenSelector: '[data-action="fullscreen"]',
            //Add this attribute to element to activate reload by clicking on this element
            reloadPageSelector: '[data-action="reload"]',
            //Add this attribute to element to activate hiding and showing sidebar by clicking on this element
            sidebarHideShowSelector: '[data-action="show-hide-sidebar"]',
            sidebarCollapseExpandSelector: '[data-action="collapse-expand-sidebar"]',
            //Navigation menu selector
            sidebarSelector: '.menu',
            //Setting box container
            settingBoxSelector: '.setting-box',
            //Search form selector
            searchFormSelector: '.header .navbar-search',
            //Breadcrumb <ol> element selector
            breadcrumbsListSelector: '#ribbon .breadcrumb',
            //Content div in which every ajax page will be loaded
            contentSelector: '#content',
            //If page was not found loading by ajax and server responded with code 404 this error 404 will be shown
            error404Page: 'pages/error-404.html',
            //This text will be given to window <title> when error 404 will be shown
            error404Title: 'ERROR 404',
            //If some problem occured when loading page by ajax and server responded with code 500 this error 500 page will be shown
            error500: 'pages/error-500.html',
            //This text will be given to window <title> when error 500 will be shown
            error500Title: 'ERROR 500',
            //Menu item toggle icon
            menuItemIcon: 'fa fa-chevron-circle-right',
            //Expanded menu item icon
            menuItemExpandIcon: 'fa fa-chevron-circle-down',
            //Submenu item toggle icon
            submenuItemIcon: 'fa fa-plus-square-o',
            //Submenu item expand toggle icon
            submenuItemExpandedIcon: 'fa fa-minus-square-o',
            //Menu toggle (expand/collapse) icon. (When menu is expanded)
            menuToggleIcon: 'fa fa-chevron-circle-left',
            //Menu toggle (expand/collapse) icon. (When menu is collapsed)
            menuToggleCollapsedIcon: 'fa fa-chevron-circle-right',
            //Whether of not use localStorage to save some settings
            useLocalStorage: true,
            clearLocalStorageSelector: '[data-action="clear-storage"]',
            //Show confirmation before clearing local storage or not
            confirmationBeforeClearStorage: true,
            clearStorageConfirmationMessage: "Are you sure you want to clear localStorage? This action can not be undone!",
            //Hash value for default page. If hash was not provided this hash value will be used.
            //If urlRouting is enabled this hash value will also run under url routing function
            defaultPage: 'dashboard',
            //Menu item expand and collapse animation duration
            panelItemToggleAnimationDuration: 200,
            //Enable Url routing or not
            enableUrlRouting: true,
            //Add this attribute to element to show compose email view by clicking on this element
            composeEmailViewSelector: '[data-action="compose-email"]',
            //Add this attribute to element to show email by clicking on this element.
            //Also add data-key attribute to element to load email by this key
            openEmailViewSelector: '[data-action="open-email"]'
        };
    }
})();
