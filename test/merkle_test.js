const { expect } = require('chai');
const { BigNumber } = require('ethers')
const { deployContract } = require('ethereum-waffle');



const Dist = require("../artifacts/contracts/Merkle_Distributor.sol/Merkle_Distributor.json");
const Token = require("../artifacts/contracts/Alphacointract.sol/Alphacointract.json");

const data1 = require('../scripts/list.json');
const data = require('../scripts/root.json');

root=data.Merkle_root[0];


describe('Test the  Merkle_Distributor',()=>{
	

	beforeEach('deploy token', async () => {
		 	[owner, addr1, addr2, ...addrs] =  await ethers.getSigners();
		    token = await deployContract(owner, Token,[]);
	    });


	describe('Initialize',()=>{
		it(' is Checking the initial values of state variables',async ()=>{
				dist = await deployContract(owner,Dist,[token.address,root]);
				expect(await dist.token()).to.equal(token.address);
				expect(await dist.merkleRoot()).to.equal(root);
			});
	});


	describe('Claim failure', () => {
	    it('confirms that an address has not claimed', async () => {
				dist = await deployContract(owner,Dist,[token.address,root]);
		        expect(await dist.isSet(1)).to.equal(false);
		    });

	    it('Fails with invalid index value',async ()=>{
				dist = await deployContract(owner,Dist,[token.address,root]);
	    		await expect(dist.claim(17,addr1.address,100,[])).to.be.revertedWith('Invalid index value');
	    	});


		it('Fails on empty proof',async ()=>{
			 	dist = await deployContract(owner,Dist,[token.address,root]);
			 	await expect(dist.claim(1,data1.address[0],100,[])).to.be.revertedWith('MerkleDistributor: Invalid proof.');
		    });
		
		});

});

	//it fails for empty proof

	//successful claim
	//transfers the tokens
	//must have enough to transfer
	//sets is claim
	//cannot allow two claims
	//cannot claim for address with others proof
	//cannot claim more than proof
	//




