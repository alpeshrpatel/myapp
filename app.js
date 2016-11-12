
//eagelnest2016/eagelnest2016!
//
//git : eagelnest2016@gmail.com/eagelnest2016!

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require("mongoose");

var config = require('./config/default');

var db = require('./api/util/dbfactory');
var log = require('./api/logger/logger');


//-----------------------------

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//=================Mongo DB ==================================
var school_router = require('./api/router/school');

app.use(school_router);


var mongoAuth = '',
    mongoURL ='',
    dbconfig = config.application.mongo,
    hostString=''

if(dbconfig.auth.user && dbconfig.auth.password){
    mongoAuth = dbconfig.auth.user +":"+ dbconfig.auth.password+"@";
}

for(var index=0; index < dbconfig.instances.length;index++)
    {
        if (index > 0){
            hostString+=",";
        }
        hostString += dbconfig.instances[index].host+":"+dbconfig.instances[index].port;
    }
mongoURL ="mongodb://" + mongoAuth+hostString+"/"+config.application.mongo.db;

//mongoURL ="mongodb://" +hostString+"/"+config.application.mongo.db;
console.log(mongoURL);

//mongoose.Promise = global.promise;
//=================Mongo DB ==================================

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
	console.log(req.app.get('env'));
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

//=================Start Server==================================

db.connect(mongoURL, config.application.mongo.options,function(){
    app.listen(config.application.apiUrl.port, function () {
        console.log("Application is listening on port " + config.application.apiUrl.port)
        console.log("Mongo is listening on port 27017")
    });
});

//app.listen(config.application.apiUrl.port, function () {
//        console.log("Application is listening on port " + config.application.apiUrl.port)
//});
//
//// Build the connection string 
//var dbURI = 'mongodb://localhost:27017/test'; 
//
//// Create the database connection 
//mongoose.connect(dbURI); 
//
//// CONNECTION EVENTS
//// When successfully connected
//mongoose.connection.on('connected', function () {  
//  console.log('Mongoose default connection open to ' + dbURI);
//}); 
//
//// If the connection throws an error
//mongoose.connection.on('error',function (err) {  
//  console.log('Mongoose default connection error: ' + err);
//}); 
//
//// When the connection is disconnected
//mongoose.connection.on('disconnected', function () {  
//  console.log('Mongoose default connection disconnected'); 
//});
//
//// If the Node process ends, close the Mongoose connection 
//process.on('SIGINT', function() {  
//  mongoose.connection.close(function () { 
//    console.log('Mongoose default connection disconnected through app termination'); 
//    process.exit(0); 
//  }); 
//}); 
//
//require('./api/model/school');


process.on("SIGINT",function(){
   db.closeConnection(function(){
       process.exit(0);
   }); 
});
//=================Start Server==================================

module.exports = app;
