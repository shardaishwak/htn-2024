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
        address _founder,
        address _startupToken,
        address _dao,
        string memory _description,
        uint256 _requestedAmount,
        uint256 _tokensOffered,
        address _fundingAddress
    ) {
        startupToken = StartupToken(_startupToken);
        dao = DAO(_dao);
        founder = _founder;
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
        // the voter needs to be a DAO lender
        require(dao.isLender(msg.sender), "You need to be a lender to vote");
        require(!hasVoted[msg.sender], "You have already voted");
        require(!finalized, "Proposal already finalized");

        hasVoted[msg.sender] = true;

        if (support) {
            votesFor += dao.lenders(msg.sender);
        } else {
            votesAgainst += dao.lenders(msg.sender);
        }
    }

    function totalVotes() external view returns (uint256) {
        return votesFor + votesAgainst;
    }

    function calculateVotingPower() public view returns (uint256) {
        uint256 totalUSDCLent = dao.totalUSDCIn();

        return (votesFor * 100 * 1000000) / totalUSDCLent;
    }

    function canApprove() public view returns (bool) {
        return calculateVotingPower() > 50 * 1000000;
    }

    // Finalize the proposal and either transfer funds to the funding address or return tokens
    function finalize() external {
        require(!finalized, "Proposal already finalized");

        finalized = true;

        if (canApprove()) {
            // Transfer USDC from DAO to the funding address
            dao.transferFundsToProposal(fundingAddress, requestedAmount);
            startupToken.fundsReceived(address(dao), requestedAmount);
            // Transfer tokens to DAO
            startupToken.transfer(address(dao), tokensOffered);

            dao.addAsset(address(startupToken), tokensOffered);
        } else {
            // Return tokens to the founder
            startupToken.transfer(founder, tokensOffered);
        }
    }

    struct ProposalDetails {
        address startupToken;
        address dao;
        address founder;
        string description;
        uint256 requestedAmount;
        uint256 tokensOffered;
        address fundingAddress;
        uint256 votesFor;
        uint256 votesAgainst;
        bool finalized;
        bool voted;
        bool voteSelection;
        bool canFinalize;
        uint256 votingPower;
    }

    function getDetails() external view returns (ProposalDetails memory) {
        return
            ProposalDetails({
                startupToken: address(startupToken),
                dao: address(dao),
                founder: founder,
                description: description,
                requestedAmount: requestedAmount,
                tokensOffered: tokensOffered,
                fundingAddress: fundingAddress,
                votesFor: votesFor,
                votesAgainst: votesAgainst,
                finalized: finalized,
                voted: hasVoted[msg.sender],
                voteSelection: hasVoted[msg.sender]
                    ? votesFor > votesAgainst
                    : false,
                canFinalize: canApprove(),
                votingPower: calculateVotingPower()
            });
    }
}
