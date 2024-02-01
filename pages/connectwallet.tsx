import React from "react";
import ConnectWallet from "@/components/ConnectWallet";
import WalletConnected from "@/components/WalletConnected";
import Home from "@/components/Home";
import Borrow from "@/components/BorrowForm";
import BorrowDropDown from '@/components/BorrowDropDown';

const connectwallet = () => {
  return (
    <div>
      <BorrowDropDown/>
    </div>
  );
};

export default connectwallet;
