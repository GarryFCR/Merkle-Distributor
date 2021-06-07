const { Merkle }= require('./Merkle_Dist.json');
const {ethers, Contract } = require('ethers');



const load_blockchain = ()=>
	new Promise((resolve,reject)=>{

	window.addEventListener('load', async()=>{
		if(window.ethereum){
		
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const signer_address = signer.getAddress();
			const merkle = new Contract( Merkle.address, Merkle.abi, signer);

			resolve({signerAddress, token});
		}
		resolve({signerAddress: undefined, token: undefined});	
	});
})

module.exports={
	load_blockchain;
};