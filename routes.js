var _ = require('underscore');
var Db = require('./db').Db;
var nodecr = require('nodecr');
var fs = require('fs');

var Routes = function(app, db) {
  this.playlists = {};
  this.db = new Db(db);
  this.app = app;
  this.initRoutes();
};

Routes.prototype.initRoutes = function () {
  this.app.post('/img', _.bind(function(req, res) {;
    var data_url = req.body.img;
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    var ext = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');

    fs.writeFile(__dirname + '/img.png', buffer, function (err) {
      nodecr.process(__dirname + '/img.png', function(err, text) {
          if(err) {
            console.error(err);
          } else {
            res.statusCode = 200;
            console.log('text----', text);
            res.send({
              translated: text
            });
          }
      });
    });

  }));
};

exports.Routes = Routes;
