import { create } from "zustand";
import { ToastStoreType } from "../types/modal.type";

const useToast = create<ToastStoreType>((set) => ({
  toast: null,
  setToast: (toast) => {
    set({ toast });
    setTimeout(() => {
      set({ toast: null });
    }, 1500);
  },
}));

export default useToast;
