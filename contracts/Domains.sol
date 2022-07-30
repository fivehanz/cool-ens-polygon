// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    // mapping datatype to store the name 
    mapping(string => address) public domains;

    // store records
    mapping(string => string) public records;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    // adds name to the mapping
    function register(string calldata name) public {
        // check that the name is unregistered
        require(domains[name] == address(0));
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    // returns the domain owners address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // check the owner is the transaction sender
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }
}