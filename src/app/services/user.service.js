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
      return User.current.avatar || 'assets/images/avatar.jpg';
    }

    function getDisplayName() {
      if (!User.current) {
        return "";
      }
      if (!User.current.displayName) {
        if (User.current.firstname && User.current.lastname) {
          User.current.displayName = User.current.firstname + " " + User.current.lastname;
        } else if (User.current.username || User.current.email) {
          User.current.displayName = User.current.username || User.current.email;
        }
      }

      return User.current.displayName;
    }

    function assignCurrentUser(user) {
      User.current = user;
      $rootScope.$emit('userStateChange', user);
    }

  }
})();
