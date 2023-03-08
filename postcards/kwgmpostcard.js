(() => {
	let filter = "";
	let postcards = [
	  {id: 0, st: 'NY', dots: [6, 7], index: 4, color: "yellow"},
	  {id: 1, st: 'FL', dots: [8, 4], index: 2, color: "blue"},
	  {id: 2, st: 'MA', dots: [3, 5], index: 4, color: "yellow"},
	  {id: 3, st: 'NV', dots: [7, 4], index: 0, color: "blue"},
	  {id: 4, st: 'FL', dots: [9], index: 0, color: "yellow"},
	  {id: 5, st: 'MO', dots: [7], index: 0, color: "yellow"},
	  {id: 6, st: 'LA', dots: [10], index: 2, color: "yellow"},
	  {id: 7, st: 'VA', dots: [8], index: 1, color: "green"},
	  {id: 8, st: 'VA', dots: [10], index: 3, color: "red"},
	  {id: 9, st: 'TN', dots: [5, 6], index: 1, color: "green"},
	  {id: 10, st: 'IN', dots: [12],index: 4, color: "red"},
	  {id: 11, st: 'CA', dots: [7], index: 0, color: "green"},
	  {id: 12, st: 'AZ', dots: [6], index: 3, color: "red"},
	  {id: 13, st: 'NC', dots: [6], index: 3, color: "green"},
	  {id: 14, st: 'NM', dots: [4, 5], index: 0, color: "green"},
	  {id: 15, st: 'NV', dots: [4, 6], index: 0, color: "red"},
	  {id: 16, st: 'IL', dots: [6, 4], index: 0, color: "green"},
	  {id: 17, st: 'CO', dots: [9], index: 4, color: "blue"},
	  {id: 18, st: 'CO', dots: [9], index: 0, color: "green"},
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
		for (let i = 0; i < 5; i++) {
			let box = document.createElement('span');
			box.classList.add('box');
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
	window.generatePostcards = function generatePostcards() {
		let parent = document.getElementById('postcards');
		parent.innerHTML = '';
		let postcardData = [];
		if(filter === "") { postcardData = postcards.reduce((out, item) => { (out[item[0]] = [...out[item[filter]] || [], item]); return out; }, {}) }
		else { postcardData = postcards.reduce((out, item) => { (out[item[filter]] = [...out[item[filter]] || [], item]); return out; }, {}) }
		for (let id in postcardData) {
			let group = document.createElement('div');
			postcardData[id].sort((a,b) => a.index - b.index);
			for (let card of postcardData[id]) group.appendChild(genCard(card));
			parent.append(group);
			if(filter !== "") parent.appendChild(document.createElement('hr'));
		}
	}
})()