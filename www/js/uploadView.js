(function () {
  'use strict';
  capturama.uploadView = function () {
    var uploadForm = $('form');
    var translateWordList;

    var initEvents = function () {
      translateWordList = new capturama.translateWordList();
      uploadForm.on('submit', function (e) {
        e.preventDefault();

        var formData = new FormData($(this)[0]);
        $.ajax({
          url: '../upload',
          type: 'POST',
          data: formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (returndata) {
            translateWordList.update(returndata);
          }
        });

        return false;
      });

    };

    initEvents();
  };
})();
