/**
 * Created by zura on 9/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('angularLobiadmin')
    .factory('Auth', Auth);

  /** @ngInject */
  function Auth($q, $http, $window, Util, User) {
    var Auth = {
      AUTH_REQUIRED: 'AUTH_REQUIRED',
      ALREADY_AUTHENTICATED: 'ALREADY_AUTHENTICATED',


      loginState: 'auth.login',
      mainState: 'app.dashboard',
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      requireSignIn: requireSignIn,
      requireNotSignIn: requireNotSignIn
    };

    return Auth;

    function isLoggedIn() {
      return $http.get(Util.formatUrl('main/pages/auth/login/data/is-logged-in.json'))
        .then(function (response) {
          var result = response.data;

          if (result.success){
            User.assignCurrentUser(result.user);
          }

          return result;
        });
    }

    function login(data) {

      // Update the .get method into .post and change the url
      return $http.get(Util.formatUrl('main/pages/auth/login/data/login.json'), data)
        .then(function(response){
          var result = response.data;

          if (result.success){
            $window.sessionStorage.accessToken = result.accessToken;
            User.assignCurrentUser(result.user);
          }
          return result;
        });
    }

    function logout() {
      return $http
        .post(Util.formatUrl('user/logout'))
        .then(function(response){
          var result = response.data;

          if (result.success){
            User.assignCurrentUser(null);
          }

          return result;
        });
    }

    function requireSignIn() {
      return isLoggedIn()
        .then(function (result) {
          if (result.success) {
            return $q.resolve(result);
          } else {
            return $q.reject(Auth.AUTH_REQUIRED);
          }
        });
    }

    function requireNotSignIn() {
      return isLoggedIn()
        .then(function (result) {
          if (result.success) {
            return $q.reject(Auth.ALREADY_AUTHENTICATED);
          }
          return $q.resolve(result);
        });
    }
  }
})();
