import React, { Component} from 'react';
import {ethers,Contract} from 'ethers';
import {wrap_get} from './scripts/merkle_proof.js';
import list  from './scripts/list.json';
import  Merkle from './Merkle_Dist.json';

class App extends Component {
  state ={
    address:""
  };
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

  getProof=(val)=>{

    const pattern="0[Xx][A-Za-z0-9]{40}";
    var index=0;
    if(val.target.value.match(pattern)){
      this.setState({address: val.target.value });
      
      for(var i=0;i<list.address.length;i++){ 

        if(list.address[i] === this.state.address){
        
          console.log(val.target.value)
          index=i+1;
          break;
        }
      }
      const proof=wrap_get(index);
      console.log(proof);
    }

    else{
      console.log(false);
    }
  }

 
  render() { 
    return ( <div >   {this.connect()} 
      <h1>MERKLE DISTRIBUTOR</h1><br/>
      <input type="text" onChange={this.getProof} placeholder="Enter Address to generate Merkle proof"></input>
      <button className="btn btn-secondary btn-sm">Generate</button><br/>
    </div> );
  }
}
 
export default App;