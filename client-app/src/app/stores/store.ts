import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import InstitutionStore from "./institutionStore";

interface Store {
    institutionStore: InstitutionStore;
    commonStore: CommonStore;
}

export const store: Store = {
    institutionStore: new InstitutionStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}