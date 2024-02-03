import React from 'react';
import styles from '@/assets/styles/AddCollateralForm.module.css'

const AddCollateralForm = () => {
  return (
    <div className={styles.borrowFormContainer}>
      <form className={styles.borrowForm}>
        <div className={styles.formGroup}>
          <label htmlFor="amount"></label>
          <input type="text" id="amount" name="valut_id" placeholder="Enter Vault ID" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="duration"></label>
          <input type="text" id="duration" name="ckbtc" placeholder="CkBTC" />
        </div>
      </form>

      <div className={styles.rectangleBox}>
        <table className={styles.table}>
          <tr>
            <td className={styles.textCell}>Valut LTV Ratio</td>
            <td className={styles.valuesCell}>0%</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Valut Current Collateral</td>
            <td className={styles.valuesCell}>0</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Valut Current Collateral Ratio</td>
            <td className={styles.valuesCell}>0%</td>
          </tr>
          <tr>
            <td className={styles.textCell}>Health Factor</td>
            <td className={styles.valuesCell}>0</td>
          </tr>
        </table>
      </div>

      <button className={styles.button}>Add Collateral</button>
    </div>
  );
};

export default AddCollateralForm