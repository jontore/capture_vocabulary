var _ = require('underscore');
var Db = require('./db').Db;
var ocr = require('./ocr').Ocr;
var fs = require('fs');
var translate = require('./translate').translate;
var babbelStore = require('./babbelStore').babbelStore;


var imgPath = __dirname + '/../www/page/img.png';
var Routes = function(app, db) {
  this.playlists = {};
  this.db = new Db(db);
  this.app = app;
  this.initRoutes();
};

Routes.prototype.initRoutes = function () {
  this.app.post('/img', _.bind(function(req, res) {
    var data_url = req.body.img;
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    var ext = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');

    fs.writeFile(imgPath, buffer, function (err) {
      ocr.process(imgPath, function(text) {
        res.statusCode = 200;
        var matches = text.split(' ');
        res.send(matches);
      });
    });
  }));

  this.app.post('/upload', _.bind(function(req, res) {
    fs.createReadStream(req.files.img.path).pipe(fs.createWriteStream(imgPath));
    ocr.process(req.files.img.path, function(text) {
      res.statusCode = 200;
      var matches = text.split(' ');
      matches = _.map(matches, function (w) {
        return w.trim();
      });
      res.send(matches);
    });
  }));

  this.app.get('/translate', _.bind(function(req, res) {
    res.statusCode = 200;
    var param = req.query;
    translate(param.word, function (matches) {
      res.send(matches);
    });
  }));

  this.app.get('/my_words', _.bind(function(req, res) {
    res.statusCode = 200;
    babbelStore.getAllWords(function (myWords) {
      res.send(myWords);
    });
  }));

  this.app.post('/add_word', _.bind(function(req, res) {
    res.statusCode = 200;
    babbelStore.addWordIfNotThere(req.body, function (data) {
      res.send(data);
    });
  }));
};

exports.Routes = Routes;
