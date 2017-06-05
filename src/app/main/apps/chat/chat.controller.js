(function () {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatControllerFn);

  /** @ngInject */
  function ChatControllerFn($scope, $translate, $log, $http, Users, Chats, omAside, apiService) {
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

      //Auto Resize TextArea
      $scope.$watch("vm.messageToSend", function (newValue) {
        var element = document.getElementById("chat-textarea");
        var chatContent = document.getElementById("chat-content");
        //console.log(newValue);
        if(newValue === ""){
          element.style.height = "60px";
          chatContent.style.height = "100%";
        }else {
          element.style.height = element.scrollHeight + "px";
          var chatOffset = element.scrollHeight - 60;
          chatContent.style.height = chatOffset > 0 ? "calc(100% - " + chatOffset + "px)" : "100%";
        }
      });
      //--Auto Resize TextArea

    }

    function openChat(chatId, chat) {
      vm.seeUserInfo = null;
      vm.messageToSend = "";
      console.log(apiService.resolve('chat').get({id:chatId}));
      apiService.resolve('chat').get({id:chatId}, function(response){
        vm.userMessages = response.data;
      });
        // .then(function (response) {
        //   console.log(arguments);
        //   vm.userMessages = response.data;
        // });

      vm.selected = chat;
      vm.chatName = chat.name;
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
        vm.userMessages.push({
          "id": vm.userMessages.length + 1,
          "who": who,
          "what": msg,
          "when": moment().format('HH:mm, DD/MM/YYYY')
        });
        vm.messageToSend = "";
      }
    }

    function deleteChat(selected) {
      $translate(['CHAT.DELETE_TITLE', 'CHAT.DELETE_MSG', 'CHAT.DELETE_YES', 'CHAT.DELETE_NO']).then(function (translations) {
      var del = Lobibox.confirm({
        title: translations['CHAT.DELETE_TITLE'],
        msg: translations['CHAT.DELETE_MSG']+selected.name+"' ?",
        buttons: {
          yes: {
            text: translations['CHAT.DELETE_YES']
          },
          no: {
            text: translations['CHAT.DELETE_NO']
          }
        },
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
      });
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
