(function () {
  'use strict';
  capturama.addWordList = function (container) {
    var message;
    this.update = function (matches) {
      container.empty();
      var innerContainer = $('<div class="add-word-container"></div>');
      var list = $('<ul></ul>');
      message = $('<h2></h2>');
      innerContainer.append(message, list);
      container.append(innerContainer);

      list.empty();

      if (matches.length === 0) {
          list.append('<li>No mactch</li>');
      }
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
        capturama.addWord(word, function () {
          btn.addClass('btn-success');
          message.text('You added ' + word.translation);
        });
      });
      return btn;
    };
  };
})();
