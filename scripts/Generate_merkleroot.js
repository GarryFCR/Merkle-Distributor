const data = require('./list.json');
const { ethers } = require("ethers");
const fs = require("fs");

const leaves=[];

//hashing each address with the amount they are bound to recieve

for(var i=0;i<data.amount.length;i++){
	leaves.push(ethers.utils.keccak256(data.address[i]+(ethers.utils.hexZeroPad(data.amount[i],4)).slice(2)));
}

//console.log(leaves);
//function to generate the merkle root 
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
		output.push(ethers.utils.keccak256(input[i]+input[i+1].slice(2)));
	}

	console.log(output);
	if(input.length%2!=0){
		output.push(input[n/2])
	}

	return generate_root(output);

}

const root=generate_root(leaves);


var root_obj = {
	Merkle_root:[]
};
root_obj.Merkle_root.push(root);

//storing our merkle root in a json file
fs.writeFile("./root.json", JSON.stringify(root_obj), (err) => {
    if (err) {  console.error(err);  return; };
    
});
