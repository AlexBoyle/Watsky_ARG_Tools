const https = require('https');

let getOffice = function(state, town, number) {
	https.get('https://local.fedex.com/en-us/' + state + '/' + town + '/office-' + number , (resp) => {
	  let data = '';

	  // A chunk of data has been received.
	  resp.on('data', (chunk) => {
		data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
		if(data.includes("c-ReviewsSummary-count")) {
			console.log("found at ST: " + state + " Town: " + town + " office: " + number)
		} else {
			
		}
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
}
let pattern = process.argv[2] || "000x";
let state = process.argv[3] || "tx";
let town = process.argv[4] || "houston";
let possibilitys = []
for(var i = 0; i <= 9999; i ++) {
	
	if(
		((pattern[0] != 'x' && Math.floor((i/1000)%10)+ "" ==  pattern[0]) || pattern[0] == 'x') &&
		((pattern[1] != 'x' && Math.floor((i/100 )%10)+ "" ==  pattern[1]) || pattern[1] == 'x') &&
		((pattern[2] != 'x' && Math.floor((i/10  )%10)+ "" ==  pattern[2]) || pattern[2] == 'x') &&
		((pattern[3] != 'x' && Math.floor((i/1   )%10)+ "" ==  pattern[3]) || pattern[3] == 'x')
	) {
		possibilitys.push(i + "")
	}
}
console.log("Searching \"" + state + " " + town + "\" for " + pattern)
for(var i = 0; i < possibilitys.length; i ++) {
	getOffice(state, town, possibilitys[i].padStart(4,0))
}

//none in denver
/*
houston
fort-worth
denver
san-antonio
*/

