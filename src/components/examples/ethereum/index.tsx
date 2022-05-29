import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { metaMask, metaMaskHooks } from "@/lib/web3-react";
import { ethers } from "ethers";
import { Box } from "@/components/elements";
import useBalance from "@/hooks/useBalance";
import { daiContract } from "./contract";

const MetaMaskExample = () => {
  const isActive = metaMaskHooks.useIsActive();
  const isActivating = metaMaskHooks.useIsActivating();

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        backgroundColor: "$slate9",
        borderRadius: "$md",
        paddingInline: "$12",
      }}
    >
      <h4>Connect using MetaMask</h4>
      <p>
        Status: {isActive ? "active" : isActivating ? "activating" : "inactive"}
      </p>
      <p>
        {isActive ? (
          <button type="button" onClick={() => metaMask.deactivate()}>
            Disconnect
          </button>
        ) : (
          <button type="button" onClick={() => metaMask.activate()}>
            Connect
          </button>
        )}
      </p>
    </Box>
  );
};

const ProviderExample = () => {
  const { account, provider } = useWeb3React();
  const balance = useBalance(account, provider);

  return (
    <Box>
      <h4>Provider Usage Example</h4>
      <p>
        Balance: {balance ? ethers.utils.formatEther(balance) : "No balance"}
      </p>
    </Box>
  );
};

const ContractExample = () => {
  const { account, provider } = useWeb3React();
  const signer = useMemo(() => provider?.getSigner(), [provider]);
  const [name, setName] = useState("");

  const sendDai = useCallback(async () => {
    // again checking account instead signer
    console.log("sendDai", account, signer);
    if (!account) throw new Error("No account for signing");
    daiContract
      .connect(signer as any)
      .transfer(
        "0x6531b565B48311c4a8B2214E70508FCb90a41A45",
        ethers.utils.parseUnits("100.2")
      )
      .then((res: any) => {
        console.log("res", res);
      });
  }, [account, signer]);

  useEffect(() => {
    daiContract.name().then((name: string) => setName(name));
  }, []);

  return (
    <div>
      {/* no sure which is better, cuz signer is available even after disconnect */}
      <div>
        {signer
          ? "Signer available for writing to blockchain"
          : "Read only contract"}
      </div>
      <div>
        {account
          ? "Signer available for writing to blockchain"
          : "Read only contract"}
      </div>
      <p>
        Reading from erc20 contract
        <br />
        <span>Coin name: {name}</span>
      </p>
      <button type="button" onClick={sendDai}>
        Send 1 Dai to me
      </button>
    </div>
  );
};

export const EthereumExample = () => {
  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Ethereum Web3 Example</h2>
      <MetaMaskExample />
      <ProviderExample />
      <ContractExample />
    </div>
  );
};

export default EthereumExample;

// provider?.send(m, p) is equivalent to metamask.request({m, p})
// provider?.send("eth_accounts", []).then((res) => {
//   console.log("eth_accounts", res);
// });

// https://ethereum.stackexchange.com/questions/765/what-is-the-difference-between-a-transaction-and-a-call
// provider?.call(txParams) // uses 'eth_call' method, useful for read-only calls
// provider?.sendTransaction(txParams) // uses 'eth_sendTransaction' method, only takes signed tx
