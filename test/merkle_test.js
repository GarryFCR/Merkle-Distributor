const { expect } = require('chai');
const { BigNumber } = require('ethers')
const { deployContract } = require('ethereum-waffle');
const { wrap_get } = require('../scripts/merkle_proof.js')


const Dist = require("../artifacts/contracts/Merkle_Distributor.sol/Merkle_Distributor.json");
const Token = require("../artifacts/contracts/Alphacointract.sol/Alphacointract.json");

const data = require('../scripts/list.json');
const Root = require('../scripts/root.json');

root=Root.Merkle_root[0];


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
	    		await expect(dist.claim(17,data.address[1],data.amount[1],[])).to.be.revertedWith('Invalid index value');
	    	});


		it('Fails on empty proof',async ()=>{
			 	dist = await deployContract(owner,Dist,[token.address,root]);
			 	await expect(dist.claim(2,data.address[1],data.amount[1],[])).to.be.revertedWith('MerkleDistributor: Invalid proof.');
		    });

		it('Claims with another accounts proof and/or claiming more tokens than assigned is not possible',async ()=>{
			 	dist = await deployContract(owner,Dist,[token.address,root]);
			 	await expect(dist.claim(7,data.address[6],data.amount[6],wrap_get(8))).to.be.revertedWith('MerkleDistributor: Invalid proof.');
			 	await expect(dist.claim(7,data.address[6],1000,wrap_get(7))).to.be.revertedWith('MerkleDistributor: Invalid proof.');
		    
		    });

		it('Cannot claim twice',async ()=>{
			 	dist = await deployContract(owner,Dist,[token.address,root]);

			 	//Depositing some tokens in the contract
				await token.transfer(dist.address,100000);
	
			 	await dist.claim(7,data.address[6],data.amount[6],wrap_get(7))
			 	await expect(dist.claim(7,data.address[6],data.amount[6],wrap_get(7))).to.be.revertedWith('Token was already taken');
		    });

		it('Cannot transfer with insufficient balance',async ()=>{
			 	dist = await deployContract(owner,Dist,[token.address,root]);

			 	//Depositing some tokens in the contract
				await token.transfer(dist.address,100);
	
			 	await expect(dist.claim(7,data.address[6],data.amount[6],wrap_get(7))).to.be.revertedWith('Insufficient balance');
		    });
		
		});


	describe('Claim',()=>{
		it('transfers the tokens',async()=>{
				let balance = await token.balanceOf(owner.address);
			 	await expect(balance.toNumber()).to.equal(10**15);

			 	await token.transfer(addr1.address,100);
			 	let balance_ = await token.balanceOf(addr1.address);
			 	await expect(balance_.toNumber()).to.equal(100);
		})

		it('Claims correctly',async ()=>{
				dist = await deployContract(owner,Dist,[token.address,root]);
				//Getting the proof for second account
				let proof = wrap_get(2);
				//Depositing some tokens in the contract
				await token.transfer(dist.address,100000);
				
			 	await expect(dist.claim(2,data.address[1],data.amount[1],proof))
			 	.to.emit(dist, 'Claimed')
			 	.withArgs(2, data.address[1],data.amount[1]);

			 	//Checking if its claimed has been recorded
			 	expect(await dist.isSet(2)).to.equal(true);

		})
	})

});

	

	
	
	
	




