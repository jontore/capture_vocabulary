(function () {
  'use strict';

  capturama.addWordList = function () {
    this.update = function (matches) {
      var list = $('.word-list');
      list.empty();
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
})();
