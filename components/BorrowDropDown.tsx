import React, { useState } from 'react';
import styles from '@/assets/styles/BorrowDropDown.module.css';
import SyNavbar from './SyNavbar';
import Home from './Home';

const BorrowDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    setIsOpen(false); 
  };

  return (
    <div className={styles.dropdownContainer}>
      <SyNavbar/>
      <Home/>
      <button className={styles.dropdownButton} onClick={toggleMenu}>
        Select an option
      </button>
      {isOpen && (
        <div className={styles.options}>
          <div onClick={() => handleOptionClick('Option 1')}>Option 1</div>
          <div onClick={() => handleOptionClick('Option 2')}>Option 2</div>
          <div onClick={() => handleOptionClick('Option 3')}>Option 3</div>
          <div onClick={() => handleOptionClick('Option 4')}>Option 4</div>
        </div>
      )}
    </div>
  );
};

export default BorrowDropDown;
