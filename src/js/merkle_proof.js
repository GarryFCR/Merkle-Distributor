const data = require('../../scripts/list.json');
const { ethers } = require("ethers");


const leaves=[];

for(var i=0;i<data.amount.length-1;i++){
	leaves.push(ethers.utils.keccak256(data.address[i]+(ethers.utils.hexZeroPad(100,4)).slice(2)));
}


const getproof=(index,input,proof) =>{

	if (input.length === 1) 
		return proof;
	
	if (index%2) {
      proof.push(input[index - 1].slice(2));
    } else {
      proof.push(input[index + 1].slice(2));
    }

    const output=[];

    for(var i=0;i<input.length;i=i+2){
		output.push(ethers.utils.keccak256(input[i]+input[i+1].slice(2)));
	}
    console.log(output);

    return getproof(Math.floor(index / 2),output, proof);

}

var proof=[];
proof=getproof(2,leaves,proof)
console.log(proof);