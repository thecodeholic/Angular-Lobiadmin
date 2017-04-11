/**
 * Created by zura on 10/5/2016.
 */
(function () {
  'use strict';

  angular
    .module('angularLobiadmin')
    .factory('User', UserService);

  /** @ngInject */
  function UserService($rootScope) {
    var User = {
      current: null,

      getAvatar: getAvatar,
      getDisplayName: getDisplayName,
      assignCurrentUser: assignCurrentUser
    };
    return User;

    function getAvatar() {
      if (!User.current) {
        return "";
      }
      return User.current.avatar;
    }

    function getDisplayName() {
      if (!User.current) {
        return "";
      }

      return User.current.displayName;
    }

    function assignCurrentUser(user) {
      User.current = user;
      $rootScope.$emit('userStateChange', user);
    }

  }
})();
