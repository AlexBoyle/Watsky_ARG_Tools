(() => { 
	let posArr = []
	let currentFolderIndex = 0;
	let currentImageIndex = 1;

	$("#imageSelector").click(function(e){
	  var pos = $(this).position();
	  let posObj = {x: e.pageX - pos.left, y: e.pageY - pos.top}
	  posArr.push(posObj)
	  if(posArr.length === 4) {
		  let sizeX = posArr[1].x - posArr[0].x;
		  let sizeY = posArr[2].y - posArr[0].y;
		  
		  let posX = posArr[3].x - posArr[0].x;
		  let posY = posArr[3].y - posArr[0].y;
		  console.log(" ")
		  console.log("ST: " + folderList[currentFolderIndex] + " Num: " + currentImageIndex)
		  console.log({x: (posX/sizeX)*800, y: (posY/sizeY)*1200})
		  posArr = []
	  }
	  
	});
	
	
	window.nextImg = function() {
		currentFolderIndex++
		/*
		if(currentImageIndex === 4){
			currentImageIndex = 1; 
			currentFolderIndex++
		}else {
			currentImageIndex++
		}
		*/
		console.log(folderList[currentFolderIndex] + " " + currentImageIndex)
		document.getElementById("imageSelector").src = "fprint/" + folderList[currentFolderIndex] + "/" + currentImageIndex + ".jpg"
	}
	window.resetClicks = function() {posArr = []}
	window.setZeros = function() {posArr = [{x:0,y:0}, {x:1000,y:0}, {x:0,y:$('#imageSelector').height()}]}
	var folderList = [
	'AZ',
	'CA',
	'CO',
	'DC',
	'FL',
	'IL',
	'MA',
	'MI',
	'MO',
	'NC',
	'NV',
	'NY',
	'OH',
	'OK',
	'OR',
	'TN',
	'TX',
	'UT',
	'VA',
	'WA',
	'WI'
	]
})()