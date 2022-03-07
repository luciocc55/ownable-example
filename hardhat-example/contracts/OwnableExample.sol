//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// Ownable es un smart contract generado por openzeppelin que
// se utiliza para heredar todas sus caracteristicas sobre OwnableExample

contract OwnableExampleContract is Ownable {

    function open() external view returns (string memory) {
        console.log('Console log works in solidity');
        return 'This is open for everyone';
    }

    function closed() external view onlyOwner returns (string memory) {
        console.log('Console log works in solidity');
        return 'This is only open for the owner';
    }
}
