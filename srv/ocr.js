var nodecr = require('nodecr');
var textopt = require('./textPreprocessor').textopt;

var Ocr = function () {
  this.process = function (path, cb) {
    nodecr.process(path, function(err, text) {
        if(err) {
          console.error(err);
        } else {
          cb(text);
        }
    }, null, 6, null, textopt);
  };
};

exports.Ocr = new Ocr();
