import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * If the contract is deployed on multiple chains:
 * add chains in wagmi configuration below
 * in Input.jsx: setMintingStage(notChainSelected)
 * in Mint.jsx: change links to etherscan and testnet.rarible
 * in Contact.jsx: Adapt links to etherscan and opensea
 */

// Rainbowkit + Wagmi
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains"; // multichain: add chains here
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [goerli], // multichain: add chains here
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "generate art",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={midnightTheme()}
        initialChain={goerli}
        coolMode
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
