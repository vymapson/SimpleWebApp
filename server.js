//server.js for SimpleWebApp2

//create the express app
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

//init module
var bodyParser = require('body-parser');

//express configuration
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//launch on local port
app.listen(port);
console.log('app listening on port ' + port);



