const { ethers } = require("hardhat");

async function main() {
  const initialOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const GalacticGacha = await ethers.getContractFactory("GalacticGacha");
  const galacticGacha = await GalacticGacha.deploy(initialOwner);

  // Wait for the contract to be deployed
  await galacticGacha.deploymentTransaction().wait(1);

  console.log("GalacticGacha deployed to:", await galacticGacha.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });