const { expect } = require('chai');
const data1 = require('../scripts/list.json');
const data = require('../scripts/root.json');

root=data.Merkle_root[0];

describe('Testing the Merkle_Distributor',()=>{
   let Alpha,Merk,alpha,merk;

   
	beforeEach(async () => {

	Alpha= await ethers.getContractFactory('Alphacointract');
	alpha= await Alpha.deploy();
    Merk=  await ethers.getContractFactory('Merkle_Distributor');
    merk= await Merk.deploy(alpha.address,root);
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
	});



	describe('Initialize',()=>{
	it(' is Checking the initial values of state variables',async ()=>{
			expect(await merk.token()).to.equal(alpha.address);
			expect(await merk.merkleRoot()).to.equal(root);
		});
	});

	describe('Claim failure', () => {
    it('confirms that no address has claimed', async () => {
      expect(await merk.isSet(1)).to.equal(false);
      });
	});
 	
 	//describe('Verifying merkle proofs',)
});