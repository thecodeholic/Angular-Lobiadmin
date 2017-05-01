/**
 * Created by george on 5/1/17.
 */
(function () {
  'use strict';
  angular.module('app.fileManager')
    .controller('navCtrl', function(offCanvas) {
      this.toggle = offCanvas.toggle;
    })
    .factory('offCanvas', function(cnOffCanvas) {
      return cnOffCanvas({
        controller: 'navCtrl',
        controllerAs: 'nav',
        container: angular.element(".off-canvas__container"),
        templateUrl: 'app/main/apps/file-manager/menus/side-menu/side-menu.html'
      })
    });
})();
