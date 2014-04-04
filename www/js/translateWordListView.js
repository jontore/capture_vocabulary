(function () {
  'use strict';

  capturama.translateWordList = function () {
    var addWordList = new capturama.addWordList();
    this.update = function (matches) {
      var list = $('.translate-list');
      list.empty();
      _.each(matches, function (match) {
        var button = createTranslateWordButton(match);
        var el = $('<li></li>');
        el.append(button);
        list.append(el);
      });
    };

    var createTranslateWordButton = function (word) {
      var btn = $('<button class="btn btn-primary">' + word + '</button>');
      btn.on('click', function () {
        capturama.translate(word, function (matches) {
          addWordList.update(matches);
        });
      });
      return btn;
    };
  };
})();
