// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./StartupToken.sol";
import "./DAO.sol";

contract Proposal {
    StartupToken public startupToken;
    DAO public dao;
    address public founder;
    string public description;
    uint256 public requestedAmount;
    uint256 public tokensOffered;
    address public fundingAddress;
    uint256 public votesFor;
    uint256 public votesAgainst;
    bool public finalized;

    mapping(address => bool) public hasVoted;

    constructor(
        address _startupToken,
        address _dao,
        string memory _description,
        uint256 _requestedAmount,
        uint256 _tokensOffered,
        address _fundingAddress
    ) {
        startupToken = StartupToken(_startupToken);
        dao = DAO(_dao);
        founder = msg.sender;
        description = _description;
        requestedAmount = _requestedAmount;
        tokensOffered = _tokensOffered;
        fundingAddress = _fundingAddress;
        finalized = false;
    }

    // Founder mints tokens into the proposal contract
    function mintTokens() external {
        require(msg.sender == founder, "Only the founder can mint tokens");
        startupToken.mint(address(this), tokensOffered);
    }

    // Voting logic
    function vote(bool support) external {
        require(!hasVoted[msg.sender], "You have already voted");
        require(!finalized, "Proposal already finalized");

        hasVoted[msg.sender] = true;

        if (support) {
            votesFor += dao.lenders(msg.sender);
        } else {
            votesAgainst += dao.lenders(msg.sender);
        }
    }

    // Finalize the proposal and either transfer funds to the funding address or return tokens
    function finalize() external {
        require(!finalized, "Proposal already finalized");
        require(msg.sender == founder, "Only the founder can finalize");

        finalized = true;

        if (votesFor > votesAgainst) {
            // Transfer USDC from DAO to the funding address
            dao.transferFunds(fundingAddress, requestedAmount);

            // Transfer tokens to DAO
            startupToken.transfer(address(dao), tokensOffered);
        } else {
            // Return tokens to the founder
            startupToken.transfer(founder, tokensOffered);
        }
    }
}
