(function () {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatControllerFn);

  /** @ngInject */
  function ChatControllerFn($scope, $http, Users, Chats) {
    var vm = this;
    // Data
    vm.users = Users.data;
    vm.chats = Chats.data;

    vm.selected = null;
    vm.userMessages = {};

    vm.currentView = "chat-view";

    // Methods
    vm.openChat = openChat;
    vm.sendMessage = sendMessage;
    vm.getRandom = getRandom;

    init();

    ///////////

    function init() {

    }

    function openChat(chatId, chat) {
      vm.userMessages = $http.get('app/main/apps/chat/data/messages/' + chatId + '.json')
        .then(function (response) {
          vm.selected = chat;
          return response.data;
        }, function (error) {
          alert("Chat doesn't exist, creating new chat");
          generateJson(chatId+".json");
          return 'There was an error getting data' + error;
        });
      console.log("Loaded Messages : ",vm.userMessages);
    }

    function sendMessage(msg, who) {
      console.log(vm.userMessages, vm.userMessages.$$state.value.data, msg, who);
      vm.userMessages.$$state.value.data.push({
        "id": 1,
        "who": who,
        "what": msg,
        "when": 123123123123
      });
    }

    function getRandom() {
      return Math.floor((Math.random()*vm.selected.members.length));
    }

    function generateJson(name) {
        var newChat = {
          "data": []
        };
        var blob = new Blob([angular.toJson(newChat, true)], {type: 'text/text'});
          var e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
          a.download = name;
          a.href = window.URL.createObjectURL(blob);
          a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
          e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          a.dispatchEvent(e);
          //window.URL.revokeObjectURL(url); // clean the url.createObjectURL resource
    }
  }
})();
