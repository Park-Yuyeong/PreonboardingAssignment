import { create } from "zustand";
import { ModalStoreType } from "../types/modal.type";

const useModal = create<ModalStoreType>((set) => ({
  modal: null,
  open: (modal) => set({ modal }),
  close: () => set({ modal: null }),
}));

export default useModal;
