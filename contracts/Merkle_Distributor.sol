// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

/**
 * 
 */
 interface IERC {
 	function transfer(address to, uint tokens) public returns (bool success);	
 }
 
contract Merkle_Distributor{

	address public immutable  token;
    bytes32 public immutable  merkleRoot;
	//keep track of claimed tokens
	//256 possible users
    uint256 private array = 0;
    

    constructor(address _token, bytes32 _merkleRoot) public {
        token = _token;
        merkleRoot = _merkleRoot;
    }

     function verify(bytes32[] memory proof, bytes32 root, bytes32 leaf) internal pure returns (bool) {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (computedHash <= proofElement) {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }

        return computedHash == root;
    }

    function Set(uint256 _index) private  returns(uint256){
        
        array=array|(1<< _index-1);
        
    }
    
    function isSet(uint _index) public view  returns(bool){
        return array == array & (1<<_index-1);
    }

    function claim (uint256 _index,address account,uint256 amount,bytes32[] calldata merkleProof) external {
    
    	require (!isSet(_index),'Token was already taken');


    		
    }
    

}

