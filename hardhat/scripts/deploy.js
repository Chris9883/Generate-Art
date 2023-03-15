const { ethers, run } = require("hardhat");
require("dotenv").config();

async function main() {
  const Contract = await ethers.getContractFactory("GenerateArt");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(`GenerateArt Contract deployed to ${contract.address}`);

  // contract verification on goerli.etherscan.io
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Awaiting contract verification, this may take a while");
    // wait a little bit so that etherscan has access to bytecode
    await Sleep(60000);
    try {
      await run("verify:verify", {
        address: contract.address,
        constructorArguments: [],
      });
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already verified!");
      } else {
        console.log(e);
      }
    }
  }
}

function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
