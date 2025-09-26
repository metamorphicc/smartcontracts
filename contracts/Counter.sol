//SPDX-License-Identifier: GPL-3.0 

pragma solidity ^0.8.0; 
// import "hardhat/console.sol"; 

contract Counter {

  address public owner;
  constructor(address _owner) {    
    owner = _owner;
  }

  
  uint public defaultPrice = 0.001 ether;
  struct Structure {
    address userAddress;
    uint price;
    uint timeStamp;
    uint yearTime;
  }

  mapping (string => Structure) public ens;

  modifier ownerRequire() {
    require(owner == msg.sender, "You're not an owner!");
    _;
  } 

  function smth(uint year) public pure returns(bool){
  if (year < 1) {
      return false;
    } else if (year > 10) {
      return false;
    }
    return true;
  }


  function register(string memory ensName, uint8 year) public {
    require(smth(year), "You bastard");

    require(ens[ensName].userAddress == address(0), "This name is already taken!");

    ens[ensName] = Structure(msg.sender, defaultPrice * year, block.timestamp, year);
    
  }    

  function showAddress(string memory checkDomain) public view returns(address) {
      return ens[checkDomain].userAddress;
  }

  function withdraw() public payable ownerRequire {
    payable(msg.sender).transfer(address(this).balance);
  }

  function setterPrice(uint newPrice) public ownerRequire {
    defaultPrice = newPrice;    
  }

  function payToContract() public payable {}

  function extender(string memory domain, uint howMuchYear) public payable {
    require(ens[domain].userAddress != address(0), "You haven't been registered!");
    require(msg.value == defaultPrice * howMuchYear);
    ens[domain].price = ens[domain].price + defaultPrice * howMuchYear;
    ens[domain].yearTime = ens[domain].yearTime + howMuchYear;
  }

}  