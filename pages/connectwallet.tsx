import React from "react";
import ConnectWallet from "@/components/ConnectWallet";

const connectwallet = () => {

  const somelogic = async () => {
    console.log("Connecting wallet...");
  };

  return (
    <div>
      <ConnectWallet connectWallet={somelogic} />
    </div>
  );
};

export default connectwallet;
