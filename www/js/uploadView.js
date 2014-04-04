(function () {
  'use strict';
  capturama.uploadView = function () {
    var uploadForm = $('form');
    var addWordList;

    var initEvents = function () {
      addWordList = new capturama.addWordList();
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
            addWordList.update(returndata);
          }
        });

        return false;
      });

    };

    initEvents();
  };
})();
