(function () {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatControllerFn);

  /** @ngInject */
  function ChatControllerFn() {
    var vm = this;
    // Data
    vm.contacts = [
      {
        chatId: 111111,
        memberCount: 1,
        people: {
          111: {
            name: "Jane Doe",
            status: "online",
            thumb: "http://altair_app.tzdthemes.com/assets/img/avatars/avatar_11_tn.png"
          }
        },
        unread: 0
      },
      {
        chatId: 123456,
        memberCount: 4,
        people: {
          111: {
            name: "Jane Doe",
            status: "online",
            thumb: "http://altair_app.tzdthemes.com/assets/img/avatars/avatar_11_tn.png"
          },
          555: {
            name: "Saiat Kalbiev",
            status: "offline",
            thumb: "https://fb-s-d-a.akamaihd.net/h-ak-fbx/v/t1.0-1/p50x50/17553468_668645216652465_8933820913750134927_n.jpg?oh=c6024a86d101546dfaeee125852689b9&oe=59B8F4A3&__gda__=1504747412_17cf5227aad098db5e1e17c52c970399"
          },
          333: {
            name: "Zura Sekhniashvili",
            status: "busy",
            thumb: "https://avatars2.githubusercontent.com/u/4627922?v=3&s=40"
          },
          222: {
            name: "Giorgi Batiashvili",
            status: "online",
            thumb: "https://avatars1.githubusercontent.com/u/14313425?v=3&s=40"
          }
        },
        unread: 14
      },
      {
        chatId: 222222,
        memberCount: 1,
        people: {
          222: {
            name: "Giorgi Batiashvili",
            status: "online",
            thumb: "https://avatars1.githubusercontent.com/u/14313425?v=3&s=40"
          }
        },
        unread: 0
      },
      {
        chatId: 333333,
        memberCount: 1,
        people: {
          333: {
            name: "Zura Sekhniashvili",
            status: "busy",
            thumb: "https://avatars2.githubusercontent.com/u/4627922?v=3&s=40"
          }
        },
        unread: 3
      },
      {
        chatId: 444444,
        memberCount: 1,
        people: {
          444: {
            name: "Nick Doe",
            status: "online",
            thumb: "http://altair_app.tzdthemes.com/assets/img/avatars/avatar_05_tn.png",
          }
        },
        unread: 0
      },
      {
        chatId: 555555,
        memberCount: 1,
        people: {
          555: {
            name: "Saiat Kalbiev",
            status: "offline",
            thumb: "https://fb-s-d-a.akamaihd.net/h-ak-fbx/v/t1.0-1/p50x50/17553468_668645216652465_8933820913750134927_n.jpg?oh=c6024a86d101546dfaeee125852689b9&oe=59B8F4A3&__gda__=1504747412_17cf5227aad098db5e1e17c52c970399"
          }
        },
        unread: 32
      }
    ];
    vm.chats = {
      111111: [
        {
          messageId: 0,
          messageBody: "Hello World !!!",
          messageBy: 111,
          messageTime: "2017-05-05"
        },
        {
          messageId: 1,
          messageBody: "Oh Hello !!! :P",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 2,
          messageBody: "How are you ?",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 3,
          messageBody: "Oh Im fine, thanks ! What about you ?",
          messageBy: 111,
          messageTime: "2017-05-06"
        },
        {
          messageId: 4,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius.",
          messageBy: 111,
          messageTime: "2017-05-06"
        },
        {
          messageId: 5,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius " +
          "enim esse ex excepturi, hic in incidunt laboriosam modi nam obcaecati, quod reprehenderit sapiente soluta " +
          "vitae? Facere, rerum?",
          messageBy: 0,
          messageTime: "2017-05-07"
        }
      ],
      222222: [
        {
          messageId: 0,
          messageBody: "Hello World !!!",
          messageBy: 0,
          messageTime: "2017-05-05"
        },
        {
          messageId: 1,
          messageBody: "Oh Hello !!! :P",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 2,
          messageBody: "How are you ?",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 3,
          messageBody: "Oh Im fine, thanks ! What about you ?",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 4,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius.",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 5,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius " +
          "enim esse ex excepturi, hic in incidunt laboriosam modi nam obcaecati, quod reprehenderit sapiente soluta " +
          "vitae? Facere, rerum?",
          messageBy: 0,
          messageTime: "2017-05-07"
        }
      ],
      333333: [
        {
          messageId: 0,
          messageBody: "Hello World !!!",
          messageBy: 333,
          messageTime: "2017-05-05"
        },
        {
          messageId: 1,
          messageBody: "Oh Hello !!! :P",
          messageBy: 333,
          messageTime: "2017-05-06"
        },
        {
          messageId: 2,
          messageBody: "How are you ?",
          messageBy: 333,
          messageTime: "2017-05-06"
        },
        {
          messageId: 3,
          messageBody: "Oh Im fine, thanks ! What about you ?",
          messageBy: 333,
          messageTime: "2017-05-06"
        },
        {
          messageId: 4,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius.",
          messageBy: 333,
          messageTime: "2017-05-06"
        },
        {
          messageId: 5,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius " +
          "enim esse ex excepturi, hic in incidunt laboriosam modi nam obcaecati, quod reprehenderit sapiente soluta " +
          "vitae? Facere, rerum?",
          messageBy: 333,
          messageTime: "2017-05-07"
        }
      ],
      444444: [
        {
          messageId: 0,
          messageBody: "Hello World !!!",
          messageBy: 444,
          messageTime: "2017-05-05"
        },
        {
          messageId: 1,
          messageBody: "Oh Hello !!! :P",
          messageBy: 444,
          messageTime: "2017-05-06"
        },
        {
          messageId: 2,
          messageBody: "How are you ?",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 3,
          messageBody: "Oh Im fine, thanks ! What about you ?",
          messageBy: 444,
          messageTime: "2017-05-06"
        },
        {
          messageId: 4,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius.",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 5,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius " +
          "enim esse ex excepturi, hic in incidunt laboriosam modi nam obcaecati, quod reprehenderit sapiente soluta " +
          "vitae? Facere, rerum?",
          messageBy: 444,
          messageTime: "2017-05-07"
        }
      ],
      555555: [
        {
          messageId: 0,
          messageBody: "Hello World !!!",
          messageBy: 555,
          messageTime: "2017-05-05"
        },
        {
          messageId: 1,
          messageBody: "Oh Hello !!! :P",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 2,
          messageBody: "How are you ?",
          messageBy: 555,
          messageTime: "2017-05-06"
        },
        {
          messageId: 3,
          messageBody: "Oh Im fine, thanks ! What about you ?",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 4,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius.",
          messageBy: 555,
          messageTime: "2017-05-06"
        },
        {
          messageId: 5,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius " +
          "enim esse ex excepturi, hic in incidunt laboriosam modi nam obcaecati, quod reprehenderit sapiente soluta " +
          "vitae? Facere, rerum?",
          messageBy: 555,
          messageTime: "2017-05-07"
        }
      ],
      123456: [
        {
          messageId: 0,
          messageBody: "Hello World !!!",
          messageBy: 222,
          messageTime: "2017-05-05"
        },
        {
          messageId: 1,
          messageBody: "Oh Hello !!! :P",
          messageBy: 111,
          messageTime: "2017-05-06"
        },
        {
          messageId: 2,
          messageBody: "How are you ?",
          messageBy: 0,
          messageTime: "2017-05-06"
        },
        {
          messageId: 3,
          messageBody: "Oh Im fine, thanks ! What about you ?",
          messageBy: 333,
          messageTime: "2017-05-06"
        },
        {
          messageId: 4,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius.",
          messageBy: 222,
          messageTime: "2017-05-06"
        },
        {
          messageId: 5,
          messageBody: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur corporis eius " +
          "enim esse ex excepturi, hic in incidunt laboriosam modi nam obcaecati, quod reprehenderit sapiente soluta " +
          "vitae? Facere, rerum?",
          messageBy: 555,
          messageTime: "2017-05-07"
        }
      ]
    };
    vm.openedChat = {};
    // Methods

    init();

    ///////////

    function init() {

    }

  }
})();
