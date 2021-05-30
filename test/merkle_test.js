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

    it('fails with invalid index value',async ()=>{
    	await expect(merk.claim(17,addr1.address,100,[])).to.be.revertedWith('Invalid index value');
    })

    it('transfers the token',async ()=>{
    	await expect(alpha.balanceOf(addr1.address)).to.equal(BigNumber.from(0));
    })

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




});