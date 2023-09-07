import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../assets/styles/Mint.module.css";
import Image from "next/image";
import Link from "next/link";

const Mint = () => {
  const [ckBtcAmount, setCkBtcAmount] = useState("");
  const [Currency, setCurrency] = useState("sUSD");
  const [selectedPill, setSelectedPill] = useState("");
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  const handleCalculate = () => {
    // Implement your calculation logic here
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <h2 className={styles.navbarTitle}>Logo</h2>
        <Link href="/mint" className={styles.navbarLink}>
          Mint
        </Link>
        {isConnected ? (
          <div className={styles.dropdownContainer}>
            <button
              className={styles.disconnectDropdownButton}
              onClick={toggleModal}
            >
              {connectedAddress ? `${connectedAddress.slice(0, 8)}... ` : ""}
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
            )}
          </div>
        ) : (
          <div>
            <button
              className={styles.connectButton}
              type="button"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </nav>
      {isConnected ? (
        <div className={styles.centeredContainer}>
          <div className={styles.subContainer}>
            <form>
              <div className={styles.input1Container}>
                <div className={styles.inputGroup}>
                  <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                    <div className={styles.iconContainer}>
                      <Image
                        src="/icons/ckBTC.png"
                        alt="ckBtc Icon"
                        width={30}
                        height={30}
                        className={styles.iconImage}
                      />
                    </div>
                    ckBtc
                  </label>

                  <input
                    type="number"
                    id="ckBtc"
                    name="ckBtc"
                    value={ckBtcAmount}
                    onChange={(e) => setCkBtcAmount(e.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div className={styles.gasFee}>
                  <p>Gas fees</p>
                </div>
                <div className={styles.pillGroup}>
                  <button
                    className={`${styles.pill} ${
                      selectedPill === "25%" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedPill("25%")}
                  >
                    25%
                  </button>
                  <button
                    className={`${styles.pill} ${
                      selectedPill === "50%" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedPill("50%")}
                  >
                    50%
                  </button>
                  <button
                    className={`${styles.pill} ${
                      selectedPill === "75%" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedPill("75%")}
                  >
                    75%
                  </button>
                  <button
                    className={`${styles.pill} ${
                      selectedPill === "100%" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedPill("100%")}
                  >
                    100%
                  </button>
                </div>
              </div>
              <div className={styles.input2Container}>
                <label htmlFor="sUsd">
                  <div className={styles.inputGroup}>
                    <select
                      id="sUsd"
                      name="sUsd"
                      value={Currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="sUSD">sUSD</option>
                      <option value="sINR">sINR</option>
                    </select>
                    <input
                      type="number"
                      id="ckBtc"
                      name="ckBtc"
                      value={ckBtcAmount}
                      onChange={(e) => setCkBtcAmount(e.target.value)}
                      placeholder="Amount"
                    />
                  </div>
                </label>
                <div className={styles.gasFee}>
                  <p>Gas fees</p>
                </div>
              </div>

              <button
                type="button"
                className={styles.Calculate}
                onClick={handleCalculate}
              >
                Calculate
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Wallet Not Connected</p>
      )}
    </div>
  );
};

export default Mint;


