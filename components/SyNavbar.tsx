import Image from "next/image";
import styles from "@/assets/styles/SyNavbar.module.css";
import { Principal } from "@dfinity/principal";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ConnectWallet from "./ConnectWallet";
import WalletConnected from "./WalletConnected";

// Declare global interface for 'ic' property on window object
declare global {
  interface Window {
    ic: any;
  }
}

const SyNavbar = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState([]); // State to store YHH

  const router = useRouter();
  const vaultManagerAddress = "isswh-liaaa-aaaal-qcdrq-cai";

  const synthTokenAddress = "i3r53-5aaaa-aaaal-qcdqa-cai";

  const synthMinterAddress = "i4q3p-qyaaa-aaaal-qcdqq-cai";

  const depositModuleAddress = "ivtqt-gqaaa-aaaal-qcdra-cai";

  const whitelist = [
    vaultManagerAddress,
    synthTokenAddress,
    synthMinterAddress,
    depositModuleAddress,
  ];

  // Check wallet connection on initialization
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const result = await window.ic.infinityWallet.isConnected();
        setIsConnected(result);

        if (result) {
          const userAssets = await window.ic.infinityWallet.getUserAssets();
          setAssets(userAssets);

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
  

  // Connect wallet functionality
  const connectWallet = async () => {
    try {
      const publicKey = await window.ic.infinityWallet.requestConnect({
        whitelist,
      });
      router.reload();
      const address = publicKey.toText();
      setConnectedAddress(address);
      console.log(`The connected user's public key is:`, publicKey);
    } catch (e) {
      console.log("Error connecting wallet:", e);
    }
  };

  // Disconnect wallet functionality
  const disconnectWallet = async () => {
    try {
      await window.ic.infinityWallet.disconnect();
      router.reload();
      setIsConnected(false);
      setConnectedAddress(null);
      console.log("Wallet disconnected");
    } catch (e) {
      console.log("Error disconnecting wallet:", e);
    }
  };

  // Toggle modal functionality
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Copy address functionality
  const copyAddress = () => {
    if (connectedAddress) {
      navigator.clipboard
        .writeText(connectedAddress)
        .then(() => {
          alert("Address copied to clipboard");
        })
        .catch((error) => {
          console.error("Error copying address to clipboard:", error);
        });
    }
  };


  return (
    <nav className={styles.navbar}>
      <div className={styles.center}>
        <Image
          src="/Synthify.svg"
          alt="Synthify Logo"
          width={200}
          height={75}
          className={styles.logoImage}
        />
      </div>
      <div >
        {isConnected ? (
          <div className={styles.dropdownContainer}>
            {assets ? (
              <div className={styles["select-container"]}>
                <select
                  className={styles["select-element"]}
                  name="assets"
                  id="assets"
                >
                  {assets.map((asset, index) => (
                    <option key={index} value={asset.name}>
                      {asset.name} {asset.balance / 100000000}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>No assets owned</p>
            )}

            <button
              className={styles.connectButton}
              onClick={toggleModal}
            >
              {connectedAddress
                ? `${connectedAddress.slice(0, 8)}... `
                : ""}
              {isModalOpen ? (
                <i className="fa fa-caret-down"></i>
              ) : (
                <i className="fa fa-caret-down"></i>
              )}
            </button>
            {isModalOpen && (
  <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <i
        className={`fa fa-times-circle ${styles.closeIcon}`}
        onClick={toggleModal}
      ></i>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3>{connectedAddress}</h3>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.copyButton} onClick={copyAddress}>
            <i className="fa fa-copy"></i> Copy Address
          </button>
          <button
            className={styles.disconnectButton}
            onClick={() => {
              disconnectWallet();
              toggleModal();
            }}
          >
            <i className="fa fa-sign-out"></i> Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
        ) :
        (
          <button className={styles.connectButton} onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      
    </nav>
    
  );
};

export default SyNavbar;
