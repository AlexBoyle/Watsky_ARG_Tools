(function() {
	const fs = require('fs');
	const readline = require('readline');
	const file = readline.createInterface({
		//https://docs.google.com/document/d/1PeCa9e7RkCenk4RnvbWL2l5xydr7t0kQNZ5nQwgNN1A/edit
		input: fs.createReadStream('data/streetNames.txt'),
		output: process.stdout,
		terminal: false
	});
	let print = function(a) {
		process.stdout.write(JSON.stringify(a) + '\n');
	}
	let findMatches = function(str, reg) {
		let match = [...str.matchAll(new RegExp(reg))]
		let out = match.reduce((output, item) => {
			output.push(item[0])
			return output;
		}, [])
		return [...(new Set(out))];
	}
	let obj = []

	file.on('line', (line) => {
		try {
			obj = [...obj, ...findMatches( " "+ line.toLowerCase() + " ", / [a-z]{6} [a-z]{4} /g)]
		} catch (e) {
			console.log(e)
			console.log("ERROR: " + albumList[currentAlbumIndex] + ": " + songList[currentSongIndex])
			console.log("LINE: " + line)
			process.exit()
			
		}
	}).on('close', () => {
		//console.log(obj)
		console.log("FILE READ")
		//console.log(albumList)
		//console.log(songList)
		console.log(obj)

	});;
	
})();