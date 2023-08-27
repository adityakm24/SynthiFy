"use client"

import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const alchemyApiKey = process.env.ALCHEMY_ID;

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: alchemyApiKey }), // Use alchemyProvider
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "SynthiFY",
  projectId: "cbc2313443443338b20debe33da28adf", // Replace with your actual project ID
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
        
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
