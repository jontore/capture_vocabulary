var nodecr = require('nodecr');
var textopt = require('./textPreprocessor').textopt;

nodecr.process(__dirname + '/img.jpg', function(err, text) {
    if(err) {
      console.error(err);
    } else {
      console.log('text----', text);
    }
}, null, null, './tess_config', textopt);
