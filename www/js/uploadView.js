(function () {
  'use strict';
  capturama.uploadView = function () {
    var uploadForm = $('form');

    var initEvents = function () {
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
            updateWordList(returndata);
          }
        });

        return false;
      });

      var updateWordList = function (matches) {
        var list = $('.word-list');
        _.each(matches, function (match) {
          var button = createAddWordButton(match);
          var el = $('<li></li>');
          el.append(button);
          list.append(el);
        });
      };

      var createAddWordButton = function (word) {
        var btn = $('<button class="btn btn-primary">' + word.translation + '</button>');
        btn.on('click', function () {
          capturama.addWord(word);
        });
        return btn;
      };
    };

    initEvents();
  };
})();
