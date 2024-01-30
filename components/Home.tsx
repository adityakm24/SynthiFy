// Home.tsx
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SyNavbar from './SyNavbar';
import buttonStyles from '@/assets/styles/Home.module.css'; // Update the CSS file path

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SyNavbar />
      <h1>Welcome to Synthify</h1>
      <div className={buttonStyles.buttonsContainer}>
        <Link href="/app" as="/app">
          <button
            className={`${buttonStyles.button} ${
              router.pathname.includes('/app') && buttonStyles.active
            }`}
          >
            Borrow
          </button>
        </Link>
        <Link href="/withdraw">
          <button
            className={`${buttonStyles.button} ${
              router.pathname.includes('/withdraw') && buttonStyles.active
            }`}
          >
            Withdraw
          </button>
        </Link>
        <Link href="/deposit">
          <button
            className={`${buttonStyles.button} ${
              router.pathname.includes('/deposit') && buttonStyles.active
            }`}
          >
            Deposit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
