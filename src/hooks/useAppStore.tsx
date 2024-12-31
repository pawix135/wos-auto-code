import { AppStoreContext } from "@/context/AppContext";
import { useContext } from "react";

export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within a AppStoreProvider");
  }
  return context;
}