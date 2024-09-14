import hre,{ ethers } from "hardhat";
import Deployer from "./Deployer";

async function main(){
    const [deployer, account1] = await ethers.getSigners();
    console.log(`Deployer: ${deployer.address}`);

    const deployerInstance = new Deployer(hre,deployer);
    const deployedContracts = {};
    const initialSupply = ethers.parseUnits("10000000", 6);

    const USDC = await deployerInstance.deploy("MockUSDC",[initialSupply]);
    deployedContracts["USDC"] = USDC.target;

    const DAOFactory = await deployerInstance.deploy("DAOFactory",[deployer.address]);
    deployedContracts["DAOFactory"] = DAOFactory.target;

    const StartupTokenFactory = await deployerInstance.deploy("StartupTokenFactory",[deployer.address]);
    deployedContracts["StartupTokenFactory"] = StartupTokenFactory.target;

    console.log("Deployed Contracts: ",deployedContracts);

}

main().then(()=>{
    process.exit(0);
}).catch((error)=>{
    console.error(error);
    process.exit(1);
})