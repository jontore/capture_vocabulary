var http = require('http');
var qs = require('querystring');
var _ = require('underscore');

var BabbelStore = function () {
  var options = {
    host: '192.168.2.34',
    port: 8080
  };
  var get = function (path, data, cb) {
    cb = cb || function () {};

    var callback = function(response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        var obj = JSON.parse(str);
        cb(obj);
      });
    };

    options.path = path;

    if (data) {
      options.path += '?' + qs.stringify(data);
    }

    console.log(options);
    http.request(options, callback).end();
  };


  this.addWord = function (word, cb) {
    get('/set_word', {l1: word.translation, l2: word.original}, cb);
  };

  this.getAllWords = function (cb) {
    get('/get_all_words', null, function (obj) {
      cb(obj);
    });
  };

  this.checkForWord = function (word, cb) {
    get('/check_for_word/' + qs.escape(word), null, cb);
  };

  this.addWordIfNotThere = function (word, cb) {
    cb = cb || function () {};
    this.checkForWord(word.translation, _.bind(function (data) {
      if (data.match === 'true') {
        this.addWord(word, function (o) {
          o.added = true;
          cb(o);
        });
      } else {
        cb({
          added: false
        });
      }
    }, this));
  };
};


exports.babbelStore = new BabbelStore();
