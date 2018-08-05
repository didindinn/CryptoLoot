pragma solidity ^0.4.17;

contract Adoption {
    address[16] public adopters;

    // Adopting a meme
    function adopt(uint memeId) public returns (uint) {
        require(memeId >= 0 && memeId <= 15);
        adopters[memeId] = msg.sender;
        return memeId;
    }

    // Get all the adopters
    function getAdopters() public view returns(address[16]) {
        return adopters;
    }
}
