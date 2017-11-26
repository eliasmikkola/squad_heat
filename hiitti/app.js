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
var Timer = require('timer.js')
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


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// Enable Socket.io
var server = http.createServer(app).listen('3000');
var io = require('socket.io').listen( server );

var playerData = require('./time_data.js')
// var playersIds = playerData.players.map(function(player){
// 	return player.id
// })

var myTimer = new Timer({
	  Timerick    : 0.01,
	  ontick  : function(ms) { 
	  	// console.log(ms)
	  	for(var i =0; i<10; i++){
	  		var id =  Math.floor(Math.random()*(10));
	  		var x =  Math.floor(Math.random()*(100));
	  		var y =  Math.floor(Math.random()*(100));
	  		// socket.broadcast.emit('move', i, {x:x,y:y} );
	  		}	
		},
	onstart: function() {
		// socket.broadcast.emit('init', playerData);
	}
	})
	myTimer.start(60)

var playerIds = []
var squads = require('./player_squads.json')


const csvFilePath='smaller.csv'
const csv=require('csvtojson')
var fs = require('fs');
// var squadData = require('');
var data = {}

csv()
	.fromFile(csvFilePath)
	.on('json', function(jsonObj ){
		if(data[jsonObj.timestamp] === undefined){
			
			var squad = squads[jsonObj.player_id]
			data[jsonObj.timestamp] = []
			data[jsonObj.timestamp].push({
				"x": jsonObj.pos_x,
				"y": jsonObj.pos_y,
				"id": jsonObj.player_id,
				"squad": squad
			})
		} else {
			var squad = squads[jsonObj.player_id]
			data[jsonObj.timestamp].push({
				"x": jsonObj.pos_x,
				"y": jsonObj.pos_y,
				"id": jsonObj.player_id,
				"squad": squad
			})
		}
		
		// var dataByTimestamp = data.get(jsonObj.timestamp) || []
		// dataByTimestamp.push(jsonObj)
		// data.set(jsonObj.timestamp, dataByTimestamp)
	}).on('done', (error)=>{
		
			fs.writeFile('squad_data.json', JSON.stringify(data) , 'utf8', function(asd){
			console.log("ready")
		});
	})
			// // console.log("emit")
	




// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {

	var asd = function(id, data){
		console.log("EMIT")
		socket.emit('move', id, data );
	}
	var stamps = Object.keys(data)
	var i = stamps[0]
	// var timeStamps = data.
	function myLoop(){
		setTimeout(function(){
			if(data[i] !== undefined){
				emit("timestamp", data[i]);
			}
			if(i === stamps[stamps.length-1]){
				i = stamps[0];
			}
			else {
				i++;
			}
			
			
			
		}, 100)

	}
 



	// A User starts a path
	// setInterval(function(){
	// 	var x =  Math.floor(Math.random()*(100));
 //  		var y =  Math.floor(Math.random()*(100));
 //  		var id = 1
	// 	socket.emit('move', id, {x:x,y:y} );
	// }, 1000)

	// setInterval(function(){
 //  		var id = playersIds[Math.floor(Math.random()*(playersIds.length-1))]
	// 	socket.broadcast.emit('kill', id);
	// 	var index = playersIds.indexOf(id);
	// 	if (index > -1) {
	// 	    playersIds.splice(index, 1);
	// 	}
	// }, 500)

  // A User continues a path
  socket.on( 'deletePlayer', function( id ) {

  });

  // A user ends a path
  socket.on( 'endPath', function( data, sessionId ) {

    socket.broadcast.emit( 'endPath', data, sessionId );

  });  

});
module.exports = app;
