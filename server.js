var http = require('http');
var path = require('path');
var commander = require('commander');
var express = require('express');
var packageFile = require('./package.json');

//argv parsing
commander
	.version(packageFile.version)
	.option('-p, --port [value]', 'Specify a port on wich to run the server', parseInt)
	.option('--appid [value]', 'Specify the application ID')
	.option('--secret [value]', 'Specify the application secret key')
	.parse(process.argv);

//web server settings
var app = express();

app.configure(function(){
	app.set('name', packageFile.name);
	app.set('version', packageFile.version);
	app.set('port', commander.port || process.env.PORT || 80);
	app.set('appCredentials', {
		id: commander.appid,
		secret: commander.secret
	});
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hjs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//setting the routes
require('./routes')(app);

//starting the server
var server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log("Server listening on %s:%d", server.address().address, server.address().port);
});