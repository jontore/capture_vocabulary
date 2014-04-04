var express = require('express');
var app = express();
var nano = require('nano')('http://admin:password@localhost:5984');

var Routes = require('./routes').Routes;

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static('../www'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var db = nano.db.use('capture_vocabulary');
new Routes(app, db);

app.listen(4000);
