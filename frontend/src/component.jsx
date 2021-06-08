import React, {Component} from "react";


class chain extends Component {

    state ={
        owner : "",
        distributor:""
    };

    connect = () => {
        const init = async () => {

          const { dist } = await getBlockchain();
          this.setState({owner: dist.signerAddress, distributor: dist.merkle});
        
        };
        init();
      };


	render() {
        
		return (
			<div>
               {this.connect()}
               {this.state.owner}
			</div>
		);
	}
}



export default chain;
