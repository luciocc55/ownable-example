import chai from "chai";
import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

describe("Ownable", function () {
  before(async function () {
    // Se le indica a la libreria de tests chai que se utilizara solidity
    chai.use(solidity);
    // getSigners trae las addresses que se encuentran en el RPC
    this.signers = await ethers.getSigners();
    // Utilizamos la primera del array como Owner
    this.owner = this.signers[0];
    // Y otra del array demanera random como no Owner
    this.noOwner = this.signers[4];
    // getContractFactory genera una instancia del Smart Contract
    // se utiliza la address de la variable owner como owner
    const Ownable = await ethers.getContractFactory("OwnableExampleContract", this.owner);
    // Luego con la instancia del smart contract se puede hacer un deploy
    this.ownable = await Ownable.deploy();
    // Se espera que el deploy sea exitoso para continuar
    await this.ownable.deployed();
  });
  it("Should accept the call from the owner and revert for the no owner", async function () {
    // Chequeamos que closed funciona para el owner  (por default el smart contract se conecta con la address owner)
    chai.expect(await this.ownable.closed()).equal('This is only open for the owner');
    // Nos conectamos a la address no noOwner y luego comprobamos que el metodo closed no revierta con un error
    await chai.expect( this.ownable.connect(this.noOwner).closed()).to.be.revertedWith("Ownable: caller is not the owner");
    // Probamos el metodo open para una address noOwner y comprobamos que funcione
    chai.expect(await this.ownable.connect(this.noOwner).open()).equal('This is open for everyone');
  });
});
