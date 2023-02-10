import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError } from "../models/serverError";
import { store } from "./store";

export default class CommonStore {

    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded: boolean = false;
    editMode: boolean = false;

    loadAppData = async () => {
        await Promise.all([store.institutionStore.loadInstitutions(),
            store.specialtyStore.loadSpecialtyCores(),
            store.specialtyStore.loadBranches(),
            store.institutionStore.loadRegionsWithCities(),
            store.profileStore.loadProfile()]).then(() => this.appLoaded = true)
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
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