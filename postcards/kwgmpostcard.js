(() => { 
	let filter = "";
	let mode = true;
	let postcards = [
		{id: 01, st: 'AZ', dots: [6]	, index: 3, color: "red"	, zip: "8----"},
		{id: 02, st: 'CA', dots: [7]	, index: 0, color: "green"	, zip: "9----"},
		{id: 03, st: 'CO', dots: [9]	, index: 4, color: "blue"	, zip: "8----"},
		{id: 04, st: 'CO', dots: [9]	, index: 0, color: "green"	, zip: "8----"},
		{id: 05, st: 'DC', dots: [8]	, index: 2, color: "yellow"	, zip: "2----"},
		{id: 06, st: 'FL', dots: [8, 4]	, index: 2, color: "blue"	, zip: "3----"},
		{id: 07, st: 'FL', dots: [9]	, index: 0, color: "yellow"	, zip: "3----"},
		{id: 08, st: 'FL', dots: [7]	, index: 1, color: "green"	, zip: "3----"},
		{id: 09, st: 'IL', dots: [6, 4]	, index: 0, color: "green"	, zip: "6----"},
		{id: 10, st: 'IL', dots: [13]	, index: 2, color: "red"	, zip: "6----"},
		{id: 11, st: 'IN', dots: [12]	, index: 4, color: "red"	, zip: "4----"},
		{id: 12, st: 'LA', dots: [10]	, index: 2, color: "yellow"	, zip: "7----"},
		{id: 13, st: 'MA', dots: [3, 5]	, index: 4, color: "yellow"	, zip: "0----"},
		{id: 14, st: 'MA', dots: [6]	, index: 2, color: "red"	, zip: "0----"},
		{id: 15, st: 'MI', dots: [10]	, index: 4, color: "red"	, zip: "4----"},
		{id: 16, st: 'MI', dots: [6,7]	, index: 3, color: "yellow"	, zip: "4----"},
		{id: 17, st: 'MI', dots: [4, 6]	, index: 1, color: "blue"	, zip: "4----"},
		{id: 18, st: 'MO', dots: [7]	, index: 0, color: "yellow"	, zip: "6----"},
		{id: 19, st: 'MO', dots: [11]	, index: 1, color: "red"	, zip: "6----"},
		{id: 20, st: 'NC', dots: [6]	, index: 3, color: "green"	, zip: "2----"},
		{id: 21, st: 'NM', dots: [4, 5]	, index: 0, color: "green"	, zip: "8----"},
		{id: 22, st: 'NV', dots: [7, 4]	, index: 0, color: "blue"	, zip: "8----"},
		{id: 23, st: 'NV', dots: [4, 6]	, index: 0, color: "red"	, zip: "8----"},
		{id: 24, st: 'NV', dots: [5]	, index: 1, color: "yellow"	, zip: "8----"},
		{id: 25, st: 'NY', dots: [6, 7]	, index: 4, color: "yellow"	, zip: "0----"},
		{id: 26, st: 'OR', dots: [7]	, index: 4, color: "blue"	, zip: "9----"},
		{id: 27, st: 'TN', dots: [5, 6]	, index: 1, color: "green"	, zip: "3----"},
		{id: 28, st: 'TN', dots: [7]	, index: 1, color: "red"	, zip: "3----"},
		{id: 29, st: 'VA', dots: [8]	, index: 1, color: "green"	, zip: "2----"},
		{id: 30, st: 'VA', dots: [10]	, index: 3, color: "red"	, zip: "2----"},
		{id: 31, st: 'WA', dots: [12,8]	, index: 3, color: "red"	, zip: "9----"},
	];
	window.onload = () => { window.generatePostcards(); }
	let genCard = function(card) {
		let container = document.createElement('div');
		container.classList.add('container');
		let header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = `${card.st}`;
		container.appendChild(header);
		let boxes = document.createElement('div');
		boxes.classList.add('bod')
		for (let i = 0; i < 5; i++) {
			let box = document.createElement('span');
			box.classList.add('box');
			box.innerHTML = "<center>" + card.zip[i] + "<center/>"
			if(i === card.index) box.classList.add(card.color[0]);
			boxes.appendChild(box);
		}
		container.appendChild(boxes);
		let dots = document.createElement('div');
		dots.classList.add('dots');
		for (let dotCount of card.dots) dots.innerHTML += '•'.repeat(dotCount) + ' ';
		dots.innerHTML += '<br>(' + card.dots + ')';
		container.appendChild(dots);
		return container;
	}
	window.setFilter = function(filter1) { filter = filter1; }
	window.setMode = function(mode1) { mode = mode1; }
	window.generatePostcards = function generatePostcards() {
		let parent = document.getElementById('postcards');
		parent.innerHTML = '';
		let postcardData = [];
		if(filter === "") { postcardData = postcards.reduce((out, item) => { (out[item[0]] = [...out[item[filter]] || [], item]); return out; }, {}) }
		else { postcardData = postcards.reduce((out, item) => { (out[item[filter]] = [...out[item[filter]] || [], item]); return out; }, {}) }
		let keys = Object.keys(postcardData).sort()
		for (let i in keys) {
			console.log(keys[i])
			let group = document.createElement('div');
			postcardData[keys[i]].sort((a,b) => a.index - b.index);
			if(mode) {
			for (let card of postcardData[keys[i]]) group.appendChild(genCard(card));
			parent.append(group);
			parent.append(document.createElement('hr'));
			} else {
			createDraggableArea(postcardData[keys[i]])
			}
		}
	}

	let createDraggableArea = function(listOfCards) {
		gsap.registerPlugin(Draggable);

		// GRID OPTIONS
		var rowSize   = 100;
		var colSize   = 100;
		var gutter    = 7;     // Spacing between tiles
		var numTiles  = listOfCards.length;    // Number of tiles to initially populate the grid with
		var fixedSize = false; // When true, each tile's colspan will be fixed to 1
		var oneColumn = false; // When true, grid will only have 1 column and tiles have fixed colspan of 1
		var threshold = "50%"; // This is amount of overlap between tiles needed to detect a collision

		var $add  = $("#add");
		var $cont = $("#postcards");
		var $list = $(document.createElement('div'));
		$list.attr("id", "list");
		$cont.append($list)
		var $mode = $("input[name='layout']");

		// Live node list of tiles
		var tiles  = $list[0].getElementsByClassName("tile");
		var label  = 1;
		var zIndex = 1000;

		var startWidth  = "100%";
		var startSize   = colSize;
		var singleWidth = colSize * 3;

		var colCount   = null;
		var rowCount   = null;
		var gutterStep = null;

		var shadow1 = "0 1px 3px  0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.6)";
		var shadow2 = "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)";

		resize()

		init();

		// ========================================================================
		//  INIT
		// ========================================================================
		function init() {

		  var width = startWidth;

		  // This value is defined when this function 
		  // is fired by a radio button change event
		  switch (this.value) {

			case "mixed":
			  fixedSize = false;
			  oneColumn = false;
			  colSize   = startSize;
			  break;

			case "fixed":
			  fixedSize = true;
			  oneColumn = false;
			  colSize   = startSize;
			  break;

			case "column":
			  fixedSize = false;
			  oneColumn = true;
			  width     = singleWidth;
			  colSize   = singleWidth;
			  break;
		  }

		  $(".tile").remove();

		  gsap.to($list, {duration: 0.2, width: width });
		  gsap.delayedCall(0.25, populateBoard);

		  function populateBoard() {

			label = 1;
			resize();

			for (var i = 0; i < numTiles; i++) {
			  createTile(listOfCards[i]);
			}
		  }

		}


		// ========================================================================
		//  RESIZE
		// ========================================================================
		function resize() {
			console.log($list.outerWidth())
		  colCount   = oneColumn ? 1 : 11;
		  gutterStep = colCount == 1 ? gutter : (gutter * (colCount - 1) / colCount);
		  rowCount   = 0;

		  layoutInvalidated();
		}


		// ========================================================================
		//  CHANGE POSITION
		// ========================================================================
		function changePosition(from, to, rowToUpdate) {

		  var $tiles = $(".tile");
		  var insert = from > to ? "insertBefore" : "insertAfter";

		  // Change DOM positions
		  $tiles.eq(from)[insert]($tiles.eq(to));

		  layoutInvalidated(rowToUpdate);
		}

		// ========================================================================
		//  CREATE TILE
		// ========================================================================
		function createTile(card) {

		  var colspan = 1;
		  var element = $(genCard(card)).addClass("tile");
		  var lastX   = 0;
		  
		  $list.append(element);

		  Draggable.create(element, {
			onDrag      : onDrag,
			onPress     : onPress,
			onRelease   : onRelease,
			zIndexBoost : false
		  });

		  // NOTE: Leave rowspan set to 1 because this demo 
		  // doesn't calculate different row heights
		  var tile = {
			col        : null,
			colspan    : colspan,
			element    : element,
			height     : 0,
			inBounds   : true,
			index      : null,
			isDragging : false,
			lastIndex  : null,
			newTile    : true,
			positioned : false,
			row        : null,
			rowspan    : 1, 
			width      : 0,
			x          : 0,
			y          : 0
		  };

		  // Add tile properties to our element for quick lookup
		  element[0].tile = tile;

		  
		  layoutInvalidated();

		  function onPress() {

			lastX = this.x;
			tile.isDragging = true;
			tile.lastIndex  = tile.index;

			gsap.to(element, {
			  duration: 0.2,
			  autoAlpha : 0.75,
			  boxShadow : shadow2,
			  scale     : 0.95,
			  zIndex    : "+=1000"
			});
		  }

		  function onDrag() {

			// Move to end of list if not in bounds
			if (!this.hitTest($list, 0)) {
			  tile.inBounds = false;
			  changePosition(tile.index, tiles.length - 1);
			  return;
			}

			tile.inBounds = true;

			for (var i = 0; i < tiles.length; i++) {

			  // Row to update is used for a partial layout update
			  // Shift left/right checks if the tile is being dragged 
			  // towards the the tile it is testing
			  var testTile    = tiles[i].tile;
			  var onSameRow   = (tile.row === testTile.row);
			  var rowToUpdate = onSameRow ? tile.row : -1;
			  var shiftLeft   = onSameRow ? (this.x < lastX && tile.index > i) : true;
			  var shiftRight  = onSameRow ? (this.x > lastX && tile.index < i) : true;
			  var validMove   = (testTile.positioned && (shiftLeft || shiftRight));

			  if (this.hitTest(tiles[i], threshold) && validMove) {
				changePosition(tile.index, i, rowToUpdate);
				break;
			  }
			}

			lastX = this.x;
		  }

		  function onRelease() {

			// Move tile back to last position if released out of bounds
			this.hitTest($list, 0)
			  ? layoutInvalidated()
			  : changePosition(tile.index, tile.lastIndex);

			gsap.to(element, {
			  duration: 0.2,
			  autoAlpha : 1,
			  boxShadow: shadow1,
			  scale     : 1,
			  x         : tile.x,
			  y         : tile.y,
			  zIndex    : ++zIndex
			});

			tile.isDragging = false;
		  }
		}

		// ========================================================================
		//  LAYOUT INVALIDATED
		// ========================================================================
		function layoutInvalidated(rowToUpdate) {

		  var timeline = gsap.timeline();
		  var partialLayout = (rowToUpdate > -1);

		  var height = 0;
		  var col    = 0;
		  var row    = 0;
		  var time   = 0.35;

		  $(".tile").each(function(index, element) {

			var tile    = this.tile;
			var oldRow  = tile.row;
			var oldCol  = tile.col;
			var newTile = tile.newTile;

			// PARTIAL LAYOUT: This condition can only occur while a tile is being 
			// dragged. The purpose of this is to only swap positions within a row, 
			// which will prevent a tile from jumping to another row if a space
			// is available. Without this, a large tile in column 0 may appear 
			// to be stuck if hit by a smaller tile, and if there is space in the 
			// row above for the smaller tile. When the user stops dragging the 
			// tile, a full layout update will happen, allowing tiles to move to
			// available spaces in rows above them.
			if (partialLayout) {
			  row = tile.row;
			  if (tile.row !== rowToUpdate) return;
			}

			// Update trackers when colCount is exceeded 
			if (col + tile.colspan > colCount) {
			  col = 0; row++;
			}
			$.extend(tile, {
			  col    : col,
			  row    : row,
			  index  : index,
			  x      : col * gutterStep + (col * colSize),
			  y      : row * gutterStep + (row * rowSize),
			  width  : tile.colspan * colSize + ((tile.colspan - 1) * gutterStep),
			  height : tile.rowspan * rowSize
			});

			col += tile.colspan;

			// If the tile being dragged is in bounds, set a new
			// last index in case it goes out of bounds
			if (tile.isDragging && tile.inBounds) {
			  tile.lastIndex = index;
			}

			if (newTile) {

			  // Clear the new tile flag
			  tile.newTile = false;

			  var from = {
				autoAlpha : 0,
				boxShadow : shadow1,
				height    : tile.height,
				scale     : 0,
				width     : tile.width
			  };

			  var to = {
				duration: time, 
				autoAlpha : 1,
				scale     : 1,
				zIndex    : zIndex
			  }

			  timeline.fromTo(element, from, to, "reflow");
			}

			// Don't animate the tile that is being dragged and
			// only animate the tiles that have changes
			if (!tile.isDragging && (oldRow !== tile.row || oldCol !== tile.col)) {

			  var duration = newTile ? 0 : time;

			  // Boost the z-index for tiles that will travel over 
			  // another tile due to a row change
			  if (oldRow !== tile.row) {
				timeline.set(element, { zIndex: ++zIndex }, "reflow");
			  }

			  timeline.to(element, {
				duration: duration,
				x : tile.x,
				y : tile.y,
				onComplete : function() { tile.positioned = true; },
				onStart    : function() { tile.positioned = false; }
			  }, "reflow");
			}
		  });

		  // If the row count has changed, change the height of the container
		  if (row !== rowCount) {
			  
			rowCount = row;
			height   = 200;
			timeline.to($list, 0.2, { height: height }, "reflow");

		  }
		}
	}
	
})()