import { provider } from "@/lib/ethers";
import { ethers } from "ethers";

// You can also use an ENS name for the contract address
export const daiAddress = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
export const erc20Abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

// inside a component, after connecting to wallet, connect the contract
// to a valid signer to allow writing transactions
export const daiContract = new ethers.Contract(daiAddress, erc20Abi, provider);

// visit this link for contract usage examples
// https://docs.ethers.io/v5/api/contract/example/

// encoding/decoding contract interaction calls and return data
//   ethers.utils.defaultAbiCoder.encode(abi.foo.inputs, [args])
//   ethers.utils.defaultAbiCoder.decode(abi.foo.outputs, data)

// we can also use abi interface to encode and decode data`
// https://docs.ethers.io/v5/api/utils/abi/interface/#Interface--encoding
//   daiContract.interface.encodeFunctionData("transferFrom", [
//     "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
//     parseEther("1.0")
//   ])
//   const resultData = "0x00000000000000000000000000de0b6b3a7640000";
//   daiContract.interface.decodeFunctionResult("balanceOf", resultData)
