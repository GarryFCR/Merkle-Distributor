onst data = require('./list.json');
const { ethers } = require("ethers");


const leaves=[];

for(var i=0;i<data.amount.length-1;i++){
	leaves.push(ethers.utils.keccak256(data.address[i]+(ethers.utils.hexZeroPad(100,4)).slice(2)));
}


const getproof=(index,input,proof) =>{

	if (inputArray.length === 1) 
		return proof;

	if (index % 2) {
      proof += '' + input[index - 1].slice(2);
    } else {
      proof += '' + input[index + 1].slice(2);
    }



}