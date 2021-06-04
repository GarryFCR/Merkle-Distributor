const fs = require('fs');
const data = require('./root.json');
const root=data.Merkle_root[0];


async function main(){

	const [owner] =  await ethers.getSigners();
	console.log("Owner:",owner.address);

	const Token = await ethers.getContractFactory("Alphacointract");
  	const token = await Token.deploy();

  	const Dist = await ethers.getContractFactory("Merkle_Distributor");
  	const dist = await Dist.deploy(token.address,root);

  	console.log("Merkle Distributor contract :",dist.address);


}

main().then(()=> process.exit(0))
	.catch(error=>{
		console.error(error);
		process.exit(1);
	});