import { geocoders } from "leaflet-control-geocoder";
import { debounce } from "lodash";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError } from "../models/serverError";
import { store } from "./store";
import React from "react";
import { createRoot } from 'react-dom/client';
import { useTranslation, initReactI18next } from "react-i18next";


export default class CommonStore {

    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded: boolean = false;
    editMode: boolean = false;
    selectedLanguage: string = 'ua';

    setLanguage = (languageCode: string) => {
        this.selectedLanguage = languageCode;
    }

    loadAppData = async () => {
        await Promise.all([store.institutionStore.loadInstitutions(),
        store.specialtyStore.loadSpecialtyCores(),
        store.specialtyStore.loadBranches(),
        store.institutionStore.loadCitiesWithInstitutions(),
        store.institutionStore.loadRegionsWithCities()])
        this.setAppLoaded();
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