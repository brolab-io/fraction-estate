import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface EstateState {
  tokens: string[];
  selectedToken: string;
  selectToken: (token: string) => void;
}

const useEstateStore = create<EstateState>()(
  devtools((set) => ({
    tokens: [],
    selectedToken: "",
    selectToken: (token: string) => set({ selectedToken: token }),
  }))
);

export default useEstateStore;
