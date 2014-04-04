(function () {
  'use strict';
  capturama.translate = function () {
    var imgUrl = '../img';
    this.image = function (data) {
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
})();
