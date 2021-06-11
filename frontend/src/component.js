const {ethers, Contract } = require('ethers');
const  Merkle = require('./Merkle_Dist.json');

function App() {

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function connect() {

    if (typeof window.ethereum !== 'undefined') {
   
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });

      const signer = provider.getSigner()

      const contract = new ethers.Contract(Merkle.address, Merkle.abi, signer);

      console.log(contract);
    }    
  }

		return (
			<div>    
        <button onClick={connect}>Connect to metamask</button>
			</div>
		);
	

}



export default App;
