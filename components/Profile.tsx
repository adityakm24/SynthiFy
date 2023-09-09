import styles from "../assets/styles/Profile.module.css";
import Link from "next/link";
import { Principal } from "@dfinity/principal";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isModalOpen0, setIsModalOpen0] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
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


    const toggleModal1 = () => {
      setIsModalOpen1(!isModalOpen1);
  };
  
      const toggleModal0 = () => {
        setIsModalOpen0(!isModalOpen0);
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
  const updateBalance = () => {
   //add animation for loading balance
  };


  return (
    <div className={styles.body}>
      {isConnected ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            display: "grid",
            placeItems: "center",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            padding: "20px",
          }}
        >
          <button className={styles.general} onClick={toggleModal0}>
            Deposit CkBTC
          </button>

          {isModalOpen0 && (
            <div className={styles.modalBackdrop}>
              <div className={styles.modalContent}>
                <i
                  className={`fa fa-times-circle ${styles.closeIcon}`}
                  onClick={toggleModal0}
                ></i>
                <div className={styles.modalContainer}>
                  <div className={styles.modalHeader}>
                    <p>Deposit your ckbtc to the below address.</p>
                    <h3>{connectedAddress}</h3>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button className={styles.general2}>Update Deposits</button>
                </div>
              </div>
            </div>
          )}

          <button className={styles.general} onClick={toggleModal1}>
            Deposit BTC
          </button>
          {isModalOpen1 && (
            <div className={styles.modalBackdrop}>
              <div className={styles.modalContent}>
                <i
                  className={`fa fa-times-circle ${styles.closeIcon}`}
                  onClick={toggleModal1}
                ></i>
                <div className={styles.modalContainer}>
                  <div className={styles.modalHeader}>
                    <h3>Placeholder </h3>
                    <br></br>
                    <br></br>
                  </div>

                  <div className={styles.modalActions}>
                    <button className={styles.general0}>
                      Get Deposit Address
                    </button>
                    <br></br>
                    <button className={styles.general2}>
                      Update Deposit Address
                    </button>
                  </div>
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

export default Profile;
