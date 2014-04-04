(function () {
  'use strict';
  capturama.translate = function (word, cb) {
    var path = '../translate';
    cb = cb || function () {};

    var param = $.param({word: word});
    $.ajax({
      url: path + '?' + param,
      type: 'GET',
      success: function (data) {
        cb(data);
      }
    });
  };
})();
