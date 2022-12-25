import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import InstitutionStore from "./institutionStore";
import ModalStore from "./modalStore";
import SpecialtyStore from "./specialtyStore";
import UserStore from "./userStore";


interface Store {
    institutionStore: InstitutionStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    specialtyStore: SpecialtyStore;
}

export const store: Store = {
    institutionStore: new InstitutionStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    specialtyStore: new SpecialtyStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}