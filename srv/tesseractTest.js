var nodecr = require('nodecr');
var textopt = require('./textPreprocessor').textopt;
var translate = require('./translate').translate;

nodecr.process(__dirname + '/img.png', function(err, text) {
    if(err) {
      console.error(err);
    } else {
      console.log('text----', text);
      translate(text, function (str) {
        console.log('translated', str);
      });
    }
}, null, null, './tess_config', textopt);
