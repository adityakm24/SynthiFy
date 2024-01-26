// pages/index.js

import React from "react";
import Prfl from "../components/Withdraw";
import Navbar from "../components/Navbar";
import ConnectWallet from "@/components/ConnectWallet";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <Prfl />
    </div>
  );
};

export default Profile;
