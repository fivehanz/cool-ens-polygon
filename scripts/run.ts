import { ethers } from "hardhat";

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
