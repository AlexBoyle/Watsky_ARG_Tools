//Player Id: 5bd52f49-3fe6-4f35-90af-8b9852162c01
(function() {
const fs = require('fs')
const csv = require('fast-csv');
let albumList =  require("./data/albums_spotify").items
let albums = []
let data = []


console.log("Spotify albums + Ids")
for(var i = 0; i < albumList.length; i ++) {
 albums.push(require("./data/albums/" + albumList[i].name.replaceAll(' ', '_').replaceAll(':', '') ).items.reduce((o, i) => {
	o.push(i.name)
	return o; 
 },[]))
}
let songs = albums.flatMap(num => num);
console.log(songs)

let patterns = [
	"[a-z]{4}f",
	"[a-z]{4}h [a-z]{6}",
	"[a-z]{3} [a-z]{2}i[a-z]",
	"[a-z]{5} [a-z]{7} d[a-z]{3}",
	"[a-z]{5}e",
	"[a-z]{3}a[a-z]{6}",
	"[a-z]{2}g[a-z]{2}",
	"[a-z]b[a-z]{4}",
	"[a-z]{5} [a-z]c[a-z]{2}",
]
let regPattern = patterns.reduce((output, item) => {
	output.push(new RegExp("[^a-z]" + item + " "))
	return output;
}, [])
console.log(regPattern)
for(var j = 0; j < regPattern.length; j++) {
	console.log("Pattern #" + j)
	for(var i = 0; i < songs.length; i++) {
		let songData = songs[i]
		if(regPattern[j].test(" " + songData.toLowerCase() + " ")) {
			console.log(songData.padEnd(40, " ") + "|" + (" " + songData.toLowerCase() + " ").match(regPattern[j])[0])
		}
	}
	
	console.log("")
	console.log("")
}
let resolve = () =>{
	for(var j = 0; j < regPattern.length; j++) {
		console.log("Pattern #" + j)
		for(var i = 0; i < data.length; i++) {
			let songData = data[i]
			if(regPattern[j].test(" " + songData.song.toLowerCase() + " ")) {
				console.log(songData.song.padEnd(40, " ") + "|" + (" " + songData.song.toLowerCase() + " ").match(regPattern[j])[0])
			}
		}
		
		console.log("")
		console.log("")
	}
}
fs.createReadStream('./data/song_album.csv')
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', row => data.push(row))
  //.on('end', () => console.log(data));
  .on("finish", resolve);
})()