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
  const [owner, randomPerson] = await ethers.getSigners();
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to: ", domainContract.address);
  console.log("contract deployed by: ", owner.address);

  let txn = await domainContract.register("doom");
  await txn.wait();

  const domainAddress = await domainContract.getAddress("doom");
  console.log("owner of the domain: ", domainAddress);

  // Trying to set a record that doesn't belong to me!
  txn = await domainContract
    .connect(randomPerson)
    .setRecord("doom", "Haha my domain now!");
  await txn.wait();
};

// run main()
main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
