import Web3Provider from "@/components/Web3Provider";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const WrongNetworkModal = dynamic(() => import("@/components/CommonUI/WrongNetwork"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fraction Estate",
  description: "Fractional real estate investing",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
          <WrongNetworkModal />
        </Web3Provider>
      </body>
    </html>
  );
};

export default RootLayout;
