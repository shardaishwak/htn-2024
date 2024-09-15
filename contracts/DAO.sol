// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./StartupToken.sol";
import "./Proposal.sol";

contract DAO {
    IERC20 public usdcToken;
    address public daoCreator;

    string public description;

    Proposal[] public proposals;

    mapping(address => Proposal[]) public startupProposals;

    mapping(address => uint256) public lenders;
    mapping(address => uint256) public assets;

    address[] public lendersList;
    address[] public assetsList;

    uint256 public totalUSDCIn;
    uint256 public totalTokensOut;

    string public name;
    string public symbol;

    constructor(
        address _usdcToken,
        address _daoCreator,
        string memory _name,
        string memory _symbol,
        string memory _description
    ) {
        usdcToken = IERC20(_usdcToken);
        daoCreator = _daoCreator;
        name = _name;
        symbol = _symbol;
        description = _description;
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

        if (lenders[msg.sender] == 0) {
            lendersList.push(msg.sender);
        }
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

    struct DAODetails {
        address usdcToken;
        address daoCreator;
        string description;
        uint256 totalUSDCIn;
        uint256 totalTokensOut;
        string name;
        string symbol;
    }

    function getDetails() external view returns (DAODetails memory) {
        return
            DAODetails({
                usdcToken: address(usdcToken),
                daoCreator: daoCreator,
                description: description,
                totalUSDCIn: totalUSDCIn,
                totalTokensOut: totalTokensOut,
                name: name,
                symbol: symbol
            });
    }

    function addAsset(address assetOwner, uint256 tokenAmount) external {
        // Asset addition logic here

        if (assets[assetOwner] == 0) {
            // Check if the owner already has assets
            assetsList.push(assetOwner); // Add to asset addresses if not
        }

        assets[assetOwner] += tokenAmount;
    }

    function getAssets() external view returns (address[] memory) {
        return assetsList;
    }

    function getLenders() external view returns (address[] memory) {
        return lendersList;
    }
}
