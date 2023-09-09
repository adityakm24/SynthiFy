import styles from "../assets/styles/Dashboard.module.css";
import Link from "next/link";
import { Principal } from "@dfinity/principal";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";



const Dashboard = () => {
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
      const address = publicKey.toText();
      setConnectedAddress(address);
      console.log(`The connected user's public key is:`, publicKey);
    } catch (e) {
      console.log("Error connecting wallet:", e);
    }
  };



  return (
    <div className={styles.walletConnectContainer}>
      {isConnected ? (
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Box 1 */}
          <div style={{ border: "1px solid #ccc", padding: "16px" }}>
            <h2>Your Deposits</h2>
            <p>This is the content for Box 1.</p>
          </div>

          {/* Box 2 */}
          <div style={{ border: "1px solid #ccc", padding: "16px" }}>
            <h2>Your Borrows</h2>
            <p>This is the content for Box 2.</p>
          </div>

          {/* Box 3 */}
          <div
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              gridColumn: "1 / 3",
              width: "97.6%",
            }}
          >
            <h2>Assets To Borrow</h2>
            <p>
              This is the content for Box 3. It will take up the full width of
              the screen below Box 1 and Box 2.
            </p>
          </div>
        </div>
      ) : (
        <p>Wallet Not Connected</p>
      )}
    </div>
  );
};

export default Dashboard;
