// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/index.html");
  }, []);

  return null;
}

export default Home;
