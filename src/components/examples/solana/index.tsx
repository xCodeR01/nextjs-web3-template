import { Box } from "@/components/elements";
import { useBalance } from "@/hooks/useBalance";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  TransactionSignature,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  PublicKey,
} from "@solana/web3.js";
import { sign } from "tweetnacl";
import { useCallback, useEffect } from "react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";

const SolanaExample = () => {
  const {
    wallet,
    wallets,
    select,
    connect,
    connecting,
    connected,
    disconnect,
    publicKey,
    sendTransaction,
    signMessage,
  } = useWallet();
  const { connection } = useConnection();
  const balance = useBalance();

  const handleAirdrop = useCallback(async () => {
    let signature: TransactionSignature = "";
    if (!publicKey) return;
    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });
    } catch (error: any) {
      console.log("error", `Airdrop failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection]);

  const handleSendSol = useCallback(async () => {
    if (!publicKey) return;
    let signature: TransactionSignature = "";
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            "GUBGMHVpwcTsPFvNNVdG5DKtpv6UwksAfzw5aULcGzgG"
          ),
          lamports: 1_000_000,
        })
      );
      signature = await sendTransaction(transaction, connection);
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });
    } catch (error: any) {
      console.log("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, connection, sendTransaction]);

  const handleSignMessage = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) throw new Error("Wallet not connected!");
      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");
      // Encode anything as bytes
      const message = new TextEncoder().encode("Hello, world!");
      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!sign.detached.verify(message, signature, publicKey.toBytes()))
        throw new Error("Invalid signature!");
    } catch (error: any) {
      console.log("error", `Sign Message failed! ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  useEffect(() => {
    if (!wallet) select(PhantomWalletName);
  }, [select, wallet]);

  return (
    <div>
      <Box
        as="h2"
        css={{
          bgColor: "$primaryBg",
          p: "$md",
          mb: "$5",
          borderRadius: "$sm",
        }}
      >
        Solana Example with phantom wallet
      </Box>
      <Box>
        <Box css={{ mb: "$4", display: "flex", gap: "$5" }}>
          {connected ? (
            <button onClick={disconnect}>Disconnect</button>
          ) : (
            <button disabled={connecting || !wallet} onClick={connect}>
              {connecting ? "Connecting..." : "Connect Phantom"}
            </button>
          )}
          <span>Your balance {balance || 0}</span>
        </Box>
        <Box css={{ mb: "$4" }}>
          <button disabled={!publicKey} onClick={handleAirdrop}>
            Request airdrop
          </button>
        </Box>
        <Box css={{ mb: "$4" }}>
          <button disabled={!publicKey} onClick={handleSendSol}>
            Transfer 0.001 SOL
          </button>
        </Box>
        <Box css={{ mb: "$4" }}>
          <button disabled={!publicKey} onClick={handleSignMessage}>
            Sign message
          </button>
        </Box>
      </Box>
    </div>
  );
};

export default SolanaExample;
