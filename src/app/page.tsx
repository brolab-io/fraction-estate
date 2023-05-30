import AssetModal from "@/components/Home/AssetModal";
import ConnectWallet from "@/components/Home/ConnectWallet";
import SearchBar from "@/components/Home/SearchBar";
import SpaceScene from "@/components/Home/SpaceScene";

const HomePage = () => {
  return (
    <main className="relative w-full h-full">
      <SpaceScene />
      <div className="absolute top-0 left-0 right-0 flex justify-between p-6">
        <SearchBar />
        <ConnectWallet />
      </div>
      <AssetModal />
    </main>
  );
};

export default HomePage;
