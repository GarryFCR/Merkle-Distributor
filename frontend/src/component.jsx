import React, {Component} from "react";
import {local_blockchain} from "./local_blockchain.js"

class Chain extends Component {

    state ={
        owner : "Hi",
        distributor:""
    };

    connect(){
        const init = async () => {
          
          const { dist } = await local_blockchain();
         
          this.setState({owner: dist.signer_address, distributor: dist.merkle});
        
        };
        init();
      };


	render() {
      //this.connect();  
		return (
			<div>    
               {this.state.owner}
			</div>
		);
	}
}



export default Chain;
