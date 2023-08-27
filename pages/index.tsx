import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useIsMounted from "./hooks/useIsMounted";
import { useAccount } from "wagmi";

export default function Home() {
  const account = useAccount();
  const router = useRouter();
  const mounted = useIsMounted();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
        }}
      >
        {/* Left Links */}
        <div>
          <Link href="/" style={navLinkStyle}>
            Home
          </Link>
          <Link href="/about" style={navLinkStyle}>
            About
          </Link>
          <Link href="/contact" style={navLinkStyle}>
            Contact
          </Link>
        </div>

        {/* Right Connect Button */}
        <div>
          <ConnectButton />
        </div>
      </div>

      {/* Content */}
      {mounted
        ? account.isConnected && (
            <div
              style={{
                width: "80%",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Head>
                <title>SythiFy</title>
                <meta name="description" content="SythiFy" />
                <link rel="icon" href="/favicon.ico" />
              </Head>

              {/* Box 1 */}
              <div style={boxStyle}>
                <h2>Your Deposits</h2>
                <p>This is the content for Box 1.</p>
              </div>

              {/* Box 2 */}
              <div style={boxStyle}>
                <h2>Your Borrows</h2>
                <p>This is the content for Box 2.</p>
              </div>

              {/* Box 3 */}
              <div style={{ ...boxStyle, gridColumn: "1 / 3" }}>
                <h2>Assets To Borrow</h2>
                <p>
                  This is the content for Box 3. It will take up the full width
                  of the screen below Box 1 and Box 2.
                </p>
              </div>
            </div>
          )
        : null}
    </div>
  );
}

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 10px",
  fontSize: "18px",
  fontWeight: "bold",
};

const boxStyle = {
  border: "1px solid #ccc",
  padding: "16px",
};
