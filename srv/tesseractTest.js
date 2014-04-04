var nodecr = require('nodecr');
var textopt = require('./textPreprocessor').textopt;

nodecr.process(__dirname + '/img.png', function(err, text) {
    if(err) {
      console.error(err);
    } else {
      console.log('text----', text);
    }
}, null, 6, null, textopt);
