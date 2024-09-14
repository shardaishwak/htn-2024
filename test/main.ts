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

const canLog = false;
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
		addr2: HardhatEthersSigner;

	beforeEach(async function () {
		[owner, addr1, addr2] = await ethers.getSigners();

		// Deploy USDC Token
		const initialSupply = ethers.parseUnits("1000000", 6); // 1,000,000 USDC
		usdc = (await ethers.deployContract("MockUSDC", [initialSupply])) as any;
		await usdc.waitForDeployment();
		usdcAddress = await usdc.getAddress();
		log("USDC Address:", usdcAddress);

		// Mint 100,000 USDC to addr1

		await usdc.mint(addr1.address, ethers.parseUnits("100000", 6));
		const addr1Balance = await usdc.balanceOf(addr1.address);
		log("addr1 USDC Balance:", addr1Balance.toString());

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
	it("Should check if everything has been deployed correctly", async function () {
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
	});

	it("Should deploy a DAO", async function () {
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

	it("Should deploy a Startup Token", async function () {
		// Deploy the Startup Token with initial supply of 100,000
		await startupTokenFactory.createStartupToken(100000, addr1.address);
		expect(await startupTokenFactory.getStartupTokenCount()).to.equal(1);
		// The owner should be the creator of the token
		startupTokenAddress = await startupTokenFactory.startupTokens(0);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);
		const addr1Balance = await usdc.balanceOf(addr1.address);
		log("addr1 USDC Balance:", addr1Balance.toString());
		expect(await startupToken.owner()).to.equal(await addr1.getAddress());

		expect(await startupToken.maximumSupply()).to.equal(100000);
	});

	it("Should allow address 2 to lend to DAO and be a lender", async function () {
		const dao = await ethers.getContractAt("DAO", daoAddress);
		const startupToken = await ethers.getContractAt(
			"StartupToken",
			startupTokenAddress
		);
	});
});
