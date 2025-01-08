const { expect } = require("chai");

describe("GalacticGacha Contract", function () {
  let GalacticGacha;
  let gacha;
  let owner;
  let addr1;

  beforeEach(async function () {
    GalacticGacha = await ethers.getContractFactory("GalacticGacha");
    [owner, addr1] = await ethers.getSigners();
    gacha = await GalacticGacha.deploy();
  });

  it("Should mint a new token and assign metadata", async function () {
    const metadataURI = "https://api.galacticgacha.com/metadata/star1.json";
    
    // Mint token
    await gacha.mint(owner.address, metadataURI);
    
    // Verify the token URI
    expect(await gacha.tokenURI(0)).to.equal(metadataURI);

    // Verify the token data
    expect(await gacha.getTokenData(0)).to.equal(metadataURI);
  });
});
