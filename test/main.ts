import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";

import {
	DAOFactory,
	DAO,
	StartupTokenFactory,
	StartupToken,
	MockUSDC,
} from "../typechain-types/contracts/index";
import exp from "constants";

const canLog = true;
const log = (msg: any, ...optional: any) =>
	canLog ? console.log(msg, ...optional) : null;

export type ExtendedContract<T> = Contract & {
	connect: (signer: HardhatEthersSigner) => T;
};

describe("Test the integration", function () {
	let DAOFactory, daoFactory: ExtendedContract<DAOFactory>;
	// let DAO, dao: ExtendedContract<DAO>;
	let StartupTokenFactory,
		startupTokenFactory: ExtendedContract<StartupTokenFactory>;

	let daoFactoryAddress: string,
		daoAddress: string,
		startupTokenFactoryAddress: string,
		usdcAddress: string,
		startupTokenAddress: string;

	let USDC, usdc: ExtendedContract<MockUSDC>;

	let owner: HardhatEthersSigner,
		addr1: HardhatEthersSigner,
		addr2: HardhatEthersSigner,
		addr3: HardhatEthersSigner,
		addr4: HardhatEthersSigner;

	beforeEach(async function () {
		[owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

		// Deploy USDC Token
		const initialSupply = ethers.parseUnits("10000000", 6); // 1,000,000 USDC
		usdc = (await ethers.deployContract("MockUSDC", [initialSupply])) as any;
		await usdc.waitForDeployment();
		usdcAddress = await usdc.getAddress();
		log("USDC Address:", usdcAddress);

		// Mint 100,000 USDC to addr1

		await usdc.mint(addr1.address, ethers.parseUnits("100000", 6));
		await usdc.mint(addr2.address, ethers.parseUnits("100000", 6));
		await usdc.mint(addr3.address, ethers.parseUnits("100000", 6));
		await usdc.mint(addr4.address, ethers.parseUnits("100000", 6));

		// Deploy DAO Factory

		DAOFactory = await ethers.getContractFactory("DAOFactory");
		daoFactory = (await ethers.deployContract("DAOFactory", [
			owner.address,
		])) as any;
		await daoFactory.waitForDeployment();
		daoFactoryAddress = await daoFactory.getAddress();
		log("DAO Factory Address:", daoFactoryAddress);

		// Deploy Startup Token Factory

		StartupTokenFactory = await ethers.getContractFactory(
			"StartupTokenFactory"
		);
		startupTokenFactory = (await ethers.deployContract("StartupTokenFactory", [
			owner.address,
		])) as any;
		await startupTokenFactory.waitForDeployment();
		startupTokenFactoryAddress = await startupTokenFactory.getAddress();
		log("Startup Token Factory Address:", startupTokenFactoryAddress);
	});
	it.skip("Should check if everything has been deployed correctly", async function () {
		// check if the addresses are correct
		expect(await daoFactory.getAddress()).to.equal(daoFactoryAddress);
		// check the owner
		expect(await daoFactory.owner()).to.equal(await owner.address);
		expect(await startupTokenFactory.getAddress()).to.equal(
			startupTokenFactoryAddress
		);
		expect(await startupTokenFactory.owner()).to.equal(await owner.address);

		// check the balance of addr1
		expect(await usdc.balanceOf(addr1.address)).to.equal(
			ethers.parseUnits("100000", 6)
		);
		expect(await usdc.balanceOf(addr2.address)).to.equal(
			ethers.parseUnits("100000", 6)
		);
	});

	it.skip("Should deploy a DAO", async function () {
		// Deploy DAO
		await daoFactory.createDAO(usdcAddress);
		expect(await daoFactory.getDAOCount()).to.equal(1);

		daoAddress = await daoFactory.daos(0);

		const dao1 = await ethers.getContractAt("DAO", daoAddress);
		log("DAO Address:", daoAddress);
		expect(await dao1.usdcToken()).to.equal(usdcAddress);
		expect(await dao1.daoCreator()).to.equal(await owner.getAddress());

		console.log(await daoFactory.getDAOs());
	});

	it.skip("Should deploy a Startup Token", async function () {
		// Deploy the Startup Token with initial supply of 100,000
		await startupTokenFactory.createStartupToken(100000, addr1.address);
		expect(await startupTokenFactory.getStartupTokenCount()).to.equal(1);
		// The owner should be the creator of the token
		const startupTokenAddress = await startupTokenFactory.startupTokens(0);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);
		expect(await startupToken.owner()).to.equal(await addr1.getAddress());

		expect(await startupToken.maximumSupply()).to.equal(100000);

		// check the details
		const details = await startupToken.getDetails();
		log("Details:", details);
		expect(details[5]).to.equal(addr1.address);
	});

	it.skip("Should allow address 2 to lend to DAO and be a lender", async function () {
		// deploy a DAO
		await daoFactory.createDAO(usdcAddress);
		daoAddress = await daoFactory.daos(0);

		const dao = await ethers.getContractAt("DAO", daoAddress);

		const lendAmount = ethers.parseUnits("20000", 6);
		const tx = await usdc.connect(addr2).approve(daoAddress, lendAmount);

		await tx.wait();

		// check the allowance
		expect(await usdc.allowance(addr2.address, daoAddress)).to.equal(
			lendAmount
		);

		const allowance = await usdc.allowance(addr2.address, daoAddress);
		expect(allowance).to.equal(lendAmount);
		// check to make sure that lender has enough balance
		expect(await usdc.balanceOf(addr2.address)).to.be.gte(
			ethers.parseUnits("20000", 6)
		);

		const lendTx = await dao.connect(addr2).lend(lendAmount);
		await lendTx.wait();
		// check if addr2 is a lender
		expect(await dao.isLender(addr2.address)).to.equal(true);

		// check the balance of DAO
		expect(await usdc.balanceOf(daoAddress)).to.equal(lendAmount);
	});

	it.skip("Should create a new proposal", async function () {
		// deploy a DAO
		await daoFactory.createDAO(usdcAddress);
		daoAddress = await daoFactory.daos(0);
		const dao = await ethers.getContractAt("DAO", daoAddress);

		// lend to DAO
		const lendAmount = ethers.parseUnits("20000", 6);
		await usdc.connect(addr2).approve(daoAddress, lendAmount);
		await dao.connect(addr2).lend(lendAmount);

		// create a startupToken
		await startupTokenFactory.createStartupToken(100000, addr1.address);
		const startupTokenAddress = await startupTokenFactory.startupTokens(0);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);

		// create a proposal
		await startupToken
			.connect(addr1)
			.createProposal(
				"This is the description",
				1000,
				1000,
				owner.address,
				daoAddress
			);

		expect(await startupToken.proposalCount()).to.equal(1);
		const proposalAddress = await startupToken.proposalAddresses(0);
		const proposal = await ethers.getContractAt("Proposal", proposalAddress);

		const details = await proposal.getDetails();
		log("Details:", details);

		expect(details[0]).to.equal(startupTokenAddress);
		expect(details[1]).to.equal(daoAddress);
		expect(details[2]).to.equal(addr1.address);
		expect(details[3]).to.equal("This is the description");
		expect(details[4]).to.equal(1000);
		expect(details[5]).to.equal(1000);
		expect(details[6]).to.equal(owner.address);

		// check the Startup Token balance of the the proposal
		expect(await startupToken.balanceOf(proposalAddress)).to.equal(1000);

		// check that the proposal is inside the dao conotract
		expect(await dao.proposals(0)).to.equal(proposalAddress);
		log("DAO Proposals:", await dao.getStartupProposals(startupTokenAddress));
		expect(await dao.getStartupProposals(startupTokenAddress)).to.deep.equal([
			proposalAddress,
		]);
	});

	it.skip("Should vote on a proposal: true", async function () {
		// deploy a DAO
		await daoFactory.createDAO(usdcAddress);
		daoAddress = await daoFactory.daos(0);
		const dao = await ethers.getContractAt("DAO", daoAddress);

		// lend to DAO
		const lendAmount = ethers.parseUnits("20000", 6);
		await usdc.connect(addr2).approve(daoAddress, lendAmount);
		await dao.connect(addr2).lend(lendAmount);

		// create a startupToken
		await startupTokenFactory.createStartupToken(100000, addr1.address);
		const startupTokenAddress = await startupTokenFactory.startupTokens(0);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);

		// create a proposal
		await startupToken
			.connect(addr1)
			.createProposal(
				"This is the description",
				1000,
				1000,
				owner.address,
				daoAddress
			);

		expect(await startupToken.proposalCount()).to.equal(1);
		const proposalAddress = await startupToken.proposalAddresses(0);
		const proposal = await ethers.getContractAt("Proposal", proposalAddress);

		// NEW CODE

		// vote on the proposal
		await proposal.connect(addr2).vote(true);
		expect(await proposal.votesFor()).to.equal(lendAmount);

		expect(await proposal.votesAgainst()).to.equal(0);
		expect(await proposal.totalVotes()).to.equal(lendAmount);
	});

	it.skip("Should vote on a proposal: false", async function () {
		// deploy a DAO
		await daoFactory.createDAO(usdcAddress);
		daoAddress = await daoFactory.daos(0);
		const dao = await ethers.getContractAt("DAO", daoAddress);

		// lend to DAO
		const lendAmount = ethers.parseUnits("20000", 6);
		await usdc.connect(addr2).approve(daoAddress, lendAmount);
		await dao.connect(addr2).lend(lendAmount);

		// create a startupToken
		await startupTokenFactory.createStartupToken(100000, addr1.address);
		const startupTokenAddress = await startupTokenFactory.startupTokens(0);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);

		// create a proposal
		await startupToken
			.connect(addr1)
			.createProposal(
				"This is the description",
				1000,
				1000,
				owner.address,
				daoAddress
			);

		expect(await startupToken.proposalCount()).to.equal(1);
		const proposalAddress = await startupToken.proposalAddresses(0);
		const proposal = await ethers.getContractAt("Proposal", proposalAddress);

		// NEW CODE

		// vote on the proposal
		await proposal.connect(addr2).vote(false);
		expect(await proposal.votesFor()).to.equal(0);

		expect(await proposal.votesAgainst()).to.equal(lendAmount);
		expect(await proposal.totalVotes()).to.equal(lendAmount);
	});

	it.skip("should not be able to vote if not a lender", async function () {
		// deploy a DAO
		await daoFactory.createDAO(usdcAddress);
		daoAddress = await daoFactory.daos(0);
		const dao = await ethers.getContractAt("DAO", daoAddress);

		// create a startupToken
		await startupTokenFactory.createStartupToken(100000, addr1.address);
		const startupTokenAddress = await startupTokenFactory.startupTokens(0);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);

		// create a proposal
		await startupToken
			.connect(addr1)
			.createProposal(
				"This is the description",
				1000,
				1000,
				owner.address,
				daoAddress
			);

		expect(await startupToken.proposalCount()).to.equal(1);
		const proposalAddress = await startupToken.proposalAddresses(0);
		const proposal = await ethers.getContractAt("Proposal", proposalAddress);

		// NEW CODE

		// vote on the proposal
		expect(proposal.connect(addr2).vote(true)).to.be.revertedWith(
			"You need to be a lender to vote"
		);
	});

	it("should vote and then finalize the proposal", async function () {
		// deploy a DAO
		await daoFactory.createDAO(usdcAddress);
		daoAddress = await daoFactory.daos(0);
		const dao = await ethers.getContractAt("DAO", daoAddress);

		// lend to DAO
		const lendAmount = ethers.parseUnits("20000", 6);
		await usdc.connect(addr2).approve(daoAddress, lendAmount);
		await dao.connect(addr2).lend(lendAmount);

		await usdc.connect(addr3).approve(daoAddress, lendAmount);
		await dao.connect(addr3).lend(lendAmount);

		await usdc.connect(addr4).approve(daoAddress, lendAmount);
		await dao.connect(addr4).lend(lendAmount);

		// create a startupToken
		await startupTokenFactory.createStartupToken(100000, addr1.address);
		const startupTokenAddress = await startupTokenFactory.startupTokens(0);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);

		// create a proposal
		await startupToken
			.connect(addr1)
			.createProposal(
				"This is the description",
				1000,
				1000,
				owner.address,
				daoAddress
			);

		expect(await startupToken.proposalCount()).to.equal(1);
		const proposalAddress = await startupToken.proposalAddresses(0);
		const proposal = await ethers.getContractAt("Proposal", proposalAddress);

		// NEW CODE

		// vote on the proposal
		await proposal.connect(addr2).vote(true);
		await proposal.connect(addr3).vote(true);

		// finalize the proposal
		const percentage = await proposal.calculateVotingPower();
		const totalVotes = await proposal.totalVotes();
		const votesFor = await proposal.votesFor();
		const totalUSDC = await dao.totalUSDCIn();
		const canApprove = await proposal.canApprove();
		log("Votes For:", votesFor);
		log("Total Votes:", totalVotes);
		log("Percentage:", percentage);
		log("Total USDC:", totalUSDC);
		log("Can Approve:", canApprove);
	});
});
