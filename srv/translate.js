var http = require('http');
var qs = require('querystring');
var _ = require('underscore');


var Tranlate = function () {

  this.translate = function (str, cb) {
    var options = {
      host: 'api.mymemory.translated.net',
      path: '/get'
    };

    var callback = function(response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        var obj = JSON.parse(str);
        var translations = _.map(obj.matches, function (match) {
          return {
            translation: match.translation,
            original: match.segment
          };
        });
        cb(translations);
      });
    };

    options.path += '?' + qs.stringify({ q: str, langpair: 'de|en' });

    http.request(options, callback).end();
  };
};


exports.translate = new Tranlate().translate;
