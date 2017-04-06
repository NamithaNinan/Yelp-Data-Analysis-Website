
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
	, mongo = require('mongodb')
	, monk = require('monk')
	, db = monk('localhost:27017/test');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',function(req,res){
	res.render('login.ejs');
});

app.get('/users', user.list);
app.get('/word_cloud',function(req,res){
	res.render('word_cloud.ejs');
});

app.get('/profile',function(req,res){
	res.render('profile.ejs');
});

app.get('/login.html',function(req,res){
	res.render('login.ejs');
});

app.get('/error',function(req,res){
	res.render('404.ejs');
});

app.get('/index',function(req,res){
	res.render('index.ejs');
});

app.get('/distribution',function(req,res){
	res.render('distribution2.ejs');
});

app.get('/reviews',function(req,res){
	res.render('reviews.ejs');
});

app.get('/checkins',function(req,res){
	res.render('checkins.ejs');
});

app.get('/ratings',function(req,res){
	res.render('ratings.ejs');
});

app.get('/streaming',function(req,res){
	res.render('streaming.ejs');
});

app.get('/aboutus',function(req,res){
	res.render('aboutus.ejs');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/login', function(req, res) {
	//var obj = JSON.parse(req.body);
	//var uid = req.body.userid;
	//console.log(uid);

	MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
		if (err) {
			res.send(err);
			throw err;
		} else {
			console.log("successfully connected to the database");
		}
		var collection = db.collection('usercollection');
		// console.log(req.body);
		// collection.find({'username' : 'testuser2'}, function(err, docs) {
		// 	console.log(docs);
		// 		db.close();
        //
		// });
		console.log(req.body);
		var cursor =db.collection('usercollection').find( { "username": "testuser1" } );
		cursor.each(function(err, doc) {
			//assert.equal(err, null);
			console.log(doc);
			if (doc != null) {
				console.log(doc);
			} else {
				//callback();
			}
		});

	});

	res.send(200);

});


http.createServer(app).listen(3001, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
