var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');

var mongohost = process.env.MONGODB_HOST || config.mongo.uri;
var mongodb = process.env.MONGODB_DB || config.mongo.db;

mongoose.connect('mongodb://127.0.0.1:27017/admin', function (err, res) {
	if (err) throw err;
	console.log('Connected to MongoDB');
});

var app = express();

app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

app.use(cookieParser());

app.use('/', require('./routes/index'));

app.use(function (req, res, next) {
	res.status(404);
	next();
})

app.set('port', process.env.PORT || config.app.port);

var server = app.listen(app.get('port'), function () {
	console.log('service RESTful API serer started on: ' + server.address().port);
});
