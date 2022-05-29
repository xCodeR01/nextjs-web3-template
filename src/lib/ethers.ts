import { ethers } from "ethers";

const network = "rinkeby";

export const provider = ethers.getDefaultProvider(network, {
  infura: {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  },
  alchemy: "-",
  etherscan: "-",
  pocket: "-",
  ankr: "-",
});
