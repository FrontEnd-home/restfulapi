var express = require('express')
  , config = require("./config")
  , bodyParser = require('body-parser')
  , db = require('./dao/db')
  , category = require('./controllers/category')
  , categoryDao = require("./dao/categoryDao")
  , article = require('./controllers/article')
  , articleDao = require("./dao/articleDao");


var app = express();


//app.configure(function(){

app.set('port', config.port);

// parse application/json
//app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json())
//  app.use(bodyParser.urlencoded({ extended: true }));

//  app.use(express.logger('dev'));  //??
//  app.use(express.methodOverride()); //??
//  app.use(app.router);

//});




//app.configure('development', function(){ //??
//  app.use(express.errorHandler());
//});

app.post('/article/create', article.create);
app.post('/article/read', article.read);
app.post('/article/update', article.update);
app.post('/article/delete', article.delete);

app.post('/category/create', category.create);
app.post('/category/read', category.read);
app.post('/category/update', category.update);
app.post('/category/delete', category.delete);
app.post('/category/readByParentId', category.readByParentId);

db.connect(function(error){
    if (error) throw error;
});
app.on('close', function(errno) {
    db.disconnect(function(err) { });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
