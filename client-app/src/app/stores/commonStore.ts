import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import { store } from "./store";


export default class CommonStore {

    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded: boolean = false;
    editMode: boolean = false;
    sidebarOpened: boolean = false;
    componentForm: boolean = false;

    loadAppData = async () => {
        await Promise.all([store.institutionStore.loadInstitutions(),
        store.specialtyStore.loadSpecialtyCores(),
        store.specialtyStore.loadSkills(),
        store.specialtyStore.loadComponentCores(),
        store.specialtyStore.loadBranches(),
        store.institutionStore.loadCitiesWithInstitutions(),
        store.institutionStore.loadRegionsWithCities()])
        this.setAppLoaded();
    }

    setComponentForm = (state: boolean) => {
        this.componentForm = state;
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    setSidebarOpened = (state: boolean) => {
        this.sidebarOpened = state;
    }

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) { localStorage.setItem('jwt', token); }
                else { localStorage.removeItem('jwt'); }
            }
        )
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}