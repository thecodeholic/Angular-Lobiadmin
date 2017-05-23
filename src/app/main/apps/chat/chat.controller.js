(function () {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatControllerFn);

  /** @ngInject */
  function ChatControllerFn($scope, $log, $http, Users, Chats, omAside) {
    var vm = this;
    // Data
    vm.users = Users.data; //for ng-repeat in html
    vm.usersArray = $.map(vm.users, function (value, index) { //for searching through
      return [value];
    });

    vm.chats = Chats.data;

    vm.isChatsAccordionOpened = true;
    vm.isContactsAccordionOpened = true;
    vm.searched = "";

    vm.selected = null;
    vm.chatName = "";
    vm.chatNameEditing = false;
    vm.userMessages = {};
    vm.messageToSend = "";
    vm.messageInputClicked = false;

    vm.currentView = "chat-view";
    vm.isOffCanvasMenuOpened = false;
    vm.seeUserInfo = null;

    // Methods
    vm.openChat = openChat;
    vm.sendMessage = sendMessage;
    vm.deleteChat = deleteChat;
    vm.toggleAside = toggleAside;
    vm.hasOffCanvasClass = hasOffCanvasClass;
    vm.isChatNameEditing = isChatNameEditing;

    init();

    ///////////

    function init() {

    }

    function openChat(chatId, chat) {
      vm.seeUserInfo = null;
      vm.messageToSend = "";
      vm.userMessages = $http.get('app/main/apps/chat/data/messages/' + chatId + '.json')
        .then(function (response) {
          vm.selected = chat;
          vm.chatName = chat.name;
          return response.data;
        }, function (error) {
          return 'There was an error getting data' + error;
        });
      console.log("Loaded Messages : ",vm.userMessages);
    }

    function isChatNameEditing(confirm) {
      if(confirm) {
        if (vm.chatName != "") {
          vm.selected.name = vm.chatName;
          vm.chatNameEditing = false;
        } else {
          vm.chatName = vm.selected.name;
          vm.chatNameEditing = false;
        }
      }else{
        vm.chatName = vm.selected.name;
        vm.chatNameEditing = false;
      }
    }

    function sendMessage(msg, who, $event, buttonClicked) {
      if ($event.keyCode == 13) $event.preventDefault();

      if ((buttonClicked || $event.keyCode == 13) && msg != "")
      {
        vm.userMessages.$$state.value.data.push({
          "id": vm.userMessages.$$state.value.data.length + 1,
          "who": who,
          "what": msg,
          "when": moment().format('HH:mm, DD/MM/YYYY')
        });

        vm.messageToSend = "";
      }
    }

    function deleteChat(selected) {
      var del = Lobibox.confirm({
        title: "Delete Chat ?",
        msg: "Do you want to delete chat '"+selected.name+"' ?",
        callback: function ($this, type, ev) {
          if(type == "yes"){
            var i = vm.chats.indexOf(selected);
            if(i > -1) {
              vm.chats.splice(i, 1);
              vm.selected = null;
              vm.seeUserInfo = null;
            }
          }
        }
      });
      del.show();
    }

    function toggleAside(id) {
      vm.seeUserInfo = null;
      omAside.toggle(id);
      vm.hasOffCanvasClass(id);
    }

    function hasOffCanvasClass(id) {
      if (angular.element('#' + id).hasClass('is-off-canvas')) {
        vm.isOffCanvasMenuOpened = true;
      }
      $log.debug(vm.isOffCanvasMenuOpened);
    }
  }
})();
