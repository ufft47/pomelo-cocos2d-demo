var express = require('express');
var app = express.createServer();

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/client/project');
  app.set('view options', {layout: false});
  app.set('basepath', __dirname + '/client/project');
});

app.configure('development', function() {
  app.use(express.static(__dirname + '/client/project'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	var oneYear = 31557600000;
	app.use(express.static(__dirname + '/client/project', { maxAge: oneYear }));
	app.use(express.errorHandler());
});


console.log("Web server has started.\n Please log on http://127.0.0.1:3001/");

app.listen(3001);
