(function () {
  'use strict';

  capturama.translateWordList = function (container) {
    var addWordList = new capturama.addWordList(container);
    this.update = function (matches) {
      container.empty();
      var innerContainer = $('<div class="translate-container"></div>');
      var img = $('<img src="img.png"/>');
      var count = $('<p>' + matches.length + ' words detected</p>');
      var list = $('<ul></ul>');


      innerContainer.append(img, count, list);
      container.append(innerContainer);
      _.each(matches, function (match) {
        var button = createTranslateWordButton(match);
        var el = $('<li></li>');
        el.append(button);
        list.append(el);
      });
    };

    var createTranslateWordButton = function (word) {
      var btn = $('<button class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span>' + word + '</button>');
      btn.on('click', function () {
        capturama.translate(word, function (matches) {
          addWordList.update(matches);
        });
      });
      return btn;
    };
  };
})();
