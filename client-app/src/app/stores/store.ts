import { createContext, useContext } from "react";
import InstitutionStore from "./institutionStore";

interface Store {
    institutionStore: InstitutionStore;
}

export const store: Store = {
    institutionStore: new InstitutionStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}