(() => {
document.getElementById('input').value = `WUJN OUJSO IXQQJN
CHZ RGXIJ HSOG OCJ
RXUK YSN OXUSJN CHZ
CJYN GXO OCJ GIJS
DHSNGD KJZHNJ CHE.
`;
let update = function() {
	console.log("here")
	let input = document.getElementById('input').value.toUpperCase()
	let key = document.getElementById('key').value.toUpperCase()
	let outputRef = document.getElementById('output')
	let outputStr = "";
	for (var i = 0; i < input.length; i++) {
		keyIndex = input.charCodeAt(i)-65;
		outputStr += keyIndex >=0 && keyIndex <= 25 ? key[keyIndex] : input[i]
	}
	outputRef.value = outputStr
}
document.getElementById('input').addEventListener("keyup", update)
document.getElementById('key').addEventListener("keyup", update)
update()

})()