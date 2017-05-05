(function () {
  'use strict';

  angular
    .module('angularLobiadmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, $log, Auth, User) {

    // Store state in the root scope for easy access
    $rootScope.state = $state;
    $rootScope.user = User;

    var onStateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState) {
      $rootScope.showPageLoader = true;
      $log.debug("State change start");

      //extract parent state name if it's a child state
      var currentState = toState.name;

      if (!$state.get(currentState)) {
        event.preventDefault();
      }

    });

    var onStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.showPageLoader = false;
      $log.debug("State change success");
      // console.log(toState, toParams, User.current);
    });

    var onStateNotFound = $rootScope.$on('$stateNotFound', function () {
      // console.log(arguments);
      $log.error("State not found");
      $state.go('app.error404');
    });

    var onStateChangeError = $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      $log.error("$stateChangeError ", error);
      $rootScope.showPageLoader = false;
      var currentState = toState.name;

      if (!$state.get(currentState) || error) {
        event.preventDefault();
      }


      if (error === Auth.AUTH_REQUIRED) {
        $state.go(Auth.loginState);
      } else if (error === Auth.ALREADY_AUTHENTICATED){
        $state.go(Auth.mainState);
      }
    });


    $rootScope.$on('$destroy', function () {
      onStateChangeStart();
      onStateChangeSuccess();
      onStateNotFound();
      onStateChangeError();
    });

  }

})();
