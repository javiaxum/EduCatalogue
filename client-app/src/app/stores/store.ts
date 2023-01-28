import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import InstitutionStore from "./institutionStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import SpecialtyStore from "./specialtyStore";
import UserStore from "./userStore";


interface Store {
    institutionStore: InstitutionStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    specialtyStore: SpecialtyStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    institutionStore: new InstitutionStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    specialtyStore: new SpecialtyStore(),
    profileStore: new ProfileStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}