(function () {
  window.capturama = window.capturama || {};

  capturama.imageProcessing = function (data, cb) {
    var imgUrl = '../img';
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
})();
