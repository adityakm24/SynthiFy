// Navbar.tsx
import Image from "next/image";
import styles from "@/assets/styles/SyNavbar.module.css";
import Link from "next/link";
import { Principal } from "@dfinity/principal";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const SyNavbar = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState([]); // State to store YHH

  const [isModalOpen0, setIsModalOpen0] = useState(false); // State to store backdrops
  const [isModalOpen1, setIsModalOpen1] = useState(false); // State to store backdrops
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

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const result = await window.ic.infinityWallet.isConnected();
        const userAssets = await window.ic.infinityWallet.getUserAssets();
        console.log(`User's list of tokens/assets`, userAssets);
        setIsConnected(result);
        console.log("useAssets", userAssets);
        setAssets(userAssets); // Set the assets in state

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      <div className={styles.right}>
        <button className={styles.connectButton} onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default SyNavbar;
