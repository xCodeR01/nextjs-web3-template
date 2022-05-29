import { Web3ReactHooks } from "@web3-react/core";
import { useState, useEffect } from "react";
import type { BigNumber } from "ethers";

export default function useBalance(
  account?: string,
  provider?: ReturnType<Web3ReactHooks["useProvider"]>
): BigNumber | undefined {
  const [balance, setBalance] = useState<BigNumber | undefined>();

  useEffect(() => {
    if (provider && account) {
      let stale = false;

      void provider.getBalance(account).then((accBalance) => {
        if (stale) return;
        setBalance(accBalance);
      });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [provider, account]);

  return balance;
}
