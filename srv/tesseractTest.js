var nodecr = require('nodecr');
var textopt = require('./textPreprocessor').textopt;
var translate = require('./translate').translate;
var babbelStore = require('./babbelStore').babbelStore;
var _ = require('underscore');

nodecr.process(__dirname + '/img.png', function(err, text) {
    if(err) {
      console.error(err);
    } else {
      translate(text, function (matches) {
        babbelStore.addWordIfNotThere(matches[0], function (d) {
          console.log('done', d);
          babbelStore.getAllWords(function (myWords) {
            console.log(myWords);
          });
        });
      });
    }
}, null, null, './tess_config', textopt);
