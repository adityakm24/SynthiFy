// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the landing page
    router.push('/index.html');
  }, []);

  return null;
}

export default Home;
