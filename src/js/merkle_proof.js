const data = require('../../scripts/list.json');
const data1 = require('../../scripts/root.json');
const { ethers } = require("ethers");

root=data1.Merkle_root;

const leaves=[];

for(var i=0;i<data.amount.length;i++){
	leaves.push(ethers.utils.keccak256(data.address[i]+(ethers.utils.hexZeroPad(data.amount[i],4)).slice(2)));
}


const getproof=(index,input,proof) =>{

	if (input.length === 1) 
		return proof;
	
	if (index%2) {
      proof.push(input[index - 1]);
    } else {
      proof.push(input[index + 1]);
    }

    const output=[];

    for(var i=0;i<input.length;i=i+2){
		output.push(ethers.utils.keccak256(input[i]+input[i+1].slice(2)));
	}
    

    return getproof(Math.floor(index / 2),output, proof);

}

var proof=[];
proof=getproof(2,leaves,proof)
//console.log(proof);


const verify=(root,proof,index)=>{
	node=leaves[index];
	for(var i=0;i<proof.length;i++){
			
			if (index%2) {
		      node=ethers.utils.keccak256(proof[i]+node.slice(2));
		    } else {
		      node=ethers.utils.keccak256(node+proof[i].slice(2));
		    }
		    index=Math.floor(index / 2);
		    
		}

		if(root == node) console.log("You are valid to recieve some tokens");
		

}

verify(root,proof,2);