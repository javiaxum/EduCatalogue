import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import InstitutionStore from "./institutionStore";
import MapStore from "./mapStore";
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
    mapStore: MapStore;
}

export const store: Store = {
    institutionStore: new InstitutionStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    specialtyStore: new SpecialtyStore(),
    profileStore: new ProfileStore(),
    mapStore: new MapStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}