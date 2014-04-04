(function () {
  'use strict';
  window.capturama = window.capturama || {};

  capturama.myword = function () {
    var addWordUrl = '../my_words';

    var addWordList = new capturama.addWordList($('.my-words'));

    $.ajax({
      url: addWordUrl,
      type: 'GET',
      success: function (data) {
        var trans = _.map(data, function (d) {
          return {translation: d.l1_text};
        });
        addWordList.update(trans);
      }
    });
  };
})();
