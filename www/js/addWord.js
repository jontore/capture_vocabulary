(function () {
  'use strict';
  capturama.addWord = function (data) {
    var addWordUrl = '../add_word';
    $.ajax({
      url: addWordUrl,
      type: 'POST',
      data: data,
      success: function (data) {
        cb(data);
      }
    });
  };
})();
