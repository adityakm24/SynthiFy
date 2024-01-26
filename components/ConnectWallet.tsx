import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/assets/styles/ConnectWallet.module.css';
import SyNavbar from './SyNavbar';

const ConnectWallet = () => {
  return (
    <div className={styles.notConnectedContainer}>
        <SyNavbar/>
      <Image
        src="/Depression-bro 1.svg"
        alt="Your SVG Image"
        width={300} 
        height={200} 
        className={styles.svgImage}
      />
      <p className={styles.notConnected}>
        This is embarrassing <br /> Your Wallet is Not Connected :(
      </p>
      <p className={styles.notConnected1}>
        Download and get started for free with{' '}
        <Link href="https://wallet.bitfinity.network/" className={styles.linkStyle} target="_blank">
          BitFinity Wallet
        </Link>{' '}
      </p>
    </div>
  );
};

export default ConnectWallet;
