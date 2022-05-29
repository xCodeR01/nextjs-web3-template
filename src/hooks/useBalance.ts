import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const useBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | undefined>();
  console.log(publicKey);

  useEffect(() => {
    if (!publicKey) {
      setBalance(undefined);
      return;
    }
    connection
      .getBalance(publicKey, "confirmed")
      .then((rawBalance) => {
        setBalance(rawBalance / LAMPORTS_PER_SOL);
      })
      .catch((e) => console.log(`error getting balance: `, e));
  }, [publicKey, connection]);

  return balance;
};
