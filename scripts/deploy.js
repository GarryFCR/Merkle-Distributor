const fs = require('fs');
const data = require('./list.json');

async function main(){

fs.writeFileSync('src/js/app.js', JSON.stringify(data));
}

main().then(()=> process.exit(0))
	.catch(error=>{
		console.error(error);
		process.exit(1);
	});