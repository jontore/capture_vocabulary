(function () {
  'use strict';
  capturama.translate = function () {
    var imgUrl = '../img';
    this.image = function (data, cb) {
      cb = cb || function () {};
      $.ajax({
        url: imgUrl,
        type: 'POST',
        data: {
          img: data,
        },
        success: function (data) {
          cb(data);
        }
      });
    };

    this.string = function () {
    };
  };
  capturama.translate = new capturama.translate();
})();
