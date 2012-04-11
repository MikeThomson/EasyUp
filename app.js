
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , format = require('util').format
  , mongoose = require("mongoose")
  , gridfs = require("./gridfs")
  , shortener = require('./shortener')
  ;

mongoose.connect("mongodb://localhost/testing");

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/index2', routes.index2);
app.get('/file/upload', routes.fileUpload);
app.post('/file/upload', routes.fileUploadPost);
app.get('/d/:id', routes.shortDownload);

app.get('/test', function(res, req) {
	shortener.generate('123123123', function(id){console.log('Logged: ' + id);});
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
