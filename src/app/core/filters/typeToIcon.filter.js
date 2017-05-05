/**
 * Created by george on 4/20/17.
 */

(function () {
  'use strict';
  angular
    .module('app.core')
    .filter('typeToIcon', typeToIcon);

  /** @ngInject */
  function typeToIcon() {
    var map = {
      'Folder': 'folder-open',
      'Image': 'file-image-o',
      'Word': 'file-word-o',
      'Excel': 'file-excel-o',
      'Pdf': 'file-pdf-o',
      'Power Point': 'file-powerpoint-o',
      'Video': 'file-video-o',
      'Audio': 'file-audio-o',
      'Javascript': 'NOTDEFINED',
      'HTML': 'html5',
      'Css': 'css3',
      'C#': 'NOTDEFINED',
      'XML': 'NOTDEFINED',
      'Code': 'file-code-o',
      'Archive': 'file-archive-o',
      'Other': 'file-o',
      'Document': 'file-text-o'
    };
    return function (type) {
      return map[type];
    }
  }

})();