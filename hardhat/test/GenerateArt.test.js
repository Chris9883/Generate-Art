const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("GenerateArt", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("GenerateArt");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      expect(await contract.owner()).to.equal(owner.address);
    });
    it("Should set the right name and symbol", async function () {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      expect(await contract.name()).to.equal("GenerateArt");
      expect(await contract.symbol()).to.equal("ART");
    });
  });

  describe("Minting", function () {
    it("Anyone can mint", async function () {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      await contract.connect(otherAccount).safeMint("token2uri");
      await contract.connect(otherAccount).safeMint("token3uri");
      expect(await contract.balanceOf(owner.address)).to.equal(1);
      expect(await contract.balanceOf(otherAccount.address)).to.equal(2);
    });
    it("Mint function can receive ether", async function () {
      const { contract, otherAccount } = await loadFixture(deployFixture);
      const price = ethers.utils.parseEther("1");
      await contract.connect(otherAccount).safeMint("token2", { value: price });
      expect(await contract.balanceOf(otherAccount.address)).to.equal(1);
    });
    it("uri is updated correctly", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      await contract.connect(otherAccount).safeMint("token2uri");
      expect(await contract.tokenURI(0)).to.equal("token1uri");
      expect(await contract.tokenURI(1)).to.equal("token2uri");
    });
  });

  describe("Transferring tokens", function () {
    it("can't transfer if not token owner or approved", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      await contract.connect(otherAccount).safeMint("token2uri");
      await expect(
        contract
          .connect(otherAccount)
          .transferFrom(owner.address, otherAccount.address, 0)
      ).to.be.reverted;
      await expect(
        contract
          .connect(owner)
          .transferFrom(otherAccount.address, owner.address, 1)
      ).to.be.reverted;
    });
    it("owner can transfer token, emits transfer event, balances updated correctly", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      expect(await contract.balanceOf(owner.address)).to.equal(1);
      expect(
        await contract.transferFrom(owner.address, otherAccount.address, 0)
      ).to.emit("Transfer");
      expect(await contract.balanceOf(owner.address)).to.equal(0);
      expect(await contract.balanceOf(otherAccount.address)).to.equal(1);
    });
    it("approved person can transfer token", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      await contract.approve(otherAccount.address, 0);
      expect(
        await contract
          .connect(otherAccount)
          .transferFrom(owner.address, otherAccount.address, 0)
      ).to.emit("Transfer");
      expect(await contract.balanceOf(owner.address)).to.equal(0);

      expect(await contract.balanceOf(otherAccount.address)).to.equal(1);
    });
  });

  describe("Burning", function () {
    it("can't burn if not token owner or approved", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      await contract.connect(otherAccount).safeMint("token2uri");
      await expect(contract.connect(otherAccount).burn(0)).to.be.reverted;
      await expect(contract.connect(owner).burn(1)).to.be.reverted;
    });
    it("token owner can burn, emits event, balances updated correctly", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      expect(await contract.balanceOf(owner.address)).to.equal(1);
      expect(await contract.burn(0)).to.emit("Transfer");
      expect(await contract.balanceOf(owner.address)).to.equal(0);
    });
    it("approved person can burn token", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await contract.safeMint("token1uri");
      expect(await contract.balanceOf(owner.address)).to.equal(1);

      await contract.approve(otherAccount.address, 0);
      expect(await contract.connect(otherAccount).burn(0)).to.emit("Transfer");
      expect(await contract.balanceOf(owner.address)).to.equal(0);
    });
  });

  describe("Withdrawals", function () {
    it("owner can withdraw funds", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      const price = ethers.utils.parseEther("1");
      await contract.connect(otherAccount).safeMint("token2", { value: price });
      const balanceBefore = await owner.getBalance();
      await contract.connect(owner).withdraw();
      const balanceAfter = await owner.getBalance();
      assert(
        parseInt(balanceAfter) >
          parseInt(balanceBefore.add(ethers.utils.parseEther("0.9")))
      );
    });
    it("other account can't withdraw funds", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      const price = ethers.utils.parseEther("1");
      await contract.connect(otherAccount).safeMint("token2", { value: price });
      await expect(contract.connect(otherAccount).withdraw()).to.be.reverted;
    });
  });
});
