// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract Mortal {
    address public owner;

    constructor () public {
        owner = msg.sender;
    }

    function kill() external {
        require(owner == msg.sender, "contract can only be delete by the owner");
        selfdestruct(msg.sender);
    }
}
