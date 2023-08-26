import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%", // Adjust the width of the container as needed
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Two equal columns for Box 1 and Box 2
          gap: "20px", // Gap between columns
          alignItems: "center",
          justifyContent: "center",
          padding: "20px", // Add some padding
        }}
      >
        <Head>
          <title>SythiFy</title>
          <meta name="description" content="SythiFy" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Box 1 */}
        <div style={{ border: "1px solid #ccc", padding: "16px" }}>
          <h2>Your Deposits</h2>
          <p>This is the content for Box 1.</p>
        </div>

        {/* Box 2 */}
        <div style={{ border: "1px solid #ccc", padding: "16px" }}>
          <h2>Your Borrows</h2>
          <p>This is the content for Box 2.</p>
        </div>

        {/* Box 3 */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            gridColumn: "1 / 3", // Span across both columns
            width: 70%", // Take up the full width of the grid
          }}
        >
          <h2>Assets To Borrow</h2>
          <p>
            This is the content for Box 3. It will take up the full width of the
            screen below Box 1 and Box 2.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => router.push("/create-new-wallet")}
          >
            Click dd
          </button>
        </div>
      </div>
    </div>
  );
}
