// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DAO.sol";

contract DAOFactory is Ownable {
    DAO[] public daos;

    constructor(address _initialOwner) Ownable(_initialOwner) {}

    function createDAO(address usdcToken) external onlyOwner {
        string memory id = Strings.toString(daos.length + 1);
        string memory name = string(abi.encodePacked("DAO ", id));
        string memory symbol = string(abi.encodePacked("DAO", id));
        DAO dao = new DAO(usdcToken, msg.sender, name, symbol);
        daos.push(dao);
    }

    function getDAOs() external view returns (DAO[] memory) {
        return daos;
    }

    function getDAOCount() external view returns (uint256) {
        return daos.length;
    }
}
