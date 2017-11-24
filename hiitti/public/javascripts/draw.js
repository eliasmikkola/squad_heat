var count = 100;

// Let's get layers working
// var img = document.createElement('img');
// img.src =  "../images/1.jpg";
// // img.id = "background-crag";
// // var layer = new paper.Layer();
// var raster = new paper.Raster(img);
// raster.height = "1000px";
// raster.width = "1000px";

// Create a symbol, which we will use to place instances of later:
var path = new Path.Circle({
	center: [0, 0],
	radius: 4,
	fillColor: 'white',
	strokeColor: 'black'
});





io.on( 'move', function( data ) {
  var item = project.activeLayer.children[0];
			
	// Move the item 1/20th of its width to the right. This way
	// larger circles move faster than smaller circles:
	item.position.y += item.bounds.width / 20;

	// If the item has left the view on the right, move it back
	// to the left:
	if (item.bounds.bottom > view.size.height) {
		item.position.y = -item.bounds.height;
	}
	if (item.bounds.left > view.size.width) {
		item.position.x = -item.bounds.width;
	}
});

var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
	// The center position is a random point in the view:
	var center = Point.random() * view.size;
	var placedSymbol = symbol.place(center);
	// placedSymbol.scale(i / count);
}
console.log(project.activeLayer.children[0].id);

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
	// Run through the active layer's children list and change
	// the position of the placed symbols:
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
			
		// Move the item 1/20th of its width to the right. This way
		// larger circles move faster than smaller circles:
		item.position.x += item.bounds.width / 20;

		// If the item has left the view on the right, move it back
		// to the left:
		if (item.bounds.left > view.size.width) {
			item.position.x = -item.bounds.width;
		}
	}
}

