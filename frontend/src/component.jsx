import React, { Component } from 'react';
import {ethers,Contract} from 'ethers';

const  Merkle = require('./Merkle_Dist.json');

class App extends Component {
  state = {  };


  //get account connected via metamask
  requestAccount() {
     window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  //get provider via exposed ethereum object
  connect() {

    if (typeof window.ethereum !== 'undefined') {
   
      this.requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //console.log({ provider });
      const signer = provider.getSigner()
      //instatiate the contract
      const contract = new ethers.Contract(Merkle.address, Merkle.abi, signer);

      //console.log(contract);
    }    
  }

  render() { 
    
    
    return ( <div >   {this.connect()} 
      <h1>MERKLE DISTRIBUTOR</h1><br/>
      <input id="address" placeholder="Enter Address to generate Merkle proof"></input>
      <button >Generate</button><br/>
     
    </div> );
  }
}
 
export default App;