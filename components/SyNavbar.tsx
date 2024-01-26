// Navbar.tsx

import styles from '@/assets/styles/SyNavbar.module.css';

const SyNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.center}>
      <img src="/Synthify.svg" alt="Synthify Logo" className={styles.logoImage} />
      </div>
      <div className={styles.right}>
        <button className={styles.connectButton}>Connect Wallet</button>
      </div>
    </nav>
  );
};

export default SyNavbar;
