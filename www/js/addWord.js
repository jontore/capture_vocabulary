(function () {
  'use strict';
  capturama.addWord = function (data, cb) {
    cb = cb || function () {};
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
