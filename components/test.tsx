// pages/Dashboard.js

import React from "react";
import NNSButton from "../components/NNSButton";
import styles from "../assets/styles/Dashboard.module.css";

const Dashboard = () => {
  // Your existing Dashboard component code here...

  return (
    <div className={styles.walletConnectContainer}>
      <nav className={styles.navbar}>
        {/* ... Your existing navbar content ... */}
      </nav>

      {/* ... The rest of your Dashboard content ... */}

      <div>
        <NNSButton />
      </div>
    </div>
  );
};

export default Dashboard;

