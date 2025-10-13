import { create } from "zustand";

const useFailureMsgStore = create<{
  failureMsg: string ;
  setFailureMsg: (msg: string ) => void;
}>((set) => ({
  failureMsg: "",
  setFailureMsg: (msg) => set({ failureMsg: msg }),
}));

export { useFailureMsgStore };
