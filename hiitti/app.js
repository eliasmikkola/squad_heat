var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var paperjs = require('paper');
var http = require('http')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// Enable Socket.io
var server = http.createServer(app).listen( app.get('port') );
var io = require('socket.io').listen( server );

// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {


  // A User starts a path
  socket.on( 'startPath', function( data, sessionId ) {

    socket.broadcast.emit( 'startPath', data, sessionId );

  });

  // A User continues a path
  socket.on( 'continuePath', function( data, sessionId ) {

    socket.broadcast.emit( 'continuePath', data, sessionId );

  });

  // A user ends a path
  socket.on( 'endPath', function( data, sessionId ) {

    socket.broadcast.emit( 'endPath', data, sessionId );

  });  

});
module.exports = app;
