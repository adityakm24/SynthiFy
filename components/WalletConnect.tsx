// WalletConnect.js

import { Principal } from "@dfinity/principal";
import React, { useState } from "react";

const WalletConnect = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);

  const connectWallet = async () => {
    try {
      const publicKey = await window.ic.infinityWallet.requestConnect();
      const address = Principal.fromPublicKey(publicKey).toText();
      setConnectedAddress(address);
    } catch (e) {
      console.log("Error connecting wallet:", e);
    }
  };

  return (
    <div className="wallet-connect-container">
      <h2>Wallet Connect Example</h2>
      {connectedAddress ? (
        <p>Connected Address: {connectedAddress}</p>
      ) : (
        <button type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
