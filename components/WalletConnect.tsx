// WalletConnect.js

import { Principal } from "@dfinity/principal";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const WalletConnect = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
    const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const result = await window.ic.infinityWallet.isConnected();
        setIsConnected(result);

        if (result) {
          const publicKey = await window.ic.infinityWallet.getPrincipal();
          const address = publicKey.toText();
          setConnectedAddress(address);
          console.log(`The connected user's public key is:`, publicKey);
        }
      } catch (e) {
        console.log("Error checking wallet connection:", e);
      }
    };

    checkWalletConnection();
  }, []);

  const connectWallet = async () => {
    try {
      const publicKey = await window.ic.infinityWallet.requestConnect();
      router.reload();
      const address = publicKey.ToText();
      setConnectedAddress(address);
      console.log(`The connected user's public key is:`, publicKey);
    } catch (e) {
      console.log("Error connecting wallet:", e);
    }
  };

    const disconnectWallet = async () => {
      try {
        await window.ic.infinityWallet.disconnect();
        setIsConnected(false);
        setConnectedAddress(null);
        console.log("Wallet disconnected");
      } catch (e) {
        console.log("Error disconnecting wallet:", e);
      }
    };

  return (
    <div className="wallet-connect-container">
      <h2>Wallet Connect Example</h2>
      {isConnected ? (
        <div>
          <p>Connected Address: {connectedAddress}</p>
          <button type="button" onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
