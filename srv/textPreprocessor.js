var exec  = require('child_process').exec;
var fs = require('fs');
var tmp = require('tmp');

var TextPreprocessor = function () {
  this.textopt = function (inputFile, callback)  {
    tmp.tmpName({postfix: '.png'}, function (err, outputFile) {
      if(err) {
        // Something went wrong when generating the temporary filename
        callback(err, null);
        return;
      }

      command = [
        './textcleaner.sh -g -e none -o 3',
        inputFile,
        outputFile,
      ].join(' ');

      console.log('derp running commaing', command);

      exec(command, function (err, stdout, stderr) {
        var cleanup = function () {};
        if (err) {
          // Something went wrong executing the convert command
          callback(err, null);
        } else {
           cleanup = function () {
            fs.unlink(outputFile, function (err) {
              // # ignore any errors here as it just means we have a temporary file left somewehere
              return;
            });
            return;
          };
        }
        callback(null, outputFile, cleanup);
      });
    });
  };

};

exports.textPreprocessor = new TextPreprocessor();
