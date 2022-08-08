import { ethers } from "hardhat";

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = ethers.utils.parseEther("1");

//   const Lock = await ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log("Lock with 1 ETH deployed to:", lock.address);
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const main = async () => {
  // ES8 async / await for promises
  // const [owner, randomPerson] = await ethers.getSigners();
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("cool");
  await domainContract.deployed();

  console.log("Contract deployed to: ", domainContract.address);
  // console.log("contract deployed by: ", owner.address);

  let txn = await domainContract.register("mortal", {
    value: ethers.utils.parseEther("1"),
  });
  await txn.wait();

  const domainAddress = await domainContract.getAddress("mortal");
  console.log("owner of the domain: ", domainAddress);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));
};

// run main()
main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});

// const main = async () => {
//   const domainContractFactory = await hre.ethers.getContractFactory("Domains");
//   const domainContract = await domainContractFactory.deploy("ninja");
//   await domainContract.deployed();

//   console.log("Contract deployed to:", domainContract.address);

//   // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
//   let txn = await domainContract.register("banana", {
//     value: hre.ethers.utils.parseEther("0.1"),
//   });
//   await txn.wait();
//   console.log("Minted domain banana.ninja");

//   txn = await domainContract.setRecord("banana", "Am I a banana or a ninja??");
//   await txn.wait();
//   console.log("Set record for banana.ninja");

//   const address = await domainContract.getAddress("banana");
//   console.log("Owner of domain banana:", address);

//   const balance = await hre.ethers.provider.getBalance(domainContract.address);
//   console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// runMain();
