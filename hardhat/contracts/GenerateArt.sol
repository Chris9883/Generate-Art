// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error GenerateArt__TransferFailed();

contract GenerateArt is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIdCounter;

   constructor() ERC721("GenerateArt", "ART") {}

   function safeMint(string memory _tokenURI) external payable {
      uint256 tokenId = _tokenIdCounter.current();
      _tokenIdCounter.increment();
      _safeMint(msg.sender, tokenId);
      _setTokenURI(tokenId, _tokenURI);
   }

   function withdraw() external onlyOwner{
      (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
      if(!success) {
         revert GenerateArt__TransferFailed();
      }
   }

   // The following functions are overrides required by Solidity.
   function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
