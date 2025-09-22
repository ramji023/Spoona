import { create } from "zustand";

const useSuccessMsgStore = create<{
  successMsg: string ;
  setSuccessMsg: (msg: string ) => void;
}>((set) => ({
  successMsg: "",
  setSuccessMsg: (msg) => set({ successMsg: msg }),
}));

export { useSuccessMsgStore };
