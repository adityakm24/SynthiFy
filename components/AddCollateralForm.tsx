import { useState } from 'react';
import React  from 'react';
import styles from '@/assets/styles/AddCollateralForm.module.css'
import {
  _SERVICE as vaultmanager_SERVICE,
  IndividualVaultData,
  AllowanceArgs,
} from "@/vaultmanager(ts).did";

const AddCollateralForm = () => {

  const [vaultID, setVaultID] = useState("");
  const [collatAmnt, setcollatAmnt] = useState("");
  const [currentVautDetails, setCurrentVaultDetails] =
  useState<IndividualVaultData | null>(null);
  const [vaultManager, setVaultManager] = useState<vaultmanager_SERVICE | null>(
    null
  );

  const validateFields = () => {
    const collatAmntNum = parseFloat(collatAmnt);
    if (vaultID === "" || collatAmnt === "" || collatAmntNum < 0) {
      alert("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleVaultIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleaddCollateral = async () => {
    if (validateFields()) {
      console.log("collatAmount", parseFloat(collatAmnt));

      const parsedValue = parseFloat(collatAmnt);
      console.log("parse values", parsedValue);
      const decimalAdjusted = BigInt(parsedValue * 10 ** 8);
      console.log("decimal adjusts", decimalAdjusted);

      const vaultId = BigInt(parseInt(vaultID));
      if (vaultManager !== null) {
        try {
          const result = await vaultManager.addCollateral(
            vaultId,
            decimalAdjusted
          );
          console.log(result);

          setCurrentVaultDetails(await vaultManager.getVaultDetails(vaultId));
          console.log(currentVautDetails);
        } catch (e) {
          //@todo: show the error messaeg e somewhere
          console.log(e);
        }
      }
    }
  };


  return (
    <div className={styles.borrowFormContainer}>
      <form className={styles.borrowForm}>
        <div className={styles.formGroup}>
          <label htmlFor="amount"></label>
          <input type="text"  id="vaultID" name="vaultID"   value={vaultID}  onChange={handleVaultIDChange} placeholder="Enter Vault ID" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ckBtc"></label>
          <input type="number" id="ckBtc" name="ckBtc"  value={collatAmnt} onChange={(e) => setcollatAmnt(e.target.value)}placeholder="CkBTC" />
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
                            )} %`
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
                            )} %`
                          : `0%`}</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Health Factor</td>
            <td className={styles.valuesCell}>0</td>
          </tr>
        </table>
      </div>

      <button className={styles.button} onClick={handleaddCollateral}>Add Collateral</button>
    </div>
  );
};

export default AddCollateralForm