let SVGHelper = function(svgElement) {
	this.svg = svgElement;
	let svgNS = "http://www.w3.org/2000/svg";  
	
	let offset = 20;
	
	let columnSeperation = 130;
	let rowSeperation = 100;
	
	let stateHeight = 40;
	let stateWidth = 120;
	
	this.components = {}
	
	let curvesPerRow = []
	
	this.addState = function(name, id, row, column) {
		if(!curvesPerRow[row]) {
			curvesPerRow[row] = 0
		}
		let x = offset + (column*columnSeperation)
		let y = offset + (row*rowSeperation)
		
		let newRect = document.createElementNS(svgNS, "rect");
		newRect.setAttribute("x", x);
		newRect.setAttribute("y", y);
		newRect.setAttribute("width", stateWidth);
		newRect.setAttribute("height", stateHeight);
		newRect.setAttribute('rx', "10");
		newRect.setAttribute('ry', "10");
		newRect.setAttribute("fill", "#5cceee");
		
		let newText = document.createElementNS(svgNS, "text");
		newText.setAttribute("x", x);
		newText.setAttribute("y", y+25);
		newText.innerHTML = name
		
		this.svg.append(newRect)
		this.svg.append(newText)
		this.components[id] = {type: "stateBox", position: {row: row, column: column}, elements: [newRect, newText]}
	}
	
	this.addLine = function(startPoint, endPoint) {
		let newLine = document.createElementNS(svgNS, "line");
		newLine.setAttribute('x1', startPoint.x);
		newLine.setAttribute('y1', startPoint.y);
		newLine.setAttribute('x2', endPoint.x);
		newLine.setAttribute('y2', endPoint.y);
		//newLine.setAttribute("marker-end", "url(#arrowhead)")
		newLine.setAttribute("stroke", "black")
		newLine.setAttribute("stroke-width", "0.1")
		this.svg.append(newLine)

	}
	this.addText = function(startPoint, text) {
		let newText = document.createElementNS(svgNS, "text");
		newText.setAttribute("x", startPoint.x);
		newText.setAttribute("y", startPoint.y);
		newText.setAttribute("font-size", 2);
		newText.innerHTML = text
		this.svg.append(newText)

	}
	
	this.connect
}