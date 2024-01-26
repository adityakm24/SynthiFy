// Navbar.tsx
import Image from 'next/image';
import styles from '@/assets/styles/SyNavbar.module.css';

const SyNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.center}>
        <Image src="/Synthify.svg"
          alt="Synthify Logo"
          width={200} 
          height={75} 
          className={styles.logoImage} />
      </div>
      <div className={styles.right}>
        <button className={styles.connectButton}>Connect Wallet</button>
      </div>
    </nav>
  );
};

export default SyNavbar;
