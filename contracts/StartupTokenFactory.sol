// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./StartupToken.sol";

contract StartupTokenFactory is Ownable {
    StartupToken[] public startupTokens;

    constructor(address _initialOwner) Ownable(_initialOwner) {}

    function createStartupToken(
        uint256 initialSupply,
        address _founder
    ) external {
        string memory id = Strings.toString(startupTokens.length + 1);
        string memory name = string(abi.encodePacked("STARTUPTOKEN ", id));
        string memory symbol = string(abi.encodePacked("STK", id));
        StartupToken token = new StartupToken(
            initialSupply,
            _founder,
            name,
            symbol
        );
        startupTokens.push(token);
    }

    function getStartupTokens() external view returns (StartupToken[] memory) {
        return startupTokens;
    }

    function getStartupTokenCount() external view returns (uint256) {
        return startupTokens.length;
    }
}
