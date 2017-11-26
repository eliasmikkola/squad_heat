
var playerData = require('../../game.json')

// var count =  playerData.players.length;

var initPlayers = playerData
// Create a symbol, which we will use to place instances of later:
var playerTeam = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: 'red',
	opacity :0.1
});
var playerTeam2 = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: 'cyan',
	opacity :0.2
});


// var killed = new Path.Circle({
// 	center: new Point(210.65575848669073206.41085552305685),
// 	radius: 5,
// 	fillColor: 'red'
// });

// Place the instances of the symbol:

var symbol = new Symbol(playerTeam);

var symbol2 = new Symbol(playerTeam2);

var players = {
	/*{
		id: object,
		position: {},
		alive: true

	}*/

}




var keys = Object.keys(initPlayers)

var playerIdToSymbolId = {

}

var axis = {
	xMin: -246400, 
	xMax: 159990,
	yMin:-266400,
	yMax:140000
}
var xLength = Math.abs(axis.xMin - axis.xMax)

var yLength = Math.abs(axis.yMin - axis.yMax)



// var move = function(obj) {
// 		// var item = players[id]
// 		var playerId = obj.recording_id 
// 		var objId = playerIdToSymbolId[playerId]
// 		if(objId !== null && objId !== undefined){
// 			var item = project.activeLayer.children.find(function(child){
// 				return child.id === objId
// 			})
// 			if(item){
// 				// console.log("ITEM FOUND", item)
// 				var x = ((xLength/2 + obj.pos_x) / xLength)*400
// 				var y = ((yLength/2 + obj.pos_y) / yLength)*400
// 				var newPoint = new Point(x,y)

// 				// We add 1/30th of the vector to the position property
// 				// of the text item, to move it in the direction of the
// 				// destination point:
// 				// console.log(item.position.x+ " --> "+x, item.position.y+ " --> "+y)
// 				item.position = newPoint
// 			}
// 		}		
// }

// for(var i=0; i<playerData.length; i++){
// 	var step = playerData[i]

// 		// var step = playerData[i]
// 		// var stamps = playerData[i]
// 		// console.log(step)
// 		var squadKeys = Object.keys(step)
// 		for(var k=0; k<squadKeys.length;k++){
// 			var squad = step[squadKeys[k]]
// 			// console.log("squuad", squad)
// 			var firstKeys = Object.keys(squad)
// 			for(var j=0; j<firstKeys.length;j++){
// 				var player = squad[firstKeys[j]]
// 				// console.log("player", player)
// 				var key = firstKeys[j]
// 				// var player = step[i]
// 				if(playerIdToSymbolId[key] === undefined){
// 					var x = ((xLength/2 + player.pos_x) / xLength)*400
// 					var y = ((yLength/2 + player.pos_y) / yLength)*400
// 					 var point = new Point(x, y)
// 					 // console.log(point)

// 					 if(squadKeys[k] === "squad1"){
// 		 				var placedSymbol = symbol2.place(point);
// 					 }
// 					 else {
// 		 				var placedSymbol = symbol.place(point);

// 					 }
// 					 playerIdToSymbolId[key] = placedSymbol.id
// 					players[key] = placedSymbol
// 				} else {
// 					move(player)
// 				}
				
				
// 			}
// 		}
// }


var drawTimeStamp = (data) => {
	if(playerIdToSymbolId[key] === undefined){
		var x = ((xLength/2 + data.x) / xLength)*400
		var y = ((yLength/2 + data.y) / yLength)*400
		var point = new Point(x, y)
		 // console.log(point)

		 if(data.squad === "squad1"){
				var placedSymbol = symbol2.place(point);
		 }
		 else {
				var placedSymbol = symbol.place(point);
		 }
		 playerIdToSymbolId[key].remove()
		 delete playerIdToSymbolId[key];
		 playerIdToSymbolId[key] = placedSymbol.id

	}
}

	 

console.log("view", view, project.activeLayer.children.length)

 io.on('timestamp', (data)=>{
 	data.forEach((action)=>{
 		drawTimeStamp(data)
 	})
 })

io.on('kill', function(id ) {
		// var item = players[id]
		var objId = playerIdToSymbolId[id]
		if(objId !== null && objId !== undefined){
			var item = project.activeLayer.children.find(function(child){
				return child.id === objId
			})

			// Move the item 1/20th, data of its width to the right. This way
			// larger circles move faster than smaller circles:
			// console.log(Math.random(100))

			var destination = Point.random() * view.size;
			// destination = new Point(item.view.x + data.x, item.view.y + data.y)
			var vector = destination - item.position;
			var myStyle = {
				center: [0, 0],
				radius: 2,
				fillColor: 'green'
			}
			delete playerIdToSymbolId[id]

			item.remove()
		}
		

})





// The onFrame function is called up to 60 times a second:
function onFrame(event) {
	
}