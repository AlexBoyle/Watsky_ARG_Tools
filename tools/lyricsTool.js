(function() {
	//drive https://drive.google.com/drive/folders/13qg2CCpuiQ1coX1WmiJURxHAmGcOTgcn
	const fs = require('fs');
	const readline = require('readline');
	const file = readline.createInterface({
		//https://docs.google.com/document/d/1PeCa9e7RkCenk4RnvbWL2l5xydr7t0kQNZ5nQwgNN1A/edit
		input: fs.createReadStream('data/allLyrics.txt'),
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
	let obj = {}
	let albumList = [];
	let songList = [];
	let lyrics = [];
	let c = true;
	let lastAlbumName = "";
	let currentSongIndex = -1;
	let currentAlbumIndex = -1;
	file.on('line', (line) => {
		try {
			if(line === "####################") { 
				c = false; 
				//console.log(albumList)
				//console.log("")
				//console.log(songList)
				//console.log(obj)
				return;
			}
			if(c) {
				if(line.includes("	")) {
					songList.push(line.substr(1)); obj[lastAlbumName][line.substr(1)] = []
				}
				else {
					lastAlbumName = line; 
					albumList.push(lastAlbumName); 
					obj[lastAlbumName] = []; 
					console.log(lastAlbumName)}
			} else {
				//console.log(line)
				if(line === "") {return}
				else if(line === albumList[currentAlbumIndex+1]) { currentAlbumIndex++; }
				//else if(line === songList[currentSongIndex+1]) { currentSongIndex++;  }
				else {obj[albumList[currentAlbumIndex]].push(line)}
				lyrics.push(line)
				
			}
		} catch (e) {
			console.log(e)
			console.log("ERROR: " + albumList[currentAlbumIndex] + ": " + songList[currentSongIndex])
			console.log("LINE: " + line)
			process.exit()
		}
	}).on('close', () => {
		console.log("FILE READ")
		let allLyrics = " " + lyrics.join("  ").toLowerCase() + " ";
		console.log("")
		console.log(findMatches(allLyrics, / [b-z\-]{9} [b-z\-]{9} /g).sort())

	});;
	
})();