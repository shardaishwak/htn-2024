// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./StartupToken.sol";
import "./Proposal.sol";

contract DAO {
    IERC20 public usdcToken;
    address public daoCreator;

    Proposal[] public proposals;

    mapping(address => Proposal[]) public startupProposals;

    mapping(address => uint256) public lenders;
    mapping(address => uint256) public assets;

    uint256 public totalUSDCIn;
    uint256 public totalTokensOut;

    string public name;
    string public symbol;

    constructor(
        address _usdcToken,
        address _daoCreator,
        string memory _name,
        string memory _symbol
    ) {
        usdcToken = IERC20(_usdcToken);
        daoCreator = _daoCreator;
        name = _name;
        symbol = _symbol;
    }

    function checkAllowance(address account) external view returns (uint256) {
        return usdcToken.allowance(account, address(this));
    }

    function lend(uint256 amount) external {
        require(amount > 0, "Invalid amount");
        require(
            usdcToken.balanceOf(msg.sender) >= amount,
            "Insufficient USDC balance"
        );
        require(
            usdcToken.allowance(msg.sender, address(this)) >= amount,
            "Insufficient allowance"
        );
        usdcToken.transferFrom(msg.sender, address(this), amount);
        lenders[msg.sender] += amount;
        totalUSDCIn += amount;
    }

    // Transfer funds to the startup if the proposal is accepted
    function transferFundsToProposal(
        address fundingAddress,
        uint256 amount
    ) external {
        require(
            usdcToken.balanceOf(address(this)) >= amount,
            "Insufficient DAO funds"
        );
        usdcToken.transfer(fundingAddress, amount);
    }

    function getProposal(
        uint256 proposalIndex
    ) external view returns (Proposal) {
        return proposals[proposalIndex];
    }

    function getAllProposals() external view returns (Proposal[] memory) {
        return proposals;
    }

    function updateStartupProposals(
        address startup,
        Proposal proposal
    ) external {
        proposals.push(proposal);
        startupProposals[startup].push(proposal);
    }

    function isLender(address account) external view returns (bool) {
        return lenders[account] > 0;
    }

    function getStartupProposals(
        address startup
    ) external view returns (Proposal[] memory) {
        return startupProposals[startup];
    }
}
