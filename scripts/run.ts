import { ethers } from "hardhat";

const main = async () => {
  // ES8 async / await for promises
  const [owner, superCoder] = await ethers.getSigners();
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

  // try to rob money
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("Could not rob contract");
  }

  let ownerBalance = await ethers.provider.getBalance(owner.address);
  console.log(
    "Balance of owner before withdrawal:",
    ethers.utils.formatEther(ownerBalance)
  );

  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  const contractBalance = await ethers.provider.getBalance(
    domainContract.address
  );
  ownerBalance = await ethers.provider.getBalance(owner.address);

  console.log(
    "Contract balance after withdrawal:",
    ethers.utils.formatEther(contractBalance)
  );
  console.log(
    "Balance of owner after withdrawal:",
    ethers.utils.formatEther(ownerBalance)
  );
};

// run main()
main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
