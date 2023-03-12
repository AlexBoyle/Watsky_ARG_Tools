//Player Id: 5bd52f49-3fe6-4f35-90af-8b9852162c01
(function() {
const fs = require('fs')
const csv = require('fast-csv');
let albumList =  require("./data/albums_spotify").items
let albums = []
let data = []

let resolve = () =>{
	for (var i = 0; i < data.length; i++) {
		
			if((new RegExp("[a-z]{12} [a-z]{8}")).test(data[i].city.toLowerCase())) {
				console.log(data[i].city)
				console.log(data[i])
			}
		
	}
}
fs.createReadStream('./data/uscities.csv')
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', row => data.push(row))
  //.on('end', () => console.log(data));
  .on("finish", resolve);
})()