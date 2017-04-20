/**
 * Created by george on 4/20/17.
 */

(function () {
  'use strict';
  angular
    .module('app.fileManager')
    .filter('typeToIcon', typeToIcon);

  /** @ngInject */
  function typeToIcon() {
    var map = {
      'Folder': 'folder',
      'Image': 'file-image-box',
      'Word': 'file-word-box',
      'Excel': 'file-excel-box',
      'Pdf': 'file-pdf-box',
      'Power Point': 'file-powerpoint-box',
      'Video': 'filmstrip',
      'Audio': 'file-music',
      'Javascript': 'language-javascript',
      'HTML': 'language-html5',
      'Cascading Style Sheets': 'language-css3',
      'C#': 'language-csharp',
      'XML': 'code-tags',
      'Code': 'code-braces',
      'Archive': 'zip-box',
      'Other': 'file',
      'document': 'document'
    };
    return function (type) {
      return map[type];
    }
  }

})();