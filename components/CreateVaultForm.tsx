import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from '@/assets/styles/CreateVaultForm.module.css'
import {
  _SERVICE as vaultmanager_SERVICE,
  IndividualVaultData,
  AllowanceArgs,
} from "@/vaultmanager(ts).did";
import { idlFactory as vaultManageridlFactory } from "../vaultmanager.did.js";
import { Principal } from "@dfinity/principal";

const CreateVaultForm = () => {
  const [vaultID, setVaultID] = useState("");
  const [currentVautDetails, setCurrentVaultDetails] =
  useState<IndividualVaultData | null>(null);
  const [actualUserDebt, setActualUserDebt] = useState<number | null>();
  const [vaultManager, setVaultManager] = useState<vaultmanager_SERVICE | null>(
    null
  );
  const [connectPrincipal, setConnectedPrincipal] = useState<Principal | null>(
    null
  );
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [currentVaultIds, setCurrentVaultIds] = useState<Array<bigint>>([]);
  const vaultManagerAddress = "isswh-liaaa-aaaal-qcdrq-cai";
  const whitelist = [
    vaultManagerAddress,
  ];

  useEffect(()=>{
    const vaultfun = async () => {
    try{ 
      await VaultManagercreateActor();
    }catch(e){
      console.log("Error Checking Wallet Connection")
    }
    };
    vaultfun();
  })
  

  const handleGetVaultDetails = async (e) => {
    e.preventDefault();
    if (vaultManager !== null) {
      const _vaultId = BigInt(parseInt(vaultID));
      const data = await vaultManager.getVaultDetails(_vaultId);
      setCurrentVaultDetails(data);

      const actualUserDebt = await vaultManager.getVaultActualDebt(_vaultId);
      setActualUserDebt(actualUserDebt);
    }
  };

  const getuserIdVaults = async () => {
    if (vaultManager !== null && connectPrincipal !== null) {
      try {
        const vaultids = await vaultManager.getUserVaultIds(connectPrincipal);
        setCurrentVaultIds(vaultids);
      } catch (e) {
        console.log("error in getting user id vaults", e);
      }
    }
  };

  const handleCreateVaultFunction = async (e) => {
    e.preventDefault();
    if (vaultManager !== null) {
      try {
        const vaultId = await vaultManager.createVault([]);
        getuserIdVaults();
        console.log(vaultId);
      } catch (e) {
        console.log("Error occured when creating vault:", e);
      }
    }
  };

  const VaultManagercreateActor = async () => {
    try {
      const _vaultManager = await window.ic.infinityWallet.createActor({
        canisterId: vaultManagerAddress,
        interfaceFactory: vaultManageridlFactory,
        host: undefined,
      });
      setVaultManager(_vaultManager);
    } catch (e) {
      console.log("Error creating actor:", e);
    }
  };

  const handleVaultIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^[0-9]\d*$/.test(inputValue)) {
      setVaultID(inputValue);
    } else {
      setVaultID("");
    }
  };


  return (
    <div className={styles.borrowFormContainer}>
      <form className={styles.borrowForm}>
        <div className={styles.formGroup}>
          <label htmlFor="amount"></label>
          <input type="text" id="vaultID" name="vaultID" value={vaultID}  onChange={handleVaultIDChange}placeholder="Current Vault ID" />
        </div>
      </form>

      <div className={styles.rectangleBox}>
        <table className={styles.table}>
          <tr>
            <td className={styles.textCell}>Valut LTV Ratio</td>
            <td className={styles.valuesCell}>{currentVautDetails !== null &&
                        currentVautDetails.vaultLtvRatio !== undefined
                          ? `${Math.round(
                              currentVautDetails.vaultLtvRatio * 100
                            )}%`
                          : `0%`}</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Valut Current Collateral</td>
            <td className={styles.valuesCell}>            
                        {currentVautDetails !== null &&
                        currentVautDetails.vaultCurrentCollateral !== undefined
                          ? `${currentVautDetails.vaultCurrentCollateral} CKBTC`
                          : 0}</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Valut Current Collateral Ratio</td>
            <td className={styles.valuesCell}>{currentVautDetails !== null &&
                        currentVautDetails.vaultLtvRatio !== undefined
                          ? `${Math.round(
                              (1 / currentVautDetails.vaultLtvRatio) * 100
                            )}%`
                          : `0%`}</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Vault Debt</td>
            <td className={styles.valuesCell}>{actualUserDebt !== null
                          ? `${actualUserDebt} SynthUSD`
                          : "Fetching"}</td>
          </tr>
        </table>
      </div>
      <button className={styles.button} onClick={handleCreateVaultFunction} >Create Vault </button>
      <button className={styles.Vaultbutton} onClick={handleGetVaultDetails} >Get Vault Details </button>
    </div>
  );
};

export default CreateVaultForm