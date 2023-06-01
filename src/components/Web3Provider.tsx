"use client";
import { SUPPORTED_CHAINS } from "@/configs/chains";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { PropsWithChildren } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

const { publicClient } = configureChains(SUPPORTED_CHAINS, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains: SUPPORTED_CHAINS }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, SUPPORTED_CHAINS);

const Web3Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <ToastContainer />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default Web3Provider;
