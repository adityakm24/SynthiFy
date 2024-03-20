import { useState } from 'react';
import React  from 'react';
import styles from '@/assets/styles/SyBorrowForm.module.css'; 
import {
  _SERVICE as vaultmanager_SERVICE,
  IndividualVaultData,
  AllowanceArgs,
} from "@/vaultmanager(ts).did";


const SyBorrowForm = () => {

  const [vaultID, setVaultID] = useState("");
  const [synthUsdAmount, setsynthUsdAmount] = useState("");
  const [currentVautDetails, setCurrentVaultDetails] =
  useState<IndividualVaultData | null>(null);
  const [vaultManager, setVaultManager] = useState<vaultmanager_SERVICE | null>(
    null
  );

  const handleVaultIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^[0-9]\d*$/.test(inputValue)) {
      setVaultID(inputValue);
    } else {
      setVaultID("");
    }
  };

  const validateFields = () => {
    const synthUsdAmountNum = parseFloat(synthUsdAmount);
    if (vaultID === "" || isNaN(synthUsdAmountNum) || synthUsdAmountNum < 0) {
      alert("Please fill in all required fields correctly");
      return false;
    }

    return true;
  };

  const handleBorrow = async () => {
    if (validateFields()) {
      if (synthUsdAmount !== null) {
        console.log("collatAmount", parseFloat(synthUsdAmount));
        const decimalAdjustedsUsd = BigInt(
          Math.pow(10, 8) * parseFloat(synthUsdAmount)
        );
        console.log("decimal adjusts", decimalAdjustedsUsd);

        const vaultId = BigInt(parseInt(vaultID));

        if (vaultManager !== null) {
          try {
            const result = await vaultManager.borrow(
              vaultId,
              decimalAdjustedsUsd
            );
            console.log(result);

            setCurrentVaultDetails(await vaultManager.getVaultDetails(vaultId));
            console.log(currentVautDetails);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };

  return (
    <div className={styles.borrowFormContainer}>
      <form className={styles.borrowForm}>
        <div className={styles.formGroup}>
          <label htmlFor="sUsd"></label>
          <input type="text" id="vaultID" name="vaultID" value={vaultID} onChange={handleVaultIDChange} placeholder="Enter Vault ID" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sUsd"></label>
          <input type="number" id="synthUsd" name="synthUsd"  value={synthUsdAmount} onChange={(e) => setsynthUsdAmount(e.target.value)} placeholder="synUSD" />
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
            <td className={styles.valuesCell}>{currentVautDetails !== null &&
                        currentVautDetails.vaultCurrentCollateral !== undefined
                          ? `${currentVautDetails.vaultCurrentCollateral} CKBTC`
                          : 0}</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Valut Current Collateral Ratio</td>
            <td className={styles.valuesCell}>                        {currentVautDetails !== null &&
                        currentVautDetails.vaultLtvRatio !== undefined
                          ? `${Math.round(
                              (1 / currentVautDetails.vaultLtvRatio) * 100
                            )}%`
                          : `0%`}</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Health Factor</td>
            <td className={styles.valuesCell}>0</td>
          </tr>
        </table>
      </div>
      <button className={styles.button} onClick={handleBorrow}>Borrow</button>
    </div>
  );
};

export default SyBorrowForm;
