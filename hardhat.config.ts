import "dotenv/config";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-typechain";
import "solidity-coverage";
import "@nomiclabs/hardhat-waffle";
// Esta cuenta es solo a modo de test.
let mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  mnemonic = "test test test test test test test test test test test test";
}
const mnemonicAccounts = {
  mnemonic,
};
// Estas cuentas seran utilizadas en casos donde se desee testear y hacer deploy fuera de la red local 
// (tener en cuenta que para esto se debe utilziar un archivo .env donde se encontraran las private keys necesarias)
const accounts = {
  Localnet: [String(process.env.LOCALNET_PRIVATE_KEY)],
  Testnet: [String(process.env.TESTNET_PRIVATE_KEY)],
  Mainnet: [String(process.env.MAINNET_PRIVATE_KEY)],
};
// Esta es la configuracion de la version de solidity y las networks habilitadas para correr dentro de hardhat
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
  },
  networks: {
    coverage: {
      url: "http://localhost:5458",
      accounts: mnemonicAccounts,
    },
    hardhat: {
      accounts: mnemonicAccounts,
    },
    localhost: {
      url: "http://localhost:8545",
    },

    // Si se desea utilizar networks externas se pueden generar aqui
    // pero se necesitan private keys de cuentas reales sobre la network especifica

    // localnet: {
    //   url: "http://localhost:9500",
    //   chainId: 1666700000,
    //   accounts: accounts.Localnet,
    // },
    // testnet: {
    //   url: "https://api.s0.b.hmny.io",
    //   chainId: 1666700000,
    //   accounts: accounts.Testnet,
    // },
    // mainnet: {
    //   url: "https://api.s0.t.hmny.io",
    //   chainId: 1666600000,
    //   accounts: accounts.Mainnet,
    // },
  },
};

export default config;
