// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DAO.sol";
import "./Proposal.sol";

contract StartupToken is ERC20, Ownable {
    Proposal[] public proposalAddresses; // Store proposal IDs created by this token
    uint256 public maximumSupply;

    constructor(
        uint256 _totalSupply,
        address _founder,
        string memory name,
        string memory symbol
    ) Ownable(_founder) ERC20(name, symbol) {
        maximumSupply = _totalSupply;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(
            totalSupply() + amount <= maximumSupply,
            "Total supply exceeded"
        );
        _mint(to, amount);
    }

    // Create a proposal in the DAO and store its ID in this contract
    // Founder creates a proposal for funding
    function createProposal(
        string memory description,
        uint256 requestedAmount,
        uint256 tokensOffered,
        address fundingAddress,
        address daoAddress
    ) external onlyOwner {
        require(
            totalSupply() + tokensOffered <= maximumSupply,
            "Total supply exceeded"
        );
        DAO dao = DAO(daoAddress);
        // Create a new Proposal contract
        Proposal proposal = new Proposal(
            owner(),
            address(this),
            address(dao),
            description,
            requestedAmount,
            tokensOffered,
            fundingAddress
        );

        // Mint tokens into the proposal contract
        _mint(address(proposal), tokensOffered);

        // Add the proposal to the array of tracked proposals
        proposalAddresses.push(proposal);
        dao.updateStartupProposals(address(this), proposal);
    }

    function getProposal(uint256 proposalId) external view returns (Proposal) {
        return proposalAddresses[proposalId];
    }

    function getAllProposals() external view returns (Proposal[] memory) {
        return proposalAddresses;
    }

    function proposalCount() external view returns (uint256) {
        return proposalAddresses.length;
    }

    function isStartupToken() external pure returns (bool) {
        return true;
    }

    struct StartupTokenDetails {
        string name;
        string symbol;
        uint256 totalSupply;
        uint256 maximumSupply;
        uint256 proposalCount;
        address owner;
    }
    function getDetails() external view returns (StartupTokenDetails memory) {
        return
            StartupTokenDetails({
                name: name(),
                symbol: symbol(),
                totalSupply: totalSupply(),
                maximumSupply: maximumSupply,
                proposalCount: proposalAddresses.length,
                owner: owner()
            });
    }
}
