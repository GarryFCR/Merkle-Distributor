// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;
import 'hardhat/console.sol';

/**
 * 
 */
 interface IERC {
    function transfer(address to, uint tokens) external  returns (bool success);    
 }
 
contract Merkle_Distributor{

    address public immutable  token;
    bytes32 public immutable  merkleRoot;
    //keep track of claimed tokens
    //256 possible users
    uint256 private array = 0;
    

    // This event is triggered whenever a call to #claim succeeds.
    event Claimed(uint256 index, address account, uint256 amount);
    
    constructor(address _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    // openzeppelin's merkle proof: checks if the given leaf node exist in the pool of accounts  
     function verify(bytes32[] memory proof, bytes32 root, bytes32 leaf,uint256 _index) internal pure returns (bool) {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            if (_index%2==1) {
                computedHash = keccak256(abi.encodePacked(proof[i],computedHash));
            } else {
                computedHash = keccak256(abi.encodePacked(computedHash,proof[i]));
            }
            _index=_index/2;
        }
        return computedHash == root;
    }

    //Keeping track of accounts claiming record
    function Set(uint256 _index) private  returns(uint256){
        
        return array = array|(1<< _index);
        
    }
    
    // checks if the account has claimed the tokens
    function isSet(uint256 _index) public view  returns(bool){

       
        return  (1<< _index) == array & (1<< _index);
    }

    // claim token  
    function claim (uint256 _index,address account,uint256 amount,bytes32[] calldata merkleProof) external {

        require (_index > 0 && _index<=16,'Invalid index value');
        _index = _index-1;

        require (isSet(_index)!=true,'Token was already taken');
        bytes32 node = keccak256(abi.encodePacked(account, amount));
        require(verify(merkleProof, merkleRoot, node,_index), 'MerkleDistributor: Invalid proof.');
        
        // Mark it claimed and send the token.
        Set(_index);
        console.log("Here",account);

        require(IERC(token).transfer(account, amount), 'MerkleDistributor: Transfer failed.');
        emit Claimed(_index, account, amount);


            
    }
    

}

