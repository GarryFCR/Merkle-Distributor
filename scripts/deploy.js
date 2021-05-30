const fs = require('fs');
const data = require('./list.json');

async function main(){


}

main().then(()=> process.exit(0))
	.catch(error=>{
		console.error(error);
		process.exit(1);
	});