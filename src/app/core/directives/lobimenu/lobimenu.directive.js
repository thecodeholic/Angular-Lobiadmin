/* eslint-disable */
/**
 * Created by zura on 9/29/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .provider('lobiNavigationService', lobiNavigationServiceProvider)
    .controller('LobiMenuController', LobiMenuController)
    .directive('lobiMenu', lobiMenu)
  // .service('LobiNavigationService', LobiMenuData)
  // .controller('LobiMenuItemController', LobiMenuItemController)
  ;

  /** @ngInject */
  function lobiNavigationServiceProvider() {
    var $log = angular.injector(['ng']).get('$log');
    var $filter = angular.injector(['ng']).get('$filter');

    var navigationItems = [],
      provider = this,
      service = {
        showMenuItemIndex: false
      };

    provider.setShowMenuItemIndex = setShowMenuItemIndex;
    provider.saveItem = saveItem;
    provider.deleteItem = deleteItem;
    provider.sortByWeight = sortByWeight;

    function setShowMenuItemIndex(show) {
      service.showMenuItemIndex = show;
    }

    function saveItem(key, item) {

      if (!angular.isString(key)) {
        $log.error('First parameter of lobiNavigationService.saveItem must be string');
        return;
      }

      var finalItem = findItemByKeyOrCreate(key);

      // item.text = item.translate ? $filter('translate')(item.translate) : item.text;

      angular.extend(finalItem, item);

      // angular.forEach(item, function (value, key) {
      //   finalItem[key] = value;
      // });
    }

    function deleteItem(key) {
      var item = getItemByKey(key);
      if (item !== null) {
        navigationItems.splice(navigationItems.indexOf(item), 1);
      }
    }

    function sortByWeight() {
      navigationItems.sort(function (item1, item2) {
        return item1.weight - item2.weight;
      });
    }

    function generateIndices() {
      var index = 0;
      angular.forEach(navigationItems, function (item) {
        if (!item.group && (!angular.isUndefined(item.showIndex) && item.showIndex || angular.isUndefined(item.showIndex) && service.showMenuItemIndex)) {
          index++;
        }
        item._index = index;
      });
    }

    function findItemByKeyOrCreate(key) {
      var finalItem = null;

      angular.forEach(navigationItems, function (item) {
        if (item.key === key) {
          finalItem = item;
        }
      });

      if (!finalItem) {
        finalItem = {
          key: key
        };
        navigationItems.push(finalItem);
      }

      return finalItem;
    }

    function getItemByKey(key) {
      var finalItem = null;

      angular.forEach(navigationItems, function (item) {
        if (item.key === key) {
          finalItem = item;
        }
      });

      return finalItem;
    }

    this.$get = function () {
      service.getNavigationItems = getNavigationItems;
      service.getFirstNonAbstractItem = getFirstNonAbstractItem;
      service.getItem = getItemByKey;
      service.saveItem = saveItem;
      service.deleteItem = deleteItem;

      function getFirstNonAbstractItem() {
        getNavigationItems();
        for (var i = 0; i < navigationItems.length; i++) {
          if (navigationItems[i].state) {
            return navigationItems[i];
          }
        }
        return null;
      }

      function getNavigationItems() {
        sortByWeight();
        generateIndices();
        return navigationItems;
      }

      return service;
    };

  }

  /** @ngInject */
  function LobiMenuController($state, lobiNavigationService) {
    var vm = this;

    // Data
    vm.showMenuItemIndex = lobiNavigationService.showMenuItemIndex;
    vm.menuItems = lobiNavigationService.getNavigationItems();

    // Methods
    vm.getParams = getParams;

    init();

    ///////////

    function init() {

    }

    function getParams(item) {
      return angular.extend($state.params, item.params || {});
    }

  }

  /** @ngInject */
  function lobiMenu(LobiMenuService) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/core/directives/lobimenu/lobimenu.html',
      controller: 'LobiMenuController as vm',
      link: function (scope, element) {
        LobiMenuService.$el = element;
        LobiMenuService.initMenu();
        // LobiMenuService.open = function(){
        //     $('body').addClass('menu-collapsed');
        // };
      }
    }
  }
})();
