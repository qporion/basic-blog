var express = require("express");
var MongoClient = require("mongodb");
var bodyParser = require('body-parser')
var cons = require('consolidate');
var path = require('path');

var app = express();
var url = process.env.URL || "mongodb://localhost";
var dbName = process.env.DBNAME || "articles";
var port = process.env.PORT || 8080;

app.engine('pug', cons.pug);
app.set('view engine', 'pug');
app.set('views',  __dirname +  '/views')
app.use('/bootstrap', express.static(__dirname + '/views/bootstrap'));
app.use('/css', express.static(__dirname + '/views/css'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var routes = require("./routes");


MongoClient.connect(url, function(err, client) {
  if(err) throw err;

  routes(app);
  
  app.client = client;
  app.db = client.db(dbName);

  app.listen(port, function() {
    console.log("now listening on http://localhost:" + port)
  });
});

module.exports = app;
