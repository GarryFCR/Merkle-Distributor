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

    await token.transfer(dist.address,100000);
    await token.balanceOf(dist.address).then(res=>{console.log(res.toNumber())});
  	console.log("Merkle Distributor contract :",dist.address);


  	const contract ={
  		address: dist.address,
  		abi: JSON.parse(dist.interface.format('json'))
  	};

  	fs.writeFileSync('frontend/src/Merkle_Dist.json',JSON.stringify(contract));


}

main().then(()=> process.exit(0))
	.catch(error=>{
		console.error(error);
		process.exit(1);
	});