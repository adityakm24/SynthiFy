import React from 'react';
import styles from '@/assets/styles/CreateVaultForm.module.css'

const CreateVaultForm = () => {
  return (
    <div className={styles.borrowFormContainer}>
      <form className={styles.borrowForm}>
        <div className={styles.formGroup}>
          <label htmlFor="amount"></label>
          <input type="text" id="amount" name="valut_id" placeholder="Current Vault ID" />
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

      <button className={styles.button}>Create Vault </button>
    </div>
  );
};

export default CreateVaultForm