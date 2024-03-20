import Image from 'next/image';
import React from 'react';
import styles from '@/assets/styles/WalletConnected.module.css';
import SyNavbar from './SyNavbar';

const WalletConnected = () => {
  return (
    <div className={styles.walletConnectedContainer}>
    <p className={styles.welcomeText}>Welcome!</p>
      <div className={styles.center}>
        <Image 
            src="Enthusiastic-bro 1.svg" 
            alt="Wallet Connected" 
            width={300}   
            height={300} 
            className={styles.walletImage} />
      </div>
      <p className={styles.successText}>Wallet connected successfully :)</p>
    </div>
  );
};

export default WalletConnected;
