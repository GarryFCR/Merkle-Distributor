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


	describe('Claim',()=>{
		it('transfers the tokens',async()=>{
				let balance = await token.balanceOf(owner.address);
			 	await expect(balance.toNumber()).to.equal(10**15);

			 	await token.transfer(addr1.address,100);
			 	let balance_ = await token.balanceOf(addr1.address);
			 	await expect(balance_.toNumber()).to.equal(100);
		})

		it('Claims correctly',async ()=>{
				console.log(addr2.address);
				dist = await deployContract(owner,Dist,[token.address,root]);
			 	await expect(dist.claim(1,data1.address[0],100,["0x13008a871d20bddf7bf06973234ea1ab2b5b4959efc149a2597d6b5e23cb9e1a","0x8ce518b2a0944521d19aa1254c2a54be10ae329db96a1980697535d1a8ad00f7","0x9048cc082b87a200d6073b18dc6bd0bd1d8ccadc75a848def64e9bd23fa8386b","0xefb96e8ef612aaee2bfaa98b92d0b84f1dc9b57c3581c4f12b715bcc5d692bc6"]
					)).to.be.revertedWith('MerkleDistributor: Invalid proof.');


		})
	})

});

	

	//successful claim
	//transfers the tokens
	//must have enough to transfer
	//sets is claim
	//cannot allow two claims
	//cannot claim for address with others proof
	//cannot claim more than proof
	//




