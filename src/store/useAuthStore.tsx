import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStoreType } from "../types/auth.type";

const initValue = {
  nickname: "",
  avatar: "",
};

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      ...initValue,
      setNickname: (nickname: string) => set({ nickname }),
      setAvatar: (avatar: string) => set({ avatar }),
    }),
    { name: "user", getStorage: () => localStorage }
  )
);

export default useAuthStore;
