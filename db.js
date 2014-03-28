var _ = require('underscore');

var Db = function (db) {
  this.internetAndIpa = db;
};

Db.prototype.findAllBars = function(cb) {
  cb = cb || function () {};
  this.internetAndIpa.view('bar', 'data', cb);
};

Db.prototype.addBar = function(doc, cb) {
  if (doc && !doc.author) {
    doc.author = 'admin';
  }

  var tenMeterBoundary = 0.0001;
  this.findClosestBar(doc.position, tenMeterBoundary, _.bind(function (err, body) {
    if (body && body.rows && body.rows.length > 0 ) {
      _.each(body.rows, _.bind(function (row) {
        var exObj = row.value;
        doc.internetRating = (parseInt(doc.internetRating, 10) + parseInt(exObj.internetRating, 10)) / 2;
        doc.ipaRating = (parseInt(doc.ipaRating, 10) + parseInt(exObj.ipaRating, 10)) / 2;

        if (_.isArray(doc.description)) {
          doc.description.push(exObj.description);
        } else {
          doc.description = [doc.description, exObj.description];
        }

        this.internetAndIpa.destroy(exObj._id, exObj._rev);
      }, this));
      this.internetAndIpa.insert(doc, cb);
    } else {
      this.internetAndIpa.insert(doc, cb);
    }
  }, this))
};

Db.prototype.getBar = function(query, cb) {
  this.internetAndIpa.get(query, cb);
};

Db.prototype.findClosestBar = function (position, range, cb) {
  cb = cb || function () {};

  var latitude = parseFloat(position.latitude, 10);
  var longitude = parseFloat(position.longitude, 10);
  range = parseFloat(range, 10);

  var start = [longitude - range, latitude - range];
  var end = [longitude + range, latitude + range];

  this.internetAndIpa.view('bar', 'closest', {
    startkey: start,
    endkey: end
  }, cb);
};

module.exports.Db = Db;
