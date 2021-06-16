import React, {Component} from "react";
import {ethers} from "ethers";
import {wrap_get} from "./scripts/merkle_proof.js";
import list from "./scripts/list.json";
import Merkle from "./Merkle_Dist.json";

class App extends Component {
	state = {
		address: "",
		isValid: 0,
		isClaim: 0,
		pos:0,
		proof: [],
	};

	//get account connected via metamask
	requestAccount() {
		window.ethereum.request({method: "eth_requestAccounts"});
	}

	getProof = (val) => {
		
		const pattern = "0[Xx][A-Za-z0-9]{40}";
		var index = 0;

		if (val.target.value.match(pattern)) {

			for (var i = 0; i < list.address.length; i++) {
				if (list.address[i] === val.target.value) {
					console.log(true);
					index = i + 1;
					this.setState({pos:index});
					break;
				}
			}
			if(index!==0){
				this.setState({address: val.target.value});
				const merkle_proof = wrap_get(index);
				this.setState({proof: merkle_proof});
			}

		} else {
			this.setState({address: ""});
			this.setState({proof: []});
			console.log(false);
		}
	};

	get_address=()=>{
		if(this.state.address !== ""){
		this.setState({isValid : 1});
		}
		else{
		this.setState({isValid : 2});
		}
	};

	check_claim=()=>{
		if (typeof window.ethereum !== "undefined") {
			this.requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			//console.log({ provider });
			const signer = provider.getSigner();
			//instatiate the contract
			const contract = new ethers.Contract(Merkle.address, Merkle.abi, signer);
			
			contract.isSet(this.state.pos).then((res)=>{
				res?this.setState({isClaim:1}):this.setState({isClaim:2});
			});
		}	

	}



	render() {
    
		return (
			<div>
				
				<h1>MERKLE DISTRIBUTOR</h1>
				<br />

				<div> 
					<h5>Check if your address is valid for claiming tokens :</h5>
					<br/><br/>
					<input
						type="text"
						onChange={this.getProof}
						placeholder="Enter Address"
					></input>
					<button
						className="btn btn-secondary btn-sm"
						onClick={() => {
							this.get_address();
						}}
					>
						Check
					</button>
					<br /><br />
					{
						this.state.isValid===1? (
						<span>
							{/*this.state.proof.map((index, i) => {
								return <div key={i}>{index}</div>;
							})*/}
							You have a Valid address
						</span>
					) :  this.state.isValid===2?<span>You have an Invalid address</span>:null
					}
				</div>
				<br/><br/>
				<div>
				<h5>Check if you have Claimed your tokens :</h5>
				<br/><br/>
				<input
						type="text"
						onChange={this.getProof}
						placeholder="Enter Address"
					></input>
					<button
						className="btn btn-secondary btn-sm"
						onClick={() => {
							this.check_claim();
						}}
					>
						Check
					</button>
					<br /><br />
					{
						this.state.isClaim===1?
						<span>You have already claimed</span>:
						this.state.isClaim===2?<span>You haven't Claimed</span>:null
					}
					
				</div>
				<br/><br/>
				<div>
					<h5>CLAIM:</h5>
					<input
						type="text"
						onChange={this.getProof}
						placeholder="Enter Address"
					></input>
					<button
						className="btn btn-secondary btn-sm"
						onClick={() => {
							
						}}
					>
						Claim
					</button>
					<br /><br />
				</div>



			</div>
		);
	}
}

export default App;
