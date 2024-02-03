import React, { useState, useEffect, Suspense } from 'react';
import styles from '@/assets/styles/BorrowDropDown.module.css';
import SyNavbar from './SyNavbar';
import Home from './Home';

const SyBorrowForm = React.lazy(() => import('./SyBorrowForm'));
const AddCollateralForm = React.lazy(() => import('./AddCollateralForm'));
const CreateVaultForm = React.lazy(() => import('./CreateVaultForm'));
const RepayDebtForm = React.lazy(() => import('./RepayDebtForm'));

const BorrowDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Borrow'); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Borrow':
        return <SyBorrowForm />;
      case 'Add Collateral':
        return <AddCollateralForm />;
      case 'Create Vault':
        return <CreateVaultForm />;
      case 'Repay Debt':
        return <RepayDebtForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SyNavbar />
      <Home />
      <div className={styles.dropdownContainer}>
        <button className={styles.dropdownButton} onClick={toggleMenu}>
          {selectedOption !== 'Select an option' ? selectedOption : 'Select an option'} &#9660;
        </button>
        {isOpen && (
          <div className={styles.options}>
            <div onClick={() => handleOptionClick('Borrow')}>Borrow</div>
            <div onClick={() => handleOptionClick('Add Collateral')}>Add Collateral</div>
            <div onClick={() => handleOptionClick('Create Vault')}>Create Vault</div>
            <div onClick={() => handleOptionClick('Repay Debt')}>Repay Debt</div>
          </div>
        )}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {selectedOption && (
          <div>
            {renderComponent()}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default BorrowDropDown;
