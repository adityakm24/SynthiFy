import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../assets/styles/Borrow.module.css";
import Image from "next/image";
import Link from "next/link";
import {Opt} from "azle"



import {vaultManageridlFactory} from "../vaultmanager.did.js"

const Borrow = () => {
  const [vaultID, setVaultID] = useState("");
  const [collatAmnt, setcollatAmnt] = useState("");
  const [ckBtcAmount, setckBtcAmount] = useState("");
  const [Currency, setCurrency] = useState("sUSD");
  const [selectedPill, setSelectedPill] = useState("");
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Borrow");
  const [backendData, setBackendData] = useState("");
  const [vaultManager,setVaultManager] = useState(null)
  const [currentVautDetails,setCurrentVaultDetails] = useState(null)

  const vaultManagerAddress = "bw4dl-smaaa-aaaaa-qaacq-cai"
  //@ts-ignore
  let getCurrentVaultDetails = {
    vaultLtvRatio:0
  }

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
          await createActor()
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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const createActor = async () => {
    try {
      const _vaultManager = await window.ic.infinityWallet.createActor({
      canisterId: vaultManagerAddress,
      interfaceFactory: vaultManageridlFactory,
      host:"http://localhost:4943/", 
      
    })
    setVaultManager(_vaultManager)
    } catch(e){
      console.log("Error creating actor:",e)
    };

  }

  const handleCalculate = () => {
    // Implement your calculation logic here
  };

  const handleaddCollateral = async() => {
    // Implement your calculation logic here
    const collatAmount = Math.pow(parseInt(collatAmnt),8)
    const vaultId = parseInt(vaultID)
    if(vaultManager !== null){
    try{
      //@ts-ignore
      await vaultManager.addCollateral(vaultId,collatAmount)
      //@ts-ignore
      setCurrentVaultDetails(await vaultManager.getVaultDetails(vaultId))
      console.log(currentVautDetails)
    }
    catch(e){

      //@todo: show the error messaeg e somewhere
      console.log(e)
    }
    }

  };

  const handleCreateVaultFunction = async() => {
    if(vaultManager!==null){
      
      try{


        //@ts-ignore
      const vaultId = await vaultManager.createVault([])
      console.log(vaultId)
      }
      catch(e){
        console.log("Error occured when creating vault:",e)
      }
    }
  }



    const handleVaultIDChange = (e) => {
      const inputValue = e.target.value;

      // Check if the input is a positive integer
      if (/^[0-9]\d*$/.test(inputValue)) {
        setVaultID(inputValue);
      } else {
        // If not a positive integer, you can display an error message or handle it in another way
        // For now, we clear the input
        setVaultID("");
      }
  };
  
    const handleCreateVault = async () => {
      try {
        // Simulate fetching data from the backend
        const response = await fetch("backend/api/endpoint"); // Replace with your actual API endpoint
        const data = await response.json();

        // Update the dummy state with the fetched data
        setBackendData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };




  const getForm = () => {
    switch (selectedOption) {
      case "Borrow":
        return (
          <form>
            <div className={styles.input3Container}>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Collateral
                </label>
                <div className={styles.TextRight}>
                  <p>0 LUSD</p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Debt
                </label>
                <div className={styles.TextRight}>
                  <p>0 agEUR</p>
                </div>
              </div>
            </div>
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
                  onChange={(e) => setckBtcAmount(e.target.value)}
                  placeholder="0.0"
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
                    onChange={(e) => setckBtcAmount(e.target.value)}
                    placeholder="0.0"
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
        );
      case "Add Collateral":
        return (
          <form>
            <div className={styles.input3Container}>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault LTV Ratio
                </label>
                <div className={styles.TextRight}>
                  
                  <p>{

      currentVautDetails!==null && currentVautDetails.vaultLtvRatio !== undefined
                ? currentVautDetails.vaultLtvRatio
                  : 0
                  }</p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collateral
                </label>
                <div className={styles.TextRight}>
                  <p>0</p>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Vault Current Collaterisation Ratio
                </label>
                <div className={styles.TextRight}>
                  <p>0</p>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="ckBtc" className={styles.labelWithIcon}>
                  Health Factor
                </label>
                <div className={styles.TextRight}>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div className={styles.input1Container}>
              <label htmlFor="sUsd">
                <div className={styles.inputGroup}>
                  Vault ID
                  <input
                    type="text"
                    id="vaultID"
                    name="vaultID"
                    value={vaultID}
                    onChange={handleVaultIDChange}
                    placeholder="0"
                  />
                </div>
              </label>
              <div className={styles.gasFee}>
                <p>Gass Fees: 10</p>
              </div>
            </div>
            <div className={styles.input2Container}>
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
                  value={collatAmnt}
                  onChange={(e) => setcollatAmnt(e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <div className={styles.gasFee}>
                <p>Gass Fees: 10</p>
              </div>
            </div>

            <button
              type="button"
              className={styles.Calculate}
              onClick={handleaddCollateral}
            >
              Add Collateral
            </button>
          </form>
        );
      case "Create Vault":
        return (
          <div className={styles.createWalletContainer}>
            <button
              className={styles.createWalletButton}
              onClick={handleCreateVaultFunction}
            >
              Create Vault
            </button>
            {backendData && <p className={styles.backendData}>{backendData}</p>}
          </div>
        );

      default:
        return null;
    }
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
          {isModalOpen && (
            <div className={styles.modalBackdrop}>
              <div className={styles.modalContent}>
                <div className={styles.modalNavbar}>
                  <div className={styles.modalDropdown}>
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <option>Borrow</option>
                      <option>Add Collateral</option>
                      <option>Create Vault</option>
                    </select>
                  </div>
                  <div className={styles.closeIconContainer}>
                    <i
                      className={`fa fa-times-circle ${styles.closeIcon}`}
                      onClick={toggleModal}
                    ></i>
                  </div>
                </div>
                <div className={styles.modalContainer}>{getForm()}</div>
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

export default Borrow;


