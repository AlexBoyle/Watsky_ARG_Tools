var inp = [
	["1", "Hammerhead Shark", "OH", "Hummus", "WA", "Silkworm", "IN", "Star Anise", "CA"],
	["2", "Chariot", "DC", "Cruise Ship", "IL", "Curious George", "NE", "Tulips", "NM"],
	["3", "Clove", "NE", "Greenhouse", "MO", "(Guggenheim)", "LA", "Screwdriver", "FL"],
	["4", "Conductor", "OK", "Great Dane", "OR", "-", "-", "Leather", "TN"],
	["5", "Emperor Penguin", "MA", "Piranha", "CA", "-", "-", "-", "-"],
	["6", "Cauliflower", "WI", "-", "-", "Panda", "TX", "Spaghetti And Meatballs", "UT"],
	["7", "Bran Castle", "MI", "Fallingwater", "UT", "-", "-", "Luigi", "TX"],
	["8", "Coconut Water", "TX", "Diamond", "LA", "Roly Poly", "OK", "Rosetta Stone", "NY"],
	["9", "Beeswax", "CA", "-", "-", "Oxbow Lake", "IL", "Whiskey", "OR"],
	["10", "Chimney", "IN", "Chocolate Chip Cookie", "NY", "Colored Pencils", "NM", "Daddy Longlegs", "DC"],
	["11", "Gosling", "AZ", "Scorpion", "NV", "Sleeping Bag", "CO", "Steeple", "OK"],
	["12", "Alligator", "IL", "Dugout?", "OK", "Roller Coaster", "MI", "-", "-"],
	["13", "Corndog", "OR", "Dutch Braids", "TN", "Narwhal", "CA", "Wheelchair", "MI"],
	["14", "-", "-", "Harmonica", "DC", "Hourglass", "OH", "Nail Polish", "NV"],
	["15", "Gateway Arch", "NV", "Microwave", "MA", "Snow", "AZ", "Strawberries", "IN"],
	["16", "Ice Skating Rink", "TN", "Lunar Rover", "NE", "Sphinx", "UT", "Vanilla Bean", "CO"],
	["17", "-", "-", "Dishwasher", "AZ", "Ice cubes", "MA", "-", "?"],
	["18", "Balsamic Vinegar", "UT", "Sunflower", "MI", "Trident", "MO", "Violin", "AZ"],
	["19", "Beluga Whale", "WA", "Deviled Eggs", "TX", "Everglades", "TN", "Queen Bee", "OH"],
	["20", "-", "-", "Glue Stick", "NM", "Pitchfork", "WI", "Trombone", "LA"],
	["21", "Chandelier", "MO", "Doorknob", "OH", "-", "-", "-", "-"],
	["22", "Chameleon", "CO", "Cucumber", "WI", "Peanut Brittle", "NY", "Tongue", "MA"],
	["23", "Bald Eagle", "LA", "Champagne", "CO", "Extension Cord", "WA", "Manatee", "NE"],
	["24", "Nails", "NM", "Pelican", "FL", "Quran", "NV", "Ventriloquist", "IL"],
	["25", "Dimples", "NY", "-", "-", "Stingray", "DC", "Swimming Pool", "WI"],
	["26", "-", "-", "-", "-", "Detergent", "FL", "Synchronized Swimming", "WA"],
	["27", "Birthday Cake", "FL", "Fishing Pole", "IN", "Silverware", "OR", "Thermometer", "MO"],
];
let intersect = function(...sets) {
	return sets.reduce((a, b) => {a = this.toArray(a); b = this.toArray(b); return a.filter(c => b.includes(c))});
}
let union = function(...sets) {
		let union = [];
		sets.forEach(set => {
			union = new Set([...union, ...set])
		})
		return union
	}
let solve = function(rot1, rot2, rot3, rot4) {
	output = []
	for(var i = 0; i < 27; i++) {
		let word1 = inp[(i+rot1)%27][1] != "-" ? [...inp[i][1].toLowerCase()] : [..."abcdefghijklmnopqrstuvwxyz"]
		let word2 = inp[(i+rot2)%27][3] != "-" ? [...inp[i][3].toLowerCase()] : [..."abcdefghijklmnopqrstuvwxyz"]
		let word3 = inp[(i+rot3)%27][5] != "-" ? [...inp[i][5].toLowerCase()] : [..."abcdefghijklmnopqrstuvwxyz"]
		let word4 = inp[(i+rot4)%27][7] != "-" ? [...inp[i][7].toLowerCase()] : [..."abcdefghijklmnopqrstuvwxyz"]
		let output1 = "";
		for(var j = 0; j < word1.length; j ++) {
			
			if(
				word2.includes(word1[j]) &&
				word3.includes(word1[j]) &&
				word4.includes(word1[j])
			) {
				output1 += word1[j]
			}
		}
		let outSet = [...(new Set([...output1]))].join("");
		if(outSet.length > 0)
			output.push(outSet)
		else
			return null

		
	}
	return output

}
for(var i = 0; i < 27; i++){for(var j = 0; j < 27; j++){for(var k = 0; k < 27; k++){for(var m = 0; m < 27; m++){
	let sol = solve(i, j, k, m);
	if(sol != null) {
		console.log([i,j,k,m])
		console.log(sol);
	}
}}}}
