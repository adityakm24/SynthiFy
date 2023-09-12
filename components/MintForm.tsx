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

  const handleCalculate = () => {
    // Implement your calculation logic here
  };

return (
  <div>
    {isConnected ? (
      <div className={styles.tableContainer}>
        <table id="tableList" className={styles.tableList}>
          <thead>
            <tr>
              <th></th>
              <th>Stablecoin</th>
              <th>Interest Rate</th>
              <th>Liquidation Fee</th>
              <th>Max. LTV</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CkBTC</td>
              <td>synUSD</td>
              <td>1.5%</td>
              <td>0.5%</td>
              <td>80%</td>
              <td>
                <button className={styles.borrowButton} onClick={toggleModal}>
                  Borrow
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
              <i
                className={`fa fa-times-circle ${styles.closeIcon}`}
                onClick={toggleModal}
              ></i>
              <div className={styles.modalContainer}>
                <h2>Mint Form</h2>
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
          </div>
        )}
      </div>
    ) : (
      <p>Wallet Not Connected</p>
    )}
  </div>
);     
};

export default Mint;


