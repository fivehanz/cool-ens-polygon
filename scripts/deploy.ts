import { BigNumber, ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import { Domains } from "../typechain-types/Domains";
import { Domains__factory } from "../typechain-types/factories/Domains__factory";

const main = async () => {
  const domainContractFactory: Domains__factory =
    await ethers.getContractFactory("Domains");
  const domainContract: Domains = await domainContractFactory.deploy("cool");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn: ContractTransaction = await domainContract.register("bananafish", {
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain bananafish.cool");

  txn = await domainContract.setRecord(
    "bananafish",
    "Am I a banana or a ninja??"
  );
  await txn.wait();
  console.log("Set record for bananafish.cool");

  const address: string = await domainContract.getAddress("bananafish");
  console.log("Owner of domain bananafish:", address);

  const balance: BigNumber = await ethers.provider.getBalance(
    domainContract.address
  );
  console.log("Contract balance:", ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
