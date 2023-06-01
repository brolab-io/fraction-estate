import { RealEstateState } from "@/types/RealEstateState";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface EstateState {
  realEstateStates: RealEstateState[];
  setRealEstateStates: (realEstateStates: RealEstateState[]) => void;
  selectedRealEstateState: RealEstateState | undefined;
  selectRealEstateState: (index: number) => void;
}

const useEstateStore = create<EstateState>()(
  devtools((set, get) => ({
    realEstateStates: [],
    selectedRealEstateState: undefined,
    selectRealEstateState: (index: number) => {
      set({ selectedRealEstateState: get().realEstateStates[index] });
    },
    setRealEstateStates: (realEstateStates: RealEstateState[]) => {
      set({ realEstateStates });
    },
  }))
);

export default useEstateStore;
