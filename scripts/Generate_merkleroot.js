const data = require('./list.json');
const { ethers } = require("ethers");


const leaves=[];

for(var i=0;i<data.amount.length-1;i++){
	leaves.push(ethers.utils.keccak256(ethers.utils.hexlify(data.address[i]),ethers.utils.hexlify(data.amount[i])))
}



const generate_root= (input)=>{

	var output=[];
	if (input.length===1) 
		return input[0];

	if(input.length%2===0)
		n=input.length;
	else{
		n=input.length-1;
	}
	
	
	for(var i=0;i<n;i=i+2){
		output.push(ethers.utils.keccak256(input[i],input[i+1]));
	}

	if(input.length%2!=0){
		output.push(input[n/2])
	}

	
	return generate_root(output);

}

const root=generate_root(leaves);
console.log(root);