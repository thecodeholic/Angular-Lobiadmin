/**
 * Created by zura on 9/29/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('LobiMenuService', LobiMenuService);

    /** @ngInject */
    function LobiMenuService(ConfigService, $window) {
        var CONFIG = ConfigService,
            $ = angular.element;

        var me = {
            $el: null,
            $menu: null,
            $showHideBtn: null,
            $lobiAdmin: null,

            initMenu: initMenu,
            initToggle: initToggle,
            toggleItem: toggleItem,
            expandItem: expandItem,
            collapseItem: collapseItem,
            collapse: collapse,
            expand: expand,
            toggle: toggle,
            isCollapsed: isCollapsed,
            isParentLink: isParentLink,
            getParentLink: getParentLink,
            setActive: setActive,
            getActive: getActive,
            hide: hide,
            show: show,
            isHidden: isHidden,
            hideShow: hideShow,
            getActivePath: getActivePath
        };

        return me;

        function initMenu() {
            me.$menu = me.$el.find('nav');
            me.$menu.find('ul>li>a')
                .off('click.lobiAdmin')
                .on('click.lobiAdmin', function (e) {
                    if (me.isCollapsed() && $(this).next('ul').length > 0 && me.isParentLink($(this))) {
                        e.preventDefault();
                        return false;
                    }
                    me.toggleItem($(this));
                });
            _preventEmptyLinksClick();
            _addToggleIconsToMenu();
            _showMenuToggleIcon();
            _enableMenuHeaderButtonTooltips();
            //Enable menu collapse/expand
            _enableToggle();

            // me.$menu.find('ul>li>a').click(function (ev) {
            //     var a = $(this);
            //     if (a.attr('href') === '#') {
            //         return;
            //     } else if ($window.location.hash === a.attr('href')) {
            //         ev.preventDefault();
            //     }
            // });
        }

        function initToggle() {
            me.$showHideBtn = $(CONFIG.sidebarHideShowSelector);

            //Enable menu hide/show
            _enableHideShow();

            // _enableResponsiveness();
        }

        function _enableMenuHeaderButtonTooltips() {
            var $btns = me.$el.find('.menu-header-buttons .btn').tooltip({
                container: 'body'
            });
            if ($($window).width() < ConfigService.SCREEN_MD) {
                $btns.on('click', function () {
                    $(this).tooltip('hide');
                });
            }
        }

        function _preventEmptyLinksClick() {
            me.$menu.find('a[href="#"]').on('click.lobiAdmin', function (ev) {
                ev.preventDefault();
            });
        }

        function _hideMenuOnOutsideClick() {
            $(document).off('mouseup.lobiAdmin')
                .on('mouseup.lobiAdmin', function (e) {
                    //If click happened not on the menu and not on the showHideBtn than we need to hide it.
                    //If click happened on the menu we do not need to hide it.
                    //If click happed on the showHideBtn it will be hidden automatically
                    if (!me.$el.is(e.target) && me.$el.has(e.target).length === 0
                        && !me.$showHideBtn.is(e.target) && me.$showHideBtn.has(e.target).length === 0) {
                        me.hide();
                    }
                });
        }

        function _addToggleIconsToMenu() {
            var $links = me.$menu.find('ul>li>a');
            $links.each(function (ind, a) {
                var $a = $(a);
//                If this menu item has nested menu and it does not have toggle icon yet we add toggle icon
                if ($a.next('ul').length > 0 && $a.find('.menu-item-toggle-icon').length === 0) {
//                    If this menu item is parent menu item
                    if ($a.closest('ul').parent().closest('ul').length === 0) {
                        $a.append($('<i class="' + CONFIG.menuItemIcon + ' menu-item-toggle-icon"></i>'));
                    } else {
                        $a.append($('<i class="' + CONFIG.submenuItemIcon + ' menu-item-toggle-icon"></i>'));
                    }
                }
            });
        }

        /**
         * Enable nav menu hide and show
         *
         * @returns {void}
         */
        function _enableHideShow() {
            me.$showHideBtn.on('click.lobiAdmin', function (ev) {
                ev.preventDefault();
                me.hideShow();
            });
        }

        function _showMenuToggleIcon() {
            var $btn = $(CONFIG.sidebarCollapseExpandSelector);
            $btn.append('<i class="' + CONFIG.menuToggleIcon + '"></i>');
        }

        /**
         * Enable nav menu toggle
         *
         * @returns {LobiMenuService}
         */
        function _enableToggle() {
            $(CONFIG.sidebarCollapseExpandSelector).on('click.lobiAdmin', function () {
                me.toggle();
            });
        }

//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------

        /**
         * Expand or collapse menu item
         *
         * @param {jQuery} a "<a> element with href attribute in menu"
         * @returns {LobiMenuService}
         */
        function toggleItem(a) {
            var li = a.parent();
            if (li.hasClass('opened')) {
                me.collapseItem(a);
            } else {
                me.expandItem(a);
            }
            return me;
        }

        /**
         * Expand menu item which has children
         *
         * @param {jQuery} a "<a> element with href attribute in menu"
         * @returns {LobiMenuService}
         */
        function expandItem(a) {
            if (a.next('ul').length > 0) {
                //Find opened item and close it
                me.collapseItem(a.closest('ul').find('>li.opened>a'));

                //if menu is collapsed .slideDown method does not work
                if (me.isCollapsed() && me.isParentLink(a)) {
                    a.next('ul').css('display', 'block');
                } else {
                    a.next('ul').slideDown(CONFIG.panelItemToggleAnimationDuration);
                }
                //Open new item
                a.parent().addClass('opened');
                var icon = a.find('.menu-item-toggle-icon');
                //if the item is parent item change parent item icon
                //if not change submenu item icon
                if (me.isParentLink(a)) {
                    icon.removeClass(CONFIG.menuItemIcon).addClass(CONFIG.menuItemExpandIcon);
                } else {
                    icon.removeClass(CONFIG.submenuItemIcon).addClass(CONFIG.submenuItemExpandedIcon);
                }
            }
            return me;
        }

        /**
         * Collapse menu item which has children
         *
         * @param {jQuery} a "<a> element with href attribute in menu"
         * @returns {LobiMenuService}
         */
        function collapseItem(a) {
            if (a.next('ul').length > 0) {
                a.parent().removeClass('opened');

                //if menu is collapsed .slideUp method does not work
                if (me.isCollapsed() && me.isParentLink(a)) {
                    a.next('ul').css('display', 'none');
                } else {
                    a.next('ul').slideUp(CONFIG.panelItemToggleAnimationDuration);
                }
                var icon = a.find('.menu-item-toggle-icon');
                //if the item is parent item change parent item icon
                //if not change submenu item icon
                if (me.isParentLink(a)) {
                    icon.removeClass(CONFIG.menuItemExpandIcon).addClass(CONFIG.menuItemIcon);
                } else {
                    icon.removeClass(CONFIG.submenuItemExpandedIcon).addClass(CONFIG.submenuItemIcon);
                }
            }
            return me;
        }

        /**
         * Collapse nav menu
         *
         * @returns {LobiMenuService}
         */
        function collapse() {
            if (me.isCollapsed()) {
                return me;
            }
            var $btn = $(CONFIG.sidebarCollapseExpandSelector);
            $btn.find('>*')
                .removeClass(CONFIG.menuToggleIcon)
                .addClass(CONFIG.menuToggleCollapsedIcon);
            $('body').addClass('menu-collapsed');
            return me;
        }

        /**
         * Expand nav menu
         *
         * @returns {LobiMenuService}
         */
        function expand() {
            if (!me.isCollapsed()) {
                return me;
            }
            var $btn = $(CONFIG.sidebarCollapseExpandSelector);
            $btn.find('>*')
                .removeClass(CONFIG.menuToggleCollapsedIcon)
                .addClass(CONFIG.menuToggleIcon);
            $('body').removeClass('menu-collapsed');
            return me;
        }

        /**
         * Toggle (expand or collapse) nav menu
         *
         * @returns {LobiMenuService}
         */
        function toggle() {
            if (me.isCollapsed()) {
                me.expand();
            } else {
                me.collapse();
            }
            return me;
        }

        /**
         * Check if nav menu is collapsed or not
         *
         * @returns {Boolean}
         */
        function isCollapsed() {
            return !!$('body').hasClass('menu-collapsed');
        }

        /**
         * Check if link is menu first level item or submenu item
         *
         * @param {jQuery|string} href "href attribute or jQuery object of <a>"
         * @returns {Boolean}
         */
        function isParentLink(href) {
            var a = href;
            if (angular.isString(href)) {
                a = me.$menu.find('>ul>li>a[href="' + href + '"]');
            }
            if (a.length !== 1) {
                return false;
            }
            return a.closest('ul').parent().closest('ul').length <= 0;

        }

        /**
         * Get parent item object of submenu item
         *
         * @param {jQuery} a
         * @returns {jQuery}
         */
        function getParentLink(a) {
            var li = a.closest('ul').closest('li');
            if (li.length === 0) {
                return false;
            }
            return li.find('>a');
        }

        /**
         * Find item by href and set active
         *
         * @param {String} href
         * @returns {LobiMenuService}
         */
        function setActive(href) {
            var a = me.$menu.find('a[href="' + href + '"]');
            if (a.length === 0 || a.parent().hasClass('active')) {
                return;
            }
            var act = me.$menu.find('li.active');
            act.removeClass('active');
            a.parent().addClass('active');
            //go through all elements to the root <li> element and expand parent lists of active link
            var parent = me.getParentLink(a);
            while (parent) {
//                parent.parent().addClass('active');
                if (parent.parent().hasClass('opened')) {
                    parent = me.getParentLink(parent);
                    continue;
                }
                me.expandItem(parent);
                parent = me.getParentLink(parent);
            }
        }

        /**
         * Get active element
         *
         * @returns {jQuery} <a> element
         */
        function getActive() {
            var act = me.$menu.find('li.active >a');
            return act.length === 0 ? null : act;
        }

        /**
         * Hide the menu
         *
         * @returns {LobiMenuService}
         */
        function hide() {
            if ($($window).width() < ConfigService.SCREEN_MD) {
                $('body').removeClass('menu-hidden');
                me.$showHideBtn.removeClass('active');
            } else {
                $('body').addClass('menu-hidden');
                me.$showHideBtn.addClass('active');
            }
            return me;
        }

        /**
         * Show hidden menu
         *
         * @returns {LobiMenuService}
         */
        function show() {
            if ($($window).width() < ConfigService.SCREEN_MD) {
                $('body').addClass('menu-hidden');
                me.$showHideBtn.addClass('active');
                _hideMenuOnOutsideClick();
            } else {
                $('body').removeClass('menu-hidden');
                me.$showHideBtn.removeClass('active');
            }
            return me;
        }

        /**
         * Check if menu is hidden
         *
         * @returns {Boolean}
         */
        function isHidden() {
            return !!($('body').hasClass('menu-hidden') && $($window).width() >= ConfigService.SCREEN_MD
            || !$('body').hasClass('menu-hidden') && $($window).width() < ConfigService.SCREEN_MD);

        }

        /**
         * Toggles menu state (hide/show)
         *
         * @returns {LobiMenuService}
         */
        function hideShow() {
            me.isHidden() ? me.show() : me.hide();
            return me;
        }

        /**
         * Get Array of objects of active menu item hierarchy.
         * First item in array is currently active link, next its parent and so on.
         * Object is in the following format.
         * {
         *      icon: '', // OPTIONAL. Icon of the menu item
         *      text: '', // REQUIRED. Text of the menu item
         *      href: ''  // OPTIONAL. HREF attribute of menu item
         * }
         *
         * @returns {Array}
         */
        function getActivePath() {
            var me = this;
            var ret = [];
            var act = me.getActive();
            while (act) {
                var icon = act.find('.menu-item-icon').clone();
                ret.push({
                    icon: icon.length > 0 ? icon : null,
                    text: act.find('.inner-text').html() || act.html(),
                    href: act.attr('href')
                });
                act = me.getParentLink(act);
            }
            return ret;
        }

    }
})();
